import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";

import { Project } from "@/src/types/editor.types";

import { Typography } from "../../../../components/Typography";
import { styles } from "../../styles/project-form.styles";
import { resolveAssetUri, useProjectStore } from "@/src/stores/project.store";

import { EDITOR_UI_CONSTANTS } from "@/src/constants/editor.constant";
import { Dimensions } from "react-native";
import { ProjectMiniCanvas } from "./ProjectMiniCanvas";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

interface IProjectCardProps {
  project: Project;
  onPress: (project: Project) => void;
}

export function ProjectCard({ project, onPress }: IProjectCardProps) {
  const { openProjectMenu, toggleStarProject } = useProjectStore();
  const [containerWidth, setContainerWidth] = useState<number>(0);

  const previewRatio = project.ratio?.ratio ?? 1;
  const cardHeight = containerWidth ? containerWidth / previewRatio : 150;

  // calculate kích thước tham chiếu of editor
  const editorReferenceWidth =
    SCREEN_WIDTH * EDITOR_UI_CONSTANTS.CANVAS_WIDTH_RATIO;
  const editorReferenceHeight = editorReferenceWidth / previewRatio;

  // check project has layer ?
  const hasLayers = project.layers && project.layers.length > 0;

  return (
    <TouchableOpacity
      style={styles.projectCard}
      onPress={() => onPress(project)}
      activeOpacity={0.85}
    >
      <View
        style={[styles.thumbnailContainer, { height: cardHeight }]} // chia cao thay đổi theo ratio project
        onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)} // get real width of container after render
      >
        {/* hasLayers = true ... */}
        {hasLayers && containerWidth > 0 ? (
          <ProjectMiniCanvas
            layers={project.layers}
            pageBackground={project.pageBackground}
            canvasWidth={editorReferenceWidth}
            canvasHeight={editorReferenceHeight}
            thumbnailWidth={containerWidth}
            thumbnailHeight={cardHeight}
          />
        ) : (
          <View style={styles.placeholderThumbnail}>
            <Ionicons name="image-outline" size={36} color="#8E8E93" />
          </View>
        )}

        <TouchableOpacity
          style={styles.projectMenuBtn}
          activeOpacity={0.8}
          onPress={() => openProjectMenu(project.id)}
        >
          <Ionicons name="ellipsis-horizontal" size={18} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          style={{ position: 'absolute', top: 8, right: 44, width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.45)' }}
          activeOpacity={0.8}
          onPress={() => toggleStarProject(project.id)}
        >
          <Ionicons name={project.isStarred ? "heart" : "heart-outline"} size={16} color={project.isStarred ? "#FF3B30" : "#fff"} />
        </TouchableOpacity>
      </View>

      <Typography variant="caption" style={styles.projectLabel}>
        {project.name || project.ratio?.label || "Untitled"}
      </Typography>
    </TouchableOpacity>
  );
}
