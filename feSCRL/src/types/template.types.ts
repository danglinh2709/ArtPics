export interface TemplateCategory {
  id: string;
  code: string;
  name: string;
  sortOrder: number;
  coverImageUrl: string;
}

export interface TemplateListItem {
  id: string;
  name: string;
  category?: string;
  categoryCode?: string;
  description?: string;
  previewImageUrl?: string;
  thumbnailUrl?: string;
  tags: string[];
  sortOrder: number;
  isProject?: boolean;
  projectData?: any;
}

export interface TemplateDetail {
  id: string;
  name: string;
  category?: string;
  description?: string;
  previewImageUrl?: string;
  thumbnailUrl?: string;
  templateData: any;
  tags: string[];
  categoryCode?: string;
  format?: string;
  pageCount?: number;
  aspectKey?: string;
}
