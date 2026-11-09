import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Counter() {
  // Ngầm định: TypeScript tự suy luận count là number từ giá trị khởi tạo 0
  const [count, setCount] = useState(0);
  // Tường minh: khai báo rõ kiểu number
  const [count2, setCount2] = useState<number>(0);

  return (
    <View>
      <Text style={styles.label}>useState(0) - ngầm định</Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => setCount(Math.max(0, count - 1))}
        >
          <Text style={styles.btnText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.value}>{count}</Text>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => setCount(count + 1)}
        >
          <Text style={styles.btnText}>+</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>useState&lt;number&gt;(0) - tường minh</Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => setCount2(Math.max(0, count2 - 1))}
        >
          <Text style={styles.btnText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.value}>{count2}</Text>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => setCount2(count2 + 1)}
        >
          <Text style={styles.btnText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: { fontSize: 14, marginVertical: 6 },
  row: { flexDirection: "row", alignItems: "center", gap: 10 },
  btn: {
    backgroundColor: "#007AFF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  btnText: { color: "#fff", fontWeight: "bold" },
  value: { fontSize: 20, minWidth: 30, textAlign: "center" },
});
