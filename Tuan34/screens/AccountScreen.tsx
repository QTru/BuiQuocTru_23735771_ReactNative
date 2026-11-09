import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../theme";

export default function AccountScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>👤</Text>
      <Text style={styles.text}>Màn hình Tài khoản</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
  icon: { fontSize: 48 },
  text: { color: colors.gray },
});
