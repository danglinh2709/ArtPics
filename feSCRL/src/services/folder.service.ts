import { API_ENDPOINT } from "../configs/api-endpoint";
import instances from "./api";
import { IProjectFolder } from "../types/folder.types";

export const folderService = {
  async getAllFolders(): Promise<IProjectFolder[]> {
    const res = await instances.get(API_ENDPOINT.FOLDER.BASE);
    return res.data;
  },

  async createFolder(name: string): Promise<IProjectFolder> {
    const res = await instances.post(API_ENDPOINT.FOLDER.BASE, { name });
    return res.data;
  },

  async updateFolder(id: string, name: string): Promise<IProjectFolder> {
    const res = await instances.put(API_ENDPOINT.FOLDER.BY_ID(id), { name });
    return res.data;
  },

  async deleteFolder(id: string): Promise<void> {
    await instances.delete(API_ENDPOINT.FOLDER.BY_ID(id));
  },

  async addProjectsToFolder(id: string, projectIds: string[]): Promise<IProjectFolder> {
    const res = await instances.post(API_ENDPOINT.FOLDER.ADD_PROJECTS(id), { projectIds });
    return res.data;
  },

  async removeProjectFromFolder(id: string, projectId: string): Promise<IProjectFolder> {
    const res = await instances.delete(API_ENDPOINT.FOLDER.REMOVE_PROJECT(id, projectId));
    return res.data;
  }
};
