import React from "react";
import { View } from "react-native";
import { styles } from "../styles/template.styles";
import { TemplateCard } from "./TemplateCard";
import { TemplateListItem } from "@/src/types/template.types";
import { ProjectCard } from "../../projects/project-form/components/ProjectCard";
import { useProjectStore } from "@/src/stores/project.store";
import { useRouter } from "expo-router";
import { ROUTES } from "@/src/enums/route.enum";

interface ITemplateGridProps {
  data: TemplateListItem[];
}

export function TemplateGrid({ data }: ITemplateGridProps) {
  const leftColumn: TemplateListItem[] = [];
  const rightColumn: TemplateListItem[] = [];
  
  const router = useRouter();
  const { loadProject } = useProjectStore();

  const handleSelectProject = async (project: any) => {
    await loadProject(project.id);
    router.push(ROUTES.EDITOR);
  };

  data.forEach((item, index) => {
    if (index % 2 === 0) {
      leftColumn.push(item);
    } else {
      rightColumn.push(item);
    }
  });

  return (
    <View style={styles.masonryContainer}>
      <View style={styles.masonryColumn}>
        {leftColumn.map((item) => (
          item.isProject ? (
            <ProjectCard key={item.id} project={item.projectData} onPress={handleSelectProject} />
          ) : (
            <TemplateCard key={item.id} template={item} />
          )
        ))}
      </View>
      <View style={styles.masonryColumn}>
        {rightColumn.map((item) => (
          item.isProject ? (
            <ProjectCard key={item.id} project={item.projectData} onPress={handleSelectProject} />
          ) : (
            <TemplateCard key={item.id} template={item} />
          )
        ))}
      </View>
    </View>
  );
}
