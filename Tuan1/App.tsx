import React from "react";
import { ScrollView, Text, StyleSheet } from "react-native";

import UserCard from "./components/UserCard";
import Counter from "./components/Counter";
import TodoList from "./components/TodoList";
import MyButton from "./components/MyButton";
import LiveInput from "./components/LiveInput";
import { LoadingDemo } from "./components/LoadingContainer";
import GenderSelector from "./components/GenderSelector";
import AppButtonDemo from "./components/AppButtonDemo";

export default function App() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Bài 1 */}
      {/* <Text style={styles.title}>Bài 1: UserCard</Text>
      <UserCard name="Nguyễn Văn A" age={20} isAdmin={true} />
      <UserCard name="Trần Thị B" age={22} isAdmin={false} /> */}

      {/* Bài 2 */}
      {/* <Text style={styles.title}>Bài 2: Counter</Text>
      <Counter /> */}

      {/* Bài 3 */}
      {/* <Text style={styles.title}>Bài 3: Todo List</Text>
      <TodoList /> */}

      {/* Bài 4 */}
      {/* <Text style={styles.title}>Bài 4: MyButton</Text>
      <MyButton label="Mặc định (xanh)" onPress={() => console.log("A")} />
      <MyButton label="Màu đỏ" color="red" onPress={() => console.log("B")} /> */}

      {/* Bài 5 */}
      {/* <Text style={styles.title}>Bài 5: Live Input</Text>
      <LiveInput /> */}

      {/* Bài 6 */}
      {/* <Text style={styles.title}>Bài 6: Loading Container</Text>
      <LoadingDemo /> */}

      {/* Bài 7 */}
      {/* <Text style={styles.title}>Bài 7: Gender Selector</Text>
      <GenderSelector /> */}

      {/* Bài 8 (đang bật) */}
      <Text style={styles.title}>Bài 8: AppButton</Text>
      <AppButtonDemo />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingTop: 60, gap: 12 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 8 },
});
