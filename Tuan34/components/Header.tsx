import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../theme";

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.logo}>📚 BookStore</Text>
      <View style={styles.icons}>
        <Text style={styles.icon}>🔍</Text>
        <Text style={styles.icon}>🛒</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 56,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.navy,
  },
  logo: { color: colors.white, fontSize: 20, fontWeight: "bold" },
  icons: { flexDirection: "row", gap: 16 },
  icon: { fontSize: 20 },
});
