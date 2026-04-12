import React, { useEffect, useState } from "react";
import { StyleProp, ViewStyle, StyleSheet, Keyboard } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BaseInput } from "./BaseInput";
import { useDebounce } from "../hooks/useDebounce";

interface SearchsProps {
  initialValue?: string;
  placeholder?: string;
  onSearch: (text: string) => void;
  debounceTime?: number;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<ViewStyle>;
}

export const Searchs = ({
  initialValue = "",
  placeholder = "Tìm kiếm...",
  onSearch,
  debounceTime = 500,
  containerStyle,
  inputStyle,
}: SearchsProps) => {
  const [searchText, setSearchText] = useState<string>(initialValue);
  const debouncedSearchText = useDebounce(searchText, debounceTime);

  useEffect(() => {
    if (initialValue !== searchText) {
      setSearchText(initialValue);
    }
  }, [initialValue]);

  useEffect(() => {
    onSearch(debouncedSearchText);
  }, [debouncedSearchText]);

  return (
    <BaseInput
      value={searchText}
      onChangeText={setSearchText}
      placeholder={placeholder}
      containerStyle={[containerStyle, { width: "92%" }]}
      inputContainerStyle={[styles.defaultInputWrapper, inputStyle]}
      style={{ paddingVertical: 0, fontSize: 15 }}
      prefix={<Ionicons name="search" size={16} color="#94a3b8" />}
      returnKeyType="search"
      autoCapitalize="none"
      clearButtonMode="while-editing"
      onSubmitEditing={() => Keyboard.dismiss()}
    />
  );
};

const styles = StyleSheet.create({
  defaultInputWrapper: {
    backgroundColor: "#1a1a1a",
    borderColor: "#2a2a2a",
    borderRadius: 14,
    height: 46,
  },
});
