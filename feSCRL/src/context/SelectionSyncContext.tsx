import React, { createContext, useContext, useMemo } from "react";
import { makeMutable, SharedValue } from "react-native-reanimated";
import { ILayerTransformValues } from "../types/layer.type";

interface ISelectionSyncContext {
  transformValues: ILayerTransformValues;
  reportTransform: (values: {
    tx: number;
    ty: number;
    rotation: number;
    width: number;
    height: number;
  }) => void;
  initializeSync: (values: {
    tx: number;
    ty: number;
    rotation: number;
    width: number;
    height: number;
  }) => void;
}

const SelectionSyncContext = createContext<ISelectionSyncContext | null>(null);

export function SelectionSyncProvider({ children }: { children: React.ReactNode }) {
  const tx = useMemo(() => makeMutable(0), []);
  const ty = useMemo(() => makeMutable(0), []);
  const rotation = useMemo(() => makeMutable(0), []);
  const width = useMemo(() => makeMutable(0), []);
  const height = useMemo(() => makeMutable(0), []);

  const transformValues = useMemo(
    () => ({ tx, ty, rotation, width, height }),
    [tx, ty, rotation, width, height],
  );

  const reportTransform = (values: {
    tx: number;
    ty: number;
    rotation: number;
    width: number;
    height: number;
  }) => {
    "worklet";
    tx.value = values.tx;
    ty.value = values.ty;
    rotation.value = values.rotation;
    width.value = values.width;
    height.value = values.height;
  };

  const initializeSync = (values: {
    tx: number;
    ty: number;
    rotation: number;
    width: number;
    height: number;
  }) => {
    tx.value = values.tx;
    ty.value = values.ty;
    rotation.value = values.rotation;
    width.value = values.width;
    height.value = values.height;
  };

  return (
    <SelectionSyncContext.Provider
      value={{ transformValues, reportTransform, initializeSync }}
    >
      {children}
    </SelectionSyncContext.Provider>
  );
}

export function useSelectionSync() {
  const context = useContext(SelectionSyncContext);
  if (!context) {
    throw new Error("useSelectionSync must be used within SelectionSyncProvider");
  }
  return context;
}
