import instances from "./api"; // Khớp với path file config Axios của bạn
import { API_ENDPOINT } from "../configs/api-endpoint";
import { ITemplateCategory } from "../types/template-category.types";

export const templateCategoryService = {
  async getAllActiveCategories(): Promise<ITemplateCategory[]> {
    const res = await instances.get<ITemplateCategory[]>(
      API_ENDPOINT.TEMPLATE_CATEGORY.BASE,
    );
    return res.data;
  },
};
