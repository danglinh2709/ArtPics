import { API_ENDPOINT } from "../configs/api-endpoint";
import { EAssetType } from "../enums/layer.enum";
import { IAssetResponse } from "../interfaces/response/asset.response";
import api from "./api";

export const assetService = {
  uploadAsset: async (
    projectId: string,
    type: EAssetType,
    fileUri: string,
    fileName?: string,
    mimeType?: string,
  ): Promise<IAssetResponse> => {
    const formData = new FormData();

    const fileToUpload = {
      uri: fileUri,
      name: fileName || `asset_${Date.now()}.jpg`,
      type: mimeType || "image/jpeg",
    } as any;

    formData.append("file", fileToUpload);

    const response = await api.post<IAssetResponse>(
      `${API_ENDPOINT.ASSET.UPLOAD}?projectId=${projectId}&type=${type}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    return response.data;
  },

  getAssetsByProject: async (projectId: string): Promise<IAssetResponse[]> => {
    const response = await api.get<IAssetResponse[]>(
      API_ENDPOINT.ASSET.BY_PROJECT(projectId),
    );
    return response.data;
  },

  deleteAsset: async (id: string): Promise<void> => {
    await api.delete(API_ENDPOINT.ASSET.DELETE(id));
  },
};
