import React from "react";
import { View, Text, Switch, StyleSheet } from "react-native";
import { useSettings } from "../context/SettingsContext";

export default function SettingsScreen() {
  const { darkMode, notifications, setDarkMode, setNotifications } =
    useSettings();

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.label}>Chế độ tối</Text>
        <Switch value={darkMode} onValueChange={setDarkMode} />
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Nhận thông báo</Text>
        <Switch value={notifications} onValueChange={setNotifications} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  label: { fontSize: 16 },
});
