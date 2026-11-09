import React from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { CustomError } from "../types/Api";

const callWrongApi = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todoss/1");
  if (!response.ok) {
    throw {
      message: `Không tìm thấy dữ liệu (HTTP ${response.status})`,
      code: response.status,
    };
  }
  return response.json();
};

export default function ApiErrorDemo() {
  const handlePress = async () => {
    try {
      await callWrongApi();
    } catch (error) {
      const err = error as CustomError;
      Alert.alert(
        "Đã xảy ra lỗi",
        `${err.message}${err.code ? `\nMã lỗi: ${err.code}` : ""}`,
      );
    }
  };

  return (
    <View>
      <Text style={styles.note}>
        Bấm nút để gọi một URL sai và xem Alert báo lỗi.
      </Text>
      <TouchableOpacity style={styles.btn} onPress={handlePress}>
        <Text style={styles.btnText}>Gọi API lỗi</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  note: { marginBottom: 10 },
  btn: {
    backgroundColor: "#DC3545",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontWeight: "bold" },
});
