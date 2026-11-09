import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { colors } from "../theme";

interface FloatingCartButtonProps {
  count: number;
  onPress?: () => void;
}

export default function FloatingCartButton({
  count,
  onPress,
}: FloatingCartButtonProps) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.icon}>🛒</Text>
      {count > 0 && (
        <View style={styles.count}>
          <Text style={styles.countText}>{count}</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 24,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.indigo,
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
  },
  icon: { fontSize: 24 },
  count: {
    position: "absolute",
    top: -4,
    right: -4,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    paddingHorizontal: 4,
    backgroundColor: colors.red,
    justifyContent: "center",
    alignItems: "center",
  },
  countText: { color: colors.white, fontSize: 11, fontWeight: "bold" },
});
