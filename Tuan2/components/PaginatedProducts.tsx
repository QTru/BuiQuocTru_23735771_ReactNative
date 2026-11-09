import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { ApiResponse, Product } from "../types/Api";

const LIMIT = 10;

const fetchProductsPage = async (
  page: number,
): Promise<ApiResponse<Product>> => {
  const skip = (page - 1) * LIMIT;
  const response = await fetch(
    `https://dummyjson.com/products?limit=${LIMIT}&skip=${skip}&select=title,price,category`,
  );
  const json = (await response.json()) as {
    products: Product[];
    total: number;
  };
  return { data: json.products, total: json.total, page };
};

export default function PaginatedProducts() {
  const [result, setResult] = useState<ApiResponse<Product> | null>(null);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        setResult(await fetchProductsPage(page));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [page]);

  const totalPages = result ? Math.ceil(result.total / LIMIT) : 1;

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <FlatList
          data={result?.data ?? []}
          keyExtractor={(item) => item.id.toString()}
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

      <View style={styles.pager}>
        <TouchableOpacity
          style={[styles.btn, page <= 1 && styles.disabled]}
          disabled={page <= 1}
          onPress={() => setPage(page - 1)}
        >
          <Text style={styles.btnText}>Trước</Text>
        </TouchableOpacity>
        <Text>
          Trang {result?.page ?? page} / {totalPages}
        </Text>
        <TouchableOpacity
          style={[styles.btn, page >= totalPages && styles.disabled]}
          disabled={page >= totalPages}
          onPress={() => setPage(page + 1)}
        >
          <Text style={styles.btnText}>Sau</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  item: { paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: "#eee" },
  title: { fontSize: 15, fontWeight: "600" },
  pager: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  btn: {
    backgroundColor: "#007AFF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  btnText: { color: "#fff", fontWeight: "bold" },
  disabled: { opacity: 0.4 },
});
