import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export default function LiveInput() {
  const [text, setText] = useState<string>("");

  // onChangeText trả về string -> dùng được text.length
  const handleChange = (value: string) => setText(value);

  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Gõ gì đó..."
        value={text}
        onChangeText={handleChange}
      />
      <Text>Số ký tự: {text.length}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 8,
    marginBottom: 6,
  },
});
