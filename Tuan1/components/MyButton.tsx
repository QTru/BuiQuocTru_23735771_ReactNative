import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

export interface MyButtonProps {
  label: string;
  onPress: () => void;
  color?: string;
}

export default function MyButton({
  label,
  onPress,
  color = "#007AFF",
}: MyButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }]}
      onPress={onPress}
    >
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 8,
  },
  text: { color: "#fff", fontWeight: "bold" },
});
