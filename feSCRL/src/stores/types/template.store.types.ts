import { StateCreator } from "zustand";
import { TemplateDetail, TemplateListItem, TemplateCategory } from "@/src/types/template.types";

export interface TemplateState {
  // UI State
  isLoading: boolean;
  isDetailLoading: boolean;
  isApplyingTemplate: boolean;
  error: string | null;
  searchQuery: string;
  selectedCategory: string | null;
  isMenuOpen: boolean;
  isCreateModalOpen: boolean;
  isEditModalOpen: boolean;
  isPreviewModalOpen: boolean;

  // Data State
  templates: TemplateListItem[];
  recentTemplates: TemplateListItem[];
  categories: TemplateCategory[];
  selectedTemplateId: string | null;
  selectedTemplate: TemplateDetail | null;
  layers: any[]; // Specific layer type from project if needed
  selectedRatio: any | null;

  // UI Actions
  setSelectedCategory: (category: string | null) => void;
  setSearchQuery: (query: string) => void;
  openTemplateMenu: (id: string) => void;
  closeTemplateMenu: () => void;
  openCreateModal: () => void;
  closeCreateModal: () => void;
  openEditModal: (id: string) => void;
  closeEditModal: () => void;
  openPreviewModal: (id: string) => void;
  closePreviewModal: () => void;
  clearSelectedTemplate: () => void;

  // API Actions
  fetchTemplates: (category?: string) => Promise<void>;
  fetchRecentTemplates: () => Promise<void>;
  touchRecentTemplate: (id: string) => Promise<void>;
  fetchTemplateDetail: (id: string) => Promise<void>;
  fetchCategories: () => Promise<void>;
  createProjectFromTemplate: (templateId: string, projectName?: string) => Promise<any>;
  createTemplate: (data: any) => Promise<void>;
  updateTemplate: (id: string, data: any) => Promise<void>;
  deleteTemplate: (id: string) => Promise<void>;
}

export type TemplateSliceCreator<S> = StateCreator<
  TemplateState,
  [],
  [],
  S
>;
