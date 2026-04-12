export interface TemplateListItem {
  id: string;
  name: string;
  category?: string;
  description?: string;
  previewImageUrl?: string;
  thumbnailUrl?: string;
  tags: string[];
  sortOrder: number;
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
}
