import React from "react";
import { TouchableOpacity, View } from "react-native";

import { TABS } from "@/src/configs/project-form.config";
import { TProjectTabKey, TTabItem } from "@/src/types/project-form.type";

import { Typography } from "../../../../components/Typography";
import { styles } from "../../styles/project-form.styles";

interface IProjectTabsProps {
  activeTab: TProjectTabKey;
  onChangeTab: (tab: TProjectTabKey) => void;
}

export function ProjectTabs({ activeTab, onChangeTab }: IProjectTabsProps) {
  const renderTabItem = (tab: TTabItem) => {
    const isActive = activeTab === tab.key;

    return (
      <TouchableOpacity
        key={tab.key}
        onPress={() => onChangeTab(tab.key)}
        style={styles.tab}
        activeOpacity={0.8}
      >
        <Typography
          variant="caption"
          style={[styles.tabText, isActive && styles.activeTabText]}
        >
          {tab.label}
        </Typography>

        {isActive ? <View style={styles.activeIndicator} /> : null}
      </TouchableOpacity>
    );
  };

  return <View style={styles.tabContainer}>{TABS.map(renderTabItem)}</View>;
}
