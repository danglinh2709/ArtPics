import { API_ENDPOINT } from "../configs/api-endpoint";
import { TemplateDetail, TemplateListItem } from "../types/template.types";
import instances from "./api";

export const templateService = {
  async getAllTemplates(category?: string): Promise<TemplateListItem[]> {
    const params = category ? { category } : {};
    const res = await instances.get(API_ENDPOINT.TEMPLATE.BASE, { params });
    return res.data;
  },

  async getTemplateById(id: string): Promise<TemplateDetail> {
    const res = await instances.get(API_ENDPOINT.TEMPLATE.BY_ID(id));
    return res.data;
  },

  async getTemplateCategories(): Promise<string[]> {
    const res = await instances.get(API_ENDPOINT.TEMPLATE.CATEGORIES);
    return res.data;
  },

  async createTemplate(data: any): Promise<TemplateDetail> {
    const res = await instances.post(API_ENDPOINT.TEMPLATE.BASE, data);
    return res.data;
  },

  async updateTemplate(id: string, data: any): Promise<TemplateDetail> {
    const res = await instances.put(API_ENDPOINT.TEMPLATE.BY_ID(id), data);
    return res.data;
  },

  async deleteTemplate(id: string): Promise<void> {
    await instances.delete(API_ENDPOINT.TEMPLATE.BY_ID(id));
  },
};
