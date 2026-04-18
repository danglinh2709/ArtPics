import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useProjectStore } from "@/src/stores/project.store";
import { useFolderStore } from "@/src/stores/folder.store";
import { Typography } from "@/src/components/Typography";
import { ProjectList } from "../project-form/components/ProjectList";
import { ProjectEmptyState } from "../project-form/components/ProjectEmptyState";
import { Project } from "@/src/types/editor.types";
import { useRouter } from "expo-router";
import { ROUTES } from "@/src/enums/route.enum";

export function FolderDetail() {
  const router = useRouter();
  const { activeFolderId, setActiveFolderId, folders, openAddProjectModal } =
    useFolderStore();
  const { projects, loadProject } = useProjectStore();

  const folder = folders.find((f) => f.id === activeFolderId);

  if (!folder) return null;

  const folderProjects = projects.filter((p) =>
    folder.projectIds.includes(p.id),
  );

  const handleSelectProject = async (project: Project) => {
    await loadProject(project.id);
    router.push(ROUTES.EDITOR);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setActiveFolderId(null)}
        >
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Typography variant="title" style={styles.title}>
          {folder.name}
        </Typography>
        <TouchableOpacity
          style={styles.addButton}
          onPress={openAddProjectModal}
        >
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {folderProjects.length > 0 ? (
          <ProjectList
            data={folderProjects}
            onSelectProject={handleSelectProject}
          />
        ) : (
          <ProjectEmptyState
            title="Thư mục trống"
            subtitle="Thêm dự án vào thư mục này để dễ dàng quản lý."
            buttonText="Thêm dự án"
            onPress={openAddProjectModal}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  addButton: {
    padding: 8,
    marginRight: -8,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 8,
  },
  content: {
    flex: 1,
  },
});
