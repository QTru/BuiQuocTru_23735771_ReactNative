import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export interface Todo {
  id: string;
  title: string;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([
    { id: "1", title: "Học TypeScript" },
    { id: "2", title: "Làm bài tập React Native" },
  ]);
  const [text, setText] = useState<string>("");

  const addTodo = () => {
    if (text.trim() === "") return;
    const newTodo: Todo = { id: Date.now().toString(), title: text };
    setTodos([...todos, newTodo]);
    setText("");
  };

  return (
    <View>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Nhập việc cần làm"
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity style={styles.btn} onPress={addTodo}>
          <Text style={styles.btnText}>Thêm</Text>
        </TouchableOpacity>
      </View>
      {todos.map((item) => (
        <Text key={item.id} style={styles.item}>
          • {item.title}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 8 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 8,
  },
  btn: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  btnText: { color: "#fff", fontWeight: "bold" },
  item: { fontSize: 16, paddingVertical: 4 },
});
