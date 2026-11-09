import React from "react";
import { Text, Pressable, View, StyleSheet } from "react-native";
import { colors } from "../theme";

interface CategoryChipsProps {
  categories: string[];
  selected: string;
  onSelect: (category: string) => void;
}

export default function CategoryChips({
  categories,
  selected,
  onSelect,
}: CategoryChipsProps) {
  return (
    <View style={styles.container}>
      {categories.map((name) => {
        const active = name === selected;
        return (
          <Pressable
            key={name}
            style={[styles.chip, active && styles.chipActive]}
            onPress={() => onSelect(name)}
          >
            <Text style={[styles.text, active && styles.textActive]}>
              {name}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.indigo,
  },
  chipActive: { backgroundColor: colors.indigo },
  text: { color: colors.indigo },
  textActive: { color: colors.white },
});
