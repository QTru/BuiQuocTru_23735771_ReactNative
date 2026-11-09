import React, { useState } from "react";
import { View, Text, TextInput, FlatList, StyleSheet } from "react-native";

export function filterByName<T extends { name: string }>(
  items: T[],
  keyword: string,
): T[] {
  const key = keyword.trim().toLowerCase();
  return items.filter((item) => item.name.toLowerCase().includes(key));
}

interface Person {
  id: number;
  name: string;
  age: number;
}

interface Fruit {
  id: number;
  name: string;
  price: number;
}

const people: Person[] = [
  { id: 1, name: "Nguyễn Văn An", age: 20 },
  { id: 2, name: "Trần Thị Bình", age: 22 },
  { id: 3, name: "Lê Văn Cường", age: 21 },
];

const fruits: Fruit[] = [
  { id: 1, name: "Cam", price: 30000 },
  { id: 2, name: "Xoài", price: 45000 },
  { id: 3, name: "Ổi", price: 20000 },
];

export default function FilteredList() {
  const [keyword, setKeyword] = useState<string>("");

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nhập từ khóa lọc theo tên"
        value={keyword}
        onChangeText={setKeyword}
      />

      <Text style={styles.heading}>Người (Person)</Text>
      <FlatList
        data={filterByName<Person>(people, keyword)}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={styles.item}>
            {item.name} - {item.age} tuổi
          </Text>
        )}
      />

      <Text style={styles.heading}>Trái cây (Fruit)</Text>
      <FlatList
        data={filterByName<Fruit>(fruits, keyword)}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Text style={styles.item}>
            {item.name} - {item.price}đ
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 8,
    marginBottom: 10,
  },
  heading: { fontWeight: "bold", marginTop: 8 },
  item: { paddingVertical: 4 },
});
