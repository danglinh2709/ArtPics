import React from "react";
import { FlatList, View, StyleSheet } from "react-native";
import { IProjectFolder } from "@/src/types/folder.types";
import { FolderCard } from "./FolderCard";
import { Loading } from "../../../../components/Loading";

interface IFolderListProps {
  data: IProjectFolder[];
  onSelectFolder: (folder: IProjectFolder) => void;
}

function FolderListComponent({ data, onSelectFolder }: IFolderListProps) {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <FolderCard folder={item} onPress={onSelectFolder} />
        </View>
      )}
      numColumns={2}
      columnWrapperStyle={styles.row}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
    />
  );
}

export const FolderList = Object.assign(FolderListComponent, {
  Loading: Loading,
});

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
  },
  row: {
    justifyContent: "space-between",
  },
  itemContainer: {
    width: "48%", // Allow 2 columns of folders
  },
});
