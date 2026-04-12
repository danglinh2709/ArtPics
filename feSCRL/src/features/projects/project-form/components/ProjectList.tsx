import React from "react";

import { Project } from "@/src/types/editor.types";

import { styles } from "../../styles/project-form.styles";
import { ProjectCard } from "./ProjectCard";
import { Loading } from "../../../../components/Loading";
import { ScrollView, View } from "react-native";

interface IProjectListProps {
  data: Project[];
  onSelectProject: (project: Project) => void;
}

function ProjectListComponent({ data, onSelectProject }: IProjectListProps) {
  const leftColumn = data.filter((_, i) => i % 2 === 0);
  const rightColumn = data.filter((_, i) => i % 2 !== 0);

  return (
    <ScrollView
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.masonryContainer}>
        <View style={styles.masonryColumn}>
          {leftColumn.map((item) => (
            <ProjectCard
              key={item.id}
              project={item}
              onPress={onSelectProject}
            />
          ))}
        </View>
        <View style={styles.masonryColumn}>
          {rightColumn.map((item) => (
            <ProjectCard
              key={item.id}
              project={item}
              onPress={onSelectProject}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

export const ProjectList = Object.assign(ProjectListComponent, {
  Loading: Loading,
});
