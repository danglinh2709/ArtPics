import { resolveAspectRatioFromDocument } from "@/src/stores/helpers/aspect-ratio.utils";
import { assetService } from "../../../services/asset.service";
import { projectService } from "../../../services/project.service";

import { TAspectRatio, TEditorState, TPage } from "../../../types/project.type";
import {
  getApiBaseUrl,
  mapApiProjectToProject,
} from "../../project.store.helpers";
import { ProjectSliceCreator } from "../../types/project.store.types";
import { EAssetType } from "@/src/enums/layer.enum";
import {
  getEditorDocument,
  mapLayersFromApi,
  mapLayersToApi,
  parseEditorState,
  pickBestPageRawLayers,
} from "../../helpers/editor-state";

export const createProjectApiSlice: ProjectSliceCreator<
  Pick<
    import("../../types/project.store.types").ProjectState,
    | "fetchProjects"
    | "saveCurrentProject"
    | "updateEditorState"
    | "loadProject"
    | "createNewProject"
    | "deleteProject"
    | "duplicateProject"
    | "uploadAsset"
  >
> = (set, get) => ({
  // fetch all projects
  fetchProjects: async () => {
    const { projects: currentProjects } = get();
    set({ isLoading: true, error: null });

    try {
      const apiProjects = await projectService.getAllProject();
      const mappedProjects = apiProjects.map((p) =>
        mapApiProjectToProject(p, currentProjects),
      );
      set({ projects: mappedProjects });
    } catch (e: any) {
      set({ error: e.message || "Failed to fetch projects" });
    } finally {
      set({ isLoading: false });
    }
  },

  // update editor state directly
  updateEditorState: async (projectId: string, editorState: any, version: number) => {
    set({ isLoading: true, error: null });
    try {
      const saved = await projectService.updateEditorState(projectId, editorState, version);
      if (saved?.currentVersion != null) {
        set({ currentProjectVersion: saved.currentVersion });
      }
      return saved;
    } catch (e: any) {
      set({ error: e.message || "Failed to update project data" });
      return null;
    } finally {
      set({ isLoading: false });
    }
  },

  // create new project
  createNewProject: async (name: string, ratio: TAspectRatio) => {
    set({ isLoading: true, error: null });

    try {
      const newProject = await projectService.createProject(name, {
        documentWidth: ratio.width,
        documentHeight: ratio.height,
      });

      set({
        currentProjectId: newProject.id,
        currentProjectName: name,
        currentProjectVersion: newProject.currentVersion,
        selectedRatio: ratio,
        layers: [],
        selectedLayerId: null,
      });

      return newProject;
    } catch (e: any) {
      set({ error: e.message || "Failed to create project" });
      return null;
    } finally {
      set({ isLoading: false });
    }
  },

  // save current project
  saveCurrentProject: async () => {
    const {
      currentProjectId,
      currentProjectName,
      currentProjectVersion,
      layers,
      selectedRatio,
      isUploadingAsset,
    } = get();

    if (!currentProjectId || !selectedRatio) return;

    if (isUploadingAsset) {
      console.log("[saveCurrentProject] Waiting for asset upload to finish...");
      return;
    }

    set({ isLoading: true, error: null });

    try {
      const editorState: TEditorState = {
        schemaVersion: 1,
        document: {
          type: "post",
          title: currentProjectName || "Untitled",
          width: selectedRatio.width,
          height: selectedRatio.height,
          pageCount: 1,
        },
        pages: [
          {
            id: "page-1",
            name: "Page 1",
            index: 0,
            background: { type: "color", color: "#ffffff" },
            layout: { layoutType: "free", frames: [] },
            layers: mapLayersToApi(layers) as any,
          } as TPage,
        ],
      };

      const saved = await projectService.updateEditorState(
        currentProjectId,
        editorState,
        currentProjectVersion,
      );

      if (saved?.currentVersion != null) {
        set({ currentProjectVersion: saved.currentVersion });
      }

      try {
        const assets = await assetService.getAssetsByProject(currentProjectId);
        const latestImageAsset = [...assets]
          .reverse()
          .find((a) => a.type === 1);

        if (latestImageAsset) {
          await projectService.updateMetadata(currentProjectId, {
            name: currentProjectName || "Untitled",
            thumbnailAssetId: latestImageAsset.id,
          });

          set((state) => {
            const newProjects = [...state.projects];
            const idx = newProjects.findIndex((p) => p.id === currentProjectId);
            if (idx > -1) {
              newProjects[idx] = {
                ...newProjects[idx],
                thumbnailAssetId: latestImageAsset.id,
                updatedAt: Date.now(),
              };
            }
            return { projects: newProjects };
          });
        }
      } catch (err) {
        console.warn(
          "[saveCurrentProject] Thumbnail metadata update skipped:",
          err,
        );
      }
    } catch (e: any) {
      set({ error: e.message || "Failed to save project" });
    } finally {
      set({ isLoading: false });
    }
  },

  // load project
  loadProject: async (id: string) => {
    set({ isLoading: true, error: null });

    try {
      const detail = await projectService.getProjectById(id);
      let editorState = detail.editorState;

      const rawLayerList = pickBestPageRawLayers(editorState);
      const document = getEditorDocument(editorState);
      const docW = Number(document.width) || 1080;
      const docH = Number(document.height) || 1080;
      const resolvedRatio = resolveAspectRatioFromDocument(docW, docH);

      const layers = mapLayersFromApi(rawLayerList);

      set({
        currentProjectId: detail.id,
        currentProjectName: detail.name,
        currentProjectVersion: detail.currentVersion,
        layers,
        selectedRatio: resolvedRatio,
        selectedLayerId: null,
      });
    } catch (e: any) {
      set({ error: e.message || "Failed to load project" });
    } finally {
      set({ isLoading: false });
    }
  },

  // delete project
  deleteProject: async (id: string) => {
    set({ isLoading: true });
    try {
      await projectService.deleteProject(id);
      set((state) => ({
        projects: state.projects.filter((p) => p.id !== id),
      }));
    } catch (e: any) {
      set({ error: e.message || "Failed to delete project" });
    } finally {
      set({ isLoading: false });
    }
  },

  // duplicate project
  duplicateProject: async (id: string) => {
    set({ isLoading: true, error: null });

    try {
      // lấy danh sách project hiện tại
      const { projects: currentProjects } = get();
      // lấy thông tin project gốc
      const original = await projectService.getProjectById(id);

      const parsedState = parseEditorState(original.editorState);

      // lấy kích thước document từ editorState
      let documentWidth: number | undefined;
      let documentHeight: number | undefined;
      const doc = parsedState?.document;
      if (
        doc &&
        typeof doc.width === "number" &&
        typeof doc.height === "number" &&
        doc.width > 0 &&
        doc.height > 0
      ) {
        documentWidth = doc.width;
        documentHeight = doc.height;
      }

      const copyName = `${original.name} (Copy)`;

      // tạo vỏ project mới (không có editorState)
      const copy = await projectService.createProject(copyName, {
        documentWidth,
        documentHeight,
      });

      // nếu có editorState thì cập nhập editorState cho project mới (project copy)
      if (parsedState) {
        const copiedState: TEditorState = {
          ...parsedState,
          document: {
            ...parsedState.document,
            title: copyName,
          },
        };

        // cập nhập editorState cho project mới (project copy)
        await projectService.updateEditorState(
          copy.id,
          copiedState,
          copy.currentVersion,
        );
      }

      // lấy danh sách project mới nhất
      const apiProjects = await projectService.getAllProject();

      // lấy từng project thô từ backend,
      // chuyển nó thành project đúng format frontend cần,
      // rồi gom lại thành một mảng mới tên là mappedProjects
      const mappedProjects = apiProjects.map((p) =>
        mapApiProjectToProject(p, currentProjects),
      );

      set({ projects: mappedProjects });
    } catch (e: any) {
      set({ error: e.message || "Failed to duplicate project" });
    } finally {
      set({ isLoading: false });
    }
  },

  // upload asset
  uploadAsset: async (
    projectId: string,
    type: EAssetType,
    uri: string,
    name?: string,
    mimeType?: string,
  ) => {
    set({ isUploadingAsset: true, error: null });

    try {
      const response = await assetService.uploadAsset(
        projectId,
        type,
        uri,
        name,
        mimeType,
      );

      const apiBaseUrl = getApiBaseUrl();
      const downloadUri = `${apiBaseUrl}/Asset/download/${response.id}`;

      return {
        id: response.id,
        uri:
          response.url && response.url.startsWith("http")
            ? response.url
            : downloadUri,
      };
    } catch (e: any) {
      set({ error: e.message || "Failed to upload asset" });
      return null;
    } finally {
      set({ isUploadingAsset: false });
    }
  },
});
