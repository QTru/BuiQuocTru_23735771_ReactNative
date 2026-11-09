import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { Product } from "../types/Api";

const fetchProducts = async (
  keyword: string,
  limit: number,
): Promise<Product[]> => {
  const url = `https://dummyjson.com/products/search?q=${encodeURIComponent(keyword)}&limit=${limit}`;
  const response = await fetch(url);
  const json = await response.json();
  return (json as { products: Product[] }).products;
};

export default function ProductSearch() {
  const [keyword, setKeyword] = useState<string>("phone");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      setProducts(await fetchProducts(keyword, 10));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TextInput
          style={styles.input}
          placeholder="Nhập từ khóa (vd: phone)"
          value={keyword}
          onChangeText={setKeyword}
        />
        <TouchableOpacity style={styles.btn} onPress={handleSearch}>
          <Text style={styles.btnText}>Tìm</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={<Text>Chưa có kết quả</Text>}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.title}>{item.title}</Text>
              <Text>
                ${item.price} - {item.category}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  row: { flexDirection: "row", gap: 10, marginBottom: 10 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 8,
  },
  btn: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 16,
    justifyContent: "center",
    borderRadius: 6,
  },
  btnText: { color: "#fff", fontWeight: "bold" },
  item: { paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: "#eee" },
  title: { fontSize: 15, fontWeight: "600" },
});
