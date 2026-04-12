import { create } from "zustand";
import { createTemplateDataSlice } from "./slices/template/template-data.slice";
import { createTemplateUiSlice } from "./slices/template/template-ui.slice";
import { createTemplateApiSlice } from "./slices/template/template-api.slice";
import { TemplateState } from "./types/template.store.types";

export const useTemplateStore = create<TemplateState>((...args) => ({
  ...createTemplateDataSlice(...args),
  ...createTemplateUiSlice(...args),
  ...createTemplateApiSlice(...args),
}));

export type { TemplateState } from "./types/template.store.types";
