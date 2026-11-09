import React from "react";
import { View, Text, StyleSheet } from "react-native";

export interface UserCardProps {
  name: string;
  age: number;
  isAdmin: boolean;
}

export default function UserCard({ name, age, isAdmin }: UserCardProps) {
  return (
    <View style={[styles.card, isAdmin ? styles.cardAdmin : styles.cardUser]}>
      <Text style={styles.name}>{name}</Text>
      <Text>Tuổi: {age}</Text>
      <Text style={isAdmin ? styles.adminBadge : styles.userBadge}>
        {isAdmin ? "👑 Admin" : "👤 Thành viên"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 14, borderRadius: 8, marginBottom: 10, borderWidth: 1 },
  cardAdmin: { backgroundColor: "#FFF3CD", borderColor: "#FFC107" },
  cardUser: { backgroundColor: "#E7F1FF", borderColor: "#007AFF" },
  name: { fontSize: 18, fontWeight: "bold" },
  adminBadge: { color: "#B8860B", fontWeight: "bold", marginTop: 4 },
  userBadge: { color: "#007AFF", marginTop: 4 },
});
