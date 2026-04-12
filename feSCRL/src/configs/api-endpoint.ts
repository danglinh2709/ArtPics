export const API_ENDPOINT = {
  PROJECT: {
    BASE: "/Project",
    BY_ID: (id: string) => `/Project/${id}`,
    DELETE: (id: string) => `/Project/${id}`,
    UPDATE: (id: string) => `/Project/${id}`,
    EDITOR_STATE: (id: string) => `/Project/${id}/editor-state`,
    METADATA: (id: string) => `/Project/${id}/metadata`,
  },
  ASSET: {
    BASE: "/Asset",
    UPLOAD: "/Asset/upload",
    BY_PROJECT: (projectId: string) => `/Asset/project/${projectId}`,
    DELETE: (id: string) => `/Asset/${id}`,
    DOWNLOAD: (id: string) => `/Asset/download/${id}`,
  },
  FOLDER: {
    BASE: "/Folders",
    BY_ID: (id: string) => `/Folders/${id}`,
    ADD_PROJECTS: (id: string) => `/Folders/${id}/projects`,
    REMOVE_PROJECT: (id: string, projectId: string) => `/Folders/${id}/projects/${projectId}`,
  },
  TEMPLATE: {
    BASE: "/Template",
    BY_ID: (id: string) => `/Template/${id}`,
    CATEGORIES: "/Template/categories",
  }
};
