import { Tabs } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useProjectStore } from "@/src/stores/project.store";

function CenterTabButton(props: any) {
  const { openCreateModal } = useProjectStore();

  return (
    <Pressable onPress={openCreateModal} style={styles.centerButtonWrapper}>
      <View style={styles.centerButton}>
        <View style={styles.plusContainer}>
          <View style={styles.plusHorizontal} />
          <View style={styles.plusVertical} />
        </View>
      </View>
    </Pressable>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: styles.tabBar,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "#8E8E93",
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Trang chủ",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="template"
        options={{
          title: "Mẫu",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "grid" : "grid-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="create"
        options={{
          tabBarButton: (props) => <CenterTabButton {...props} />,
          tabBarIcon: ({ color }) => (
            <Ionicons name="add" size={30} color="#000" />
          ),
        }}
      />

      <Tabs.Screen
        name="project"
        options={{
          title: "Dự án",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "folder" : "folder-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="more"
        options={{
          title: "Thêm",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "settings" : "settings-outline"}
              size={24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 90,
    backgroundColor: "#000",
    borderTopWidth: 0,
    elevation: 0,
    paddingBottom: 14,
    paddingTop: 10,
  },

  tabBarLabel: {
    fontSize: 12,
    marginTop: 2,
    fontWeight: "500",
  },

  plusContainer: {
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
  },

  plusHorizontal: {
    position: "absolute",
    width: 24,
    height: 3,
    borderRadius: 2,
    backgroundColor: "#000",
  },

  plusVertical: {
    position: "absolute",
    width: 3,
    height: 24,
    borderRadius: 2,
    backgroundColor: "#000",
  },

  centerButtonWrapper: {
    top: -8,
    justifyContent: "center",
    alignItems: "center",
  },

  centerButton: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: "#F2F2F2",
    justifyContent: "center",
    alignItems: "center",
  },
});
