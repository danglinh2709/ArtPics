import { API_ENDPOINT } from "../configs/api-endpoint";
import {
  TProjectDetail,
  TProjectListItem,
  TEditorState,
} from "../types/project.type";
import instances from "./api";

export const projectService = {
  async getAllProject(): Promise<TProjectListItem[]> {
    const res = await instances.get(API_ENDPOINT.PROJECT.BASE);
    return res.data;
  },

  async getProjectById(id: string): Promise<TProjectDetail> {
    const res = await instances.get(API_ENDPOINT.PROJECT.BY_ID(id));
    return res.data;
  },

  async createProject(
    name: string,
    options?: {
      type?: string;
      documentWidth?: number;
      documentHeight?: number;
    },
  ): Promise<TProjectDetail> {
    const body: Record<string, unknown> = {
      name,
      type: options?.type ?? "post",
    };
    if (
      options?.documentWidth != null &&
      options?.documentHeight != null &&
      options.documentWidth > 0 &&
      options.documentHeight > 0
    ) {
      body.documentWidth = options.documentWidth;
      body.documentHeight = options.documentHeight;
    }
    const res = await instances.post(API_ENDPOINT.PROJECT.BASE, body);
    return res.data;
  },

  async updateProject(
    id: string,
    data: Partial<TProjectDetail>,
  ): Promise<TProjectDetail> {
    const res = await instances.put(API_ENDPOINT.PROJECT.UPDATE(id), data);
    return res.data;
  },

  async updateEditorState(
    id: string,
    editorState: TEditorState,
    currentVersion: number,
  ): Promise<TProjectDetail> {
    const res = await instances.patch(API_ENDPOINT.PROJECT.EDITOR_STATE(id), {
      editorState,
      currentVersion,
    });
    return res.data;
  },

  async deleteProject(id: string): Promise<void> {
    await instances.delete(API_ENDPOINT.PROJECT.DELETE(id));
  },

  async updateMetadata(id: string, metadata: any): Promise<any> {
    const res = await instances.patch(API_ENDPOINT.PROJECT.METADATA(id), metadata);
    return res.data;
  },
};
