export interface TemplateCategory {
  id: string;
  code: string;
  name: string;
  sortOrder: number;
  coverImageUrl: string;
}

export interface TemplateListItem {
  id: string;
  code: string;
  name: string;
  category?: string;
  categoryCode?: string;
  description?: string;
  previewImageUrl?: string;
  thumbnailUrl?: string;
  tags: string[];
  sortOrder: number;
  width: number;
  height: number;
  pageCount: number;
  imageLayerCount: number;
  aspectKey: TemplateAspectKey;
  format?: string;
  isProject?: boolean;
  projectData?: any;
}

export interface TemplateDetail extends TemplateListItem {
  isDefault: boolean;
  isActive: boolean;
  templateData: any;
  format?: string;
}

export type TemplateAspectKey = "square" | "portrait" | "landscape" | "story";

