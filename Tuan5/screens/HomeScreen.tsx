import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Chào mừng bạn đến với ứng dụng</Text>
      <Text style={styles.hint}>Kéo từ cạnh trái để mở menu</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: "#fff",
  },
  text: { fontSize: 18, fontWeight: "600" },
  hint: { color: "#808080" },
});
