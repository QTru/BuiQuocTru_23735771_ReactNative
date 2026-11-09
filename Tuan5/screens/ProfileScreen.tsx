import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { USER } from "../data/user";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{USER.name.charAt(0)}</Text>
      </View>
      <Text style={styles.name}>{USER.name}</Text>
      <Text style={styles.email}>{USER.email}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#fff",
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#4B66C0",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: { color: "#fff", fontSize: 40, fontWeight: "bold" },
  name: { fontSize: 20, fontWeight: "bold" },
  email: { color: "#808080" },
});
