import { ROUTES } from "@/src/enums/route.enum";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { EMPTY_STATE_MAP } from "@/src/configs/project-form.config";
import { Project } from "@/src/types/editor.types";
import { TProjectTabKey } from "@/src/types/project-form.type";

import { ProjectHeader } from "./components/ProjectHeader";
import { ProjectTabs } from "./components/ProjectTabs";
import { ProjectList } from "./components/ProjectList";
import { ProjectEmptyState } from "./components/ProjectEmptyState";
import { useProjectStore } from "@/src/stores/project.store";
import { useFolderStore } from "@/src/stores/folder.store";
import { styles } from "../styles/project-form.styles";
import { ProjectCreateModal } from "../ProjectCreateModal";
import { ProjectActionMenu } from "../ProjectActionMenu";

import { FolderList } from "../Folders/FolderList";
import { FolderDetail } from "../Folders/FolderDetail";
import { FolderCreateModal } from "../Folders/FolderCreateModal";
import { FolderAddProjectModal } from "../Folders/FolderAddProjectModal";

export function ProjectForm() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TProjectTabKey>("projects");

  const {
    openCreateModal,
    projects,
    fetchProjects,
    loadProject,
    isLoading: isProjectLoading,
  } = useProjectStore();

  const {
    folders,
    activeFolderId,
    setActiveFolderId,
    openCreateFolderModal,
    fetchFolders,
    isLoading: isFolderLoading,
  } = useFolderStore();

  useFocusEffect(
    useCallback(() => {
      fetchProjects();
      fetchFolders();
    }, [fetchProjects, fetchFolders]),
  );

  const emptyState = EMPTY_STATE_MAP[activeTab];

  const handleSelectProject = async (project: Project) => {
    await loadProject(project.id);
    router.push(ROUTES.EDITOR);
  };

  const renderContent = () => {
    const isCurrentTabLoading =
      activeTab === "projects" ? isProjectLoading : isFolderLoading;

    if (isCurrentTabLoading) {
      return <ProjectList.Loading />;
    }

    if (activeTab === "projects") {
      if (projects.length > 0) {
        return (
          <ProjectList data={projects} onSelectProject={handleSelectProject} />
        );
      }
      return (
        <ProjectEmptyState
          title={emptyState.title}
          subtitle={emptyState.subtitle}
          buttonText={emptyState.buttonText}
          onPress={() => openCreateModal()}
        />
      );
    }

    if (activeTab === "files") {
      if (folders.length > 0) {
        return (
          <FolderList
            data={folders}
            onSelectFolder={(folder) => setActiveFolderId(folder.id)}
          />
        );
      }
      return (
        <ProjectEmptyState
          title={emptyState.title}
          subtitle={emptyState.subtitle}
          buttonText={emptyState.buttonText}
          onPress={() => openCreateFolderModal()}
        />
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      {activeFolderId ? (
        <FolderDetail />
      ) : (
        <>
          <ProjectHeader onPressAdd={activeTab === "projects" ? openCreateModal : openCreateFolderModal} />
          <ProjectTabs activeTab={activeTab} onChangeTab={setActiveTab} />
          <View style={styles.content}>{renderContent()}</View>
        </>
      )}

      <ProjectCreateModal />
      <ProjectActionMenu />
      <FolderCreateModal />
      <FolderAddProjectModal />
    </SafeAreaView>
  );
}
