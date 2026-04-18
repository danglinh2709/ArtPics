import { StateCreator } from "zustand";
import {
  ILayer,
  ILayerCrop,
  ILayerStyle,
  ILayerTransform,
  Project,
  TTextLayer,
  TPageBackground,
} from "../../types/editor.types";
import { TAspectRatio } from "@/src/types/project.type";
import { EAssetType } from "@/src/enums/layer.enum";

export interface ProjectState {
  // UI State
  isCreateModalVisible: boolean;
  selectedRatio: TAspectRatio | null;
  selectedLayerId: string | null;
  isLoading: boolean;
  isUploadingAsset: boolean;
  error: string | null;

  // Project Menu State
  isProjectMenuVisible: boolean;
  activeProjectMenuId: string | null;

  // Project Data
  projects: Project[];
  currentProjectId: string | null;
  currentProjectName: string;
  currentProjectVersion: number;
  layers: ILayer[];
  pageBackground: TPageBackground;

  // Actions
  openCreateModal: () => void;
  closeCreateModal: () => void;
  openProjectMenu: (id: string) => void;
  closeProjectMenu: () => void;
  setSelectedRatio: (ratio: TAspectRatio) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Project Management (API)
  fetchProjects: () => Promise<void>;
  saveCurrentProject: (thumbnailUri?: string) => Promise<void>;
  updateEditorState: (projectId: string, editorState: any, version: number) => Promise<any>;
  loadProject: (id: string) => Promise<void>;
  createNewProject: (name: string, ratio: TAspectRatio) => Promise<any>;
  deleteProject: (id: string) => Promise<void>;
  duplicateProject: (id: string) => Promise<void>;
  toggleStarProject: (id: string) => Promise<void>;
  clearLayers: () => void;

  // Layer Actions
  addLayer: (layer: ILayer) => void;
  updateLayer: (id: string, updates: Partial<ILayer>) => void;
  deleteLayer: (id: string) => void;
  duplicateLayer: (id: string) => void;
  selectLayer: (id: string | null) => void;
  lockLayer: (id: string, isLocked: boolean) => void;
  updateLayerTransform: (id: string, updates: Partial<ILayerTransform>) => void;
  moveLayer: (id: string, dx: number, dy: number) => void;
  rotateLayer: (id: string, rotation: number) => void;
  replaceLayerAsset: (id: string, uri: string, assetId?: string | null) => void;
  updateLayerCrop: (id: string, updates: Partial<ILayerCrop>) => void;
  resetLayerCrop: (id: string) => void;
  setLayerFrameRatio: (id: string, ratio: number) => void;
  updateLayerStyle: (id: string, updates: Partial<ILayerStyle>) => void;
  updateLayerOpacity: (id: string, opacity: number) => void;
  updateLayerAdjustments: (
    id: string,
    updates: Partial<ILayer["adjustments"]>,
  ) => void;
  bringToFront: (id: string) => void;
  sendToBack: (id: string) => void;
  uploadAsset: (
    projectId: string,
    type: EAssetType,
    uri: string,
    name?: string,
    mimeType?: string,
  ) => Promise<{ id: string; uri: string } | null>;

  addTextLayer: (textLayer: TTextLayer) => void;
  updateLayerText: (id: string, text: string) => void;

  updatePageBackground: (bg: TPageBackground) => void;
}

// alias
export type ProjectSliceCreator<T> = StateCreator<ProjectState, [], [], T>;
