import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export type Gender = "male" | "female" | "other";

const options: Gender[] = ["male", "female", "other"];

export default function GenderSelector() {
  const [gender, setGender] = useState<Gender>("male");

  return (
    <View>
      <View style={styles.row}>
        {options.map((g) => (
          <TouchableOpacity
            key={g}
            style={[styles.btn, gender === g && styles.btnActive]}
            onPress={() => setGender(g)}
          >
            <Text style={gender === g ? styles.textActive : undefined}>
              {g}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text>Đã chọn: {gender}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", gap: 10, marginBottom: 8 },
  btn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#007AFF",
    borderRadius: 6,
  },
  btnActive: { backgroundColor: "#007AFF" },
  textActive: { color: "#fff" },
});
