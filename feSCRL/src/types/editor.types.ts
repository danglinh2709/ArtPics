import { TAspectRatio } from "./project.type";

export interface ILayer {
  id: string;
  type: TLayerType;
  uri: string;
  text?: string;
  assetId?: string | null;
  transform: ILayerTransform;
  crop: ILayerCrop;
  style: ILayerStyle;
  adjustments: ILayerAdjustments;
  isLocked: boolean;
  isVisible: boolean;
}

export type TLayerType = "image" | "text" | "video" | "image-text";

export interface ILayerTransform {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  flipX: boolean;
  flipY: boolean;
  zIndex: number;
}

export interface ILayerCrop {
  scale: number;
  translateX: number;
  translateY: number;
  rotation: number;
  aspectRatio: number | null;
}

export interface ILayerStyle {
  opacity: number;
  borderRadius: number;
  individualCorners: {
    topLeft: number;
    topRight: number;
    bottomLeft: number;
    bottomRight: number;
  } | null;
  border: {
    width: number;
    color: string;
    opacity: number;
  } | null;
}

export interface ILayerAdjustments {
  brightness: number; //Độ sáng
  contrast: number; // Độ tương phản
  saturation: number; // Độ bão hòa
  blur: number; // Độ mờ
  sharpen: number; // Độ sắc nét
}

export interface Project {
  id: string;
  name: string;
  thumbnailAssetId?: string | null;
  ratio?: TAspectRatio | null;
  layers: ILayer[];
  updatedAt: number;
}

export type TToolbarTab =
  | "replace"
  | "crop"
  | "style"
  | "adjust"
  | "text"
  | "format"
  | "align"
  | "position"
  | "opacity";

export type TLayerAlignment =
  | "left"
  | "center-h"
  | "right"
  | "top"
  | "center-v"
  | "bottom";

export type TLayerAction =
  | "delete"
  | "duplicate"
  | "lock"
  | "unlock"
  | "bring-to-front"
  | "bring-forward"
  | "send-backward"
  | "send-to-back";

export type TTextLayer = {
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
};
