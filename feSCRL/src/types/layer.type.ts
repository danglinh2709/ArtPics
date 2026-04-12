import { SharedValue } from "react-native-reanimated";

export interface ILayerTransformValues {
  tx: SharedValue<number>; // vị trí theo trục ngang
  ty: SharedValue<number>; // vị trí theo trục dọc
  rotation: SharedValue<number>; // góc xoay
  width: SharedValue<number>; // chiều rộng
  height: SharedValue<number>; // chiều cao
}
