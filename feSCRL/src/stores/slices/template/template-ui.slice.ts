import { TemplateSliceCreator } from "../../types/template.store.types";

export const createTemplateUiSlice: TemplateSliceCreator<
  Pick<
    import("../../types/template.store.types").TemplateState,
    | "isLoading"
    | "error"
    | "searchQuery"
    | "selectedCategory"
    | "isMenuOpen"
    | "isCreateModalOpen"
    | "isEditModalOpen"
    | "isPreviewModalOpen"
    | "setSelectedCategory"
    | "setSearchQuery"
    | "openTemplateMenu"
    | "closeTemplateMenu"
    | "openCreateModal"
    | "closeCreateModal"
    | "openEditModal"
    | "closeEditModal"
    | "openPreviewModal"
    | "closePreviewModal"
  >
> = (set) => ({
  isLoading: false,
  error: null,
  searchQuery: "",
  selectedCategory: null,
  isMenuOpen: false,
  isCreateModalOpen: false,
  isEditModalOpen: false,
  isPreviewModalOpen: false,

  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  openTemplateMenu: (id) => set({ selectedTemplateId: id, isMenuOpen: true }),
  closeTemplateMenu: () => set({ selectedTemplateId: null, isMenuOpen: false }),
  openCreateModal: () => set({ isCreateModalOpen: true }),
  closeCreateModal: () => set({ isCreateModalOpen: false }),
  openEditModal: (id) => set({ selectedTemplateId: id, isEditModalOpen: true }),
  closeEditModal: () => set({ selectedTemplateId: null, isEditModalOpen: false }),
  openPreviewModal: (id) => set({ selectedTemplateId: id, isPreviewModalOpen: true }),
  closePreviewModal: () => set({ selectedTemplateId: null, isPreviewModalOpen: false }),
});
