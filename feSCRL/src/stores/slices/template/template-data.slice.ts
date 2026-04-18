import { TemplateSliceCreator } from "../../types/template.store.types";

export const createTemplateDataSlice: TemplateSliceCreator<
  Pick<
    import("../../types/template.store.types").TemplateState,
    | "templates"
    | "recentTemplates"
    | "categories"
    | "selectedTemplateId"
    | "selectedTemplate"
    | "layers"
    | "selectedRatio"
    | "clearSelectedTemplate"
  >
> = (set) => ({
  templates: [],
  recentTemplates: [],
  categories: [],
  selectedTemplateId: null,
  selectedTemplate: null,
  layers: [],
  selectedRatio: null,

  clearSelectedTemplate: () => set({ selectedTemplate: null, selectedTemplateId: null, layers: [], selectedRatio: null }),
});
