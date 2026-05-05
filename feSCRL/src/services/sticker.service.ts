import { API_ENDPOINT } from "../configs/api-endpoint";
import api from "./api";

export interface ISticker {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  tags: string[];
  isActive: boolean;
  sortOrder: number;
}

export const stickerService = {
  getAll: async (category?: string): Promise<ISticker[]> => {
    const params = category ? { category } : {};
    const response = await api.get<ISticker[]>(API_ENDPOINT.STICKER.BASE, {
      params,
    });
    return response.data;
  },

  getCategories: async (): Promise<string[]> => {
    const response = await api.get<string[]>(API_ENDPOINT.STICKER.CATEGORIES);
    return response.data;
  },
};
