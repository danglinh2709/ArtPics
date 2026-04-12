export type TProjectType = "post" | "story" | "carousel";

export type TProjectStatus = "Draft" | "Published" | "Archived";

export type TBackground = {
  type: "color" | "image";
  color?: string;
  assetId?: string;
};

export type TLayout = {
  layoutType: "free" | "grid" | "template";
  frames: unknown[];
};

export type TLayerTransform = {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
  opacity?: number;
};

export type TTextLayer = {
  id: string;
  type: "text";
  name?: string;
  visible?: boolean;
  locked?: boolean;
  transform: TLayerTransform;
  content: {
    text: string;
    fontFamily?: string;
    fontSize?: number;
    fontWeight?: number | string;
    color?: string;
    align?: "left" | "center" | "right";
    lineHeight?: number;
  };
};

export type TImageLayer = {
  id: string;
  type: "image";
  name?: string;
  visible?: boolean;
  locked?: boolean;
  transform: TLayerTransform;
  content: {
    assetId?: string;
    fit?: "cover" | "contain";
    borderRadius?: number;
  };
};

export type ShapeLayer = {
  id: string;
  type: "shape";
  name?: string;
  visible?: boolean;
  locked?: boolean;
  transform: TLayerTransform;
  content: {
    shapeType: "rectangle" | "circle";
    fill?: string;
    stroke?: string | null;
    cornerRadius?: number;
  };
};

export type TLayer = TTextLayer | TImageLayer | ShapeLayer;

export type TPage = {
  id: string;
  name: string;
  index: number;
  background: TBackground;
  layout: TLayout;
  layers: TLayer[];
};

export type TEditorState = {
  schemaVersion: number;
  document: {
    type: TProjectType;
    title: string;
    width: number;
    height: number;
    pageCount: number;
  };
  pages: TPage[];
  assets?: unknown[];
  selection?: unknown;
  viewport?: unknown;
  preferences?: unknown;
  timeline?: unknown;
  meta?: unknown;
};

export type TProjectListItem = {
  id: string;
  name: string;
  status: TProjectStatus;
  currentVersion: number;
  thumbnailAssetId?: string | null;
  lastOpenedAt?: string | null;
  isStarred: boolean;
  updatedAt: string;
  documentWidth?: number | null;
  documentHeight?: number | null;
  editorState?: TEditorState | any;
};

export type TProjectDetail = {
  id: string;
  name: string;
  templateId?: string | null;
  status: TProjectStatus;
  currentVersion: number;
  editorState: TEditorState;
  thumbnailAssetId?: string | null;
  lastOpenedAt?: string | null;
  isStarred: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type TAspectRatio = {
  id: string;
  label: string;
  ratio: number;
  width: number;
  height: number;
};
