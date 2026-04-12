import { TToolbarTab } from "@/src/types/editor.types";
import React from "react";
import { ReplacePanel } from "../../toolbar/ReplacePanel";
import { StylePanel } from "../../toolbar/StylePanel";
import { CropPanel } from "../../toolbar/CropPanel";
import { AdjustPanel } from "../../toolbar/AdjustPanel";
import { PanelContainer } from "../../toolbar/PanelContainer";

interface IEditorPanelsProps {
  activeTab: TToolbarTab | null;
  onClose: () => void;
}

export function EditorPanels({ activeTab, onClose }: IEditorPanelsProps) {
  const renderPanel = () => {
    switch (activeTab) {
      case "replace":
        return <ReplacePanel onClose={onClose} />;
      case "style":
        return <StylePanel />;
      case "crop":
        return <CropPanel />;
      case "adjust":
        return <AdjustPanel />;
      default:
        return null;
    }
  };

  return (
    <PanelContainer
      title={
        activeTab ? activeTab.charAt(0).toUpperCase() + activeTab.slice(1) : ""
      }
      isVisible={!!activeTab}
      onClose={onClose}
    >
      {renderPanel()}
    </PanelContainer>
  );
}
