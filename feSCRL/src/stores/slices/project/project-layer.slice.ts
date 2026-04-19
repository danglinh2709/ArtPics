import { ProjectSliceCreator } from "../../types/project.store.types";
import { createLayerArrangeActions } from "../project-layer/arrange.actions";
import { createLayerClearAndSelectActions } from "../project-layer/clear-and-select.actions";
import { createLayerCropActions } from "../project-layer/crop.actions";
import { createLayerCrudActions } from "../project-layer/crud.actions";
import { createLayerStyleActions } from "../project-layer/style.actions";
import { createLayerTransformActions } from "../project-layer/transform.actions";

export const createProjectLayerSlice: ProjectSliceCreator<
  Pick<
    import("../../types/project.store.types").ProjectState,
    | "addLayer"
    | "updateLayer"
    | "deleteLayer"
    | "duplicateLayer"
    | "selectLayer"
    | "lockLayer"
    | "updateLayerTransform"
    | "moveLayer"
    | "rotateLayer"
    | "replaceLayerAsset"
    | "updateLayerCrop"
    | "resetLayerCrop"
    | "setLayerFrameRatio"
    | "updateLayerStyle"
    | "updateLayerOpacity"
    | "updateLayerAdjustments"
    | "bringToFront"
    | "sendToBack"
    | "addTextLayer"
    | "updateLayerText"
  >
> = (set, get, api) => ({
  ...createLayerClearAndSelectActions(set, get, api),
  ...createLayerCrudActions(set, get, api),
  ...createLayerTransformActions(set, get, api),
  ...createLayerCropActions(set, get, api),
  ...createLayerStyleActions(set, get, api),
  ...createLayerArrangeActions(set, get, api),
});
