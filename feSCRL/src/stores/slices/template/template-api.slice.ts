import { TemplateSliceCreator } from "../../types/template.store.types";
import { templateService } from "../../../services/template.service";
import { useProjectStore } from "../../project.store";
import { resolveAspectRatioFromDocument } from "@/src/stores/helpers/aspect-ratio.utils";
import {
  pickBestPageRawLayers,
  getEditorDocument,
  mapLayersFromApi,
} from "../../helpers/editor-state";

export const createTemplateApiSlice: TemplateSliceCreator<
  Pick<
    import("../../types/template.store.types").TemplateState,
    | "fetchTemplates"
    | "fetchTemplateDetail"
    | "fetchCategories"
    | "createProjectFromTemplate"
    | "createTemplate"
    | "updateTemplate"
    | "deleteTemplate"
  >
> = (set, get) => ({
  fetchTemplates: async (category?: string) => {
    set({ isLoading: true, error: null });

    try {
      const templates = await templateService.getAllTemplates(category);
      set({ templates: templates || [] });
    } catch (e: any) {
      set({ error: e.message || "Failed to fetch templates" });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchTemplateDetail: async (id: string) => {
    set({ isLoading: true, error: null });

    try {
      const detail = await templateService.getTemplateById(id);

      const editorState = detail.templateData;
      const rawLayerList = pickBestPageRawLayers(editorState);
      const document = getEditorDocument(editorState);

      const docW = Number(document?.width) || 1080;
      const docH = Number(document?.height) || 1080;
      const resolvedRatio = resolveAspectRatioFromDocument(docW, docH);
      const layers = mapLayersFromApi(rawLayerList);

      set({
        selectedTemplate: detail,
        layers,
        selectedRatio: resolvedRatio,
      });
    } catch (e: any) {
      set({ error: e.message || "Failed to fetch template detail" });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchCategories: async () => {
    set({ isLoading: true, error: null });

    try {
      const categories = await templateService.getTemplateCategories();
      set({ categories: categories || [] });
    } catch (e: any) {
      set({ error: e.message || "Failed to fetch categories" });
    } finally {
      set({ isLoading: false });
    }
  },

  createProjectFromTemplate: async (
    templateId: string,
    projectName?: string,
  ) => {
    set({ isLoading: true, error: null });

    try {
      const template = await templateService.getTemplateById(templateId);
      if (
        !template ||
        !template.templateData ||
        !template.templateData.document
      ) {
        throw new Error("Mẫu thiết kế không hợp lệ hoặc thiếu dữ liệu");
      }

      const name = projectName || template.name;
      const width = template.templateData.document.width || 1080;
      const height = template.templateData.document.height || 1080;

      const { createNewProject, updateEditorState, loadProject } =
        await import("../project/project-api.slice").then((m) =>
          m.createProjectApiSlice(
            (useProjectStore as any).setState,
            (useProjectStore as any).getState,
            null as any,
          ),
        );

      // 1. Create empty project with template dimensions
      const newProject = await createNewProject(name, {
        id: "custom",
        width,
        height,
        label: "Template",
        ratio: width / (height || 1),
      });

      if (!newProject) throw new Error("Không thể tạo dự án mới từ mẫu");

      // 2. Clone template data into project
      const editorState = {
        ...template.templateData,
        document: {
          ...template.templateData.document,
          title: name,
        },
      };

      await updateEditorState(
        newProject.id,
        editorState,
        newProject.currentVersion,
      );

      // 3. Load the filled project
      await loadProject(newProject.id);

      return newProject;
    } catch (e: any) {
      set({ error: e.message || "Lỗi khi tạo dự án từ mẫu" });
      return null;
    } finally {
      set({ isLoading: false });
    }
  },

  createTemplate: async (data: any) => {
    set({ isLoading: true, error: null });
    try {
      await templateService.createTemplate(data);
      const { fetchTemplates, selectedCategory } = get();
      await fetchTemplates(selectedCategory || undefined);
    } catch (e: any) {
      set({ error: e.message || "Failed to create template" });
    } finally {
      set({ isLoading: false });
    }
  },

  updateTemplate: async (id: string, data: any) => {
    set({ isLoading: true, error: null });
    try {
      await templateService.updateTemplate(id, data);
      const { fetchTemplates, selectedCategory } = get();
      await fetchTemplates(selectedCategory || undefined);
    } catch (e: any) {
      set({ error: e.message || "Failed to update template" });
    } finally {
      set({ isLoading: false });
    }
  },

  deleteTemplate: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      await templateService.deleteTemplate(id);
      const { templates } = get();
      set({ templates: (templates || []).filter((t) => t.id !== id) });
    } catch (e: any) {
      set({ error: e.message || "Failed to delete template" });
    } finally {
      set({ isLoading: false });
    }
  },
});
