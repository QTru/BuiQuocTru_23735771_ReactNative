import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import ProductList from "../components/ProductList";
import { usePhones } from "../context/PhoneContext";

export default function SearchScreen() {
  const { phones } = usePhones();
  const [keyword, setKeyword] = useState("");

  const q = keyword.trim().toLowerCase();
  const results = q
    ? phones.filter((p) => p.title.toLowerCase().includes(q))
    : phones;

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nhập từ khóa..."
        value={keyword}
        onChangeText={setKeyword}
        autoCorrect={false}
        clearButtonMode="while-editing"
      />
      <ProductList phones={results} emptyText="Không tìm thấy sản phẩm" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  input: {
    margin: 12,
    marginBottom: 0,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#C4C4C4",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
});
