import { MIN_HEIGHT, MIN_WIDTH } from "../constants/selectionOverlay.constants";
import { TResizeHandle } from "../types/selectionOverlay.types";

export function clampSize(value: number, min: number) {
  "worklet";
  return Math.max(min, value);
}

// hệ trục local of layer
export function getAxes(rotationRad: number) {
  "worklet";
  const cos = Math.cos(rotationRad);
  const sin = Math.sin(rotationRad);

  const ux = { x: cos, y: sin };
  const uy = { x: -sin, y: cos };

  return { ux, uy, cos, sin };
}

// chuyển đổi tọa độ từ hệ trục global sang hệ trục local
export function projectToLocal(dx: number, dy: number, rotationRad: number) {
  "worklet";
  const { cos, sin } = getAxes(rotationRad);

  return {
    localDx: dx * cos + dy * sin,
    localDy: -dx * sin + dy * cos,
  };
}

export function applyResizeFromHandle(params: {
  handle: TResizeHandle;
  dx: number;
  dy: number;
  startX: number;
  startY: number;
  startWidth: number;
  startHeight: number;
  rotationRad: number;
}) {
  "worklet";

  const {
    handle,
    dx,
    dy,
    startX,
    startY,
    startWidth,
    startHeight,
    rotationRad,
  } = params;

  const { ux, uy } = getAxes(rotationRad);
  const { localDx, localDy } = projectToLocal(dx, dy, rotationRad);

  const startCenterX = startX + startWidth / 2;
  const startCenterY = startY + startHeight / 2;

  let widthSign = 0;
  let heightSign = 0;

  switch (handle) {
    case "rightMiddle":
      widthSign = 1;
      break;
    case "leftMiddle":
      widthSign = -1;
      break;
    case "bottomMiddle":
      heightSign = 1;
      break;
    case "topMiddle":
      heightSign = -1;
      break;
    case "topLeft":
      widthSign = -1;
      heightSign = -1;
      break;
    case "topRight":
      widthSign = 1;
      heightSign = -1;
      break;
    case "bottomLeft":
      widthSign = -1;
      heightSign = 1;
      break;
    case "bottomRight":
      widthSign = 1;
      heightSign = 1;
      break;
  }

  const proposedWidth =
    widthSign === 0 ? startWidth : startWidth + widthSign * localDx;
  const proposedHeight =
    heightSign === 0 ? startHeight : startHeight + heightSign * localDy;

  const nextWidth =
    widthSign === 0 ? startWidth : clampSize(proposedWidth, MIN_WIDTH);
  const nextHeight =
    heightSign === 0 ? startHeight : clampSize(proposedHeight, MIN_HEIGHT);

  const appliedDeltaW = nextWidth - startWidth;
  const appliedDeltaH = nextHeight - startHeight;

  const shiftX =
    widthSign * appliedDeltaW * 0.5 * ux.x +
    heightSign * appliedDeltaH * 0.5 * uy.x;

  const shiftY =
    widthSign * appliedDeltaW * 0.5 * ux.y +
    heightSign * appliedDeltaH * 0.5 * uy.y;

  const nextCenterX = startCenterX + shiftX;
  const nextCenterY = startCenterY + shiftY;

  return {
    x: nextCenterX - nextWidth / 2,
    y: nextCenterY - nextHeight / 2,
    width: nextWidth,
    height: nextHeight,
  };
}
