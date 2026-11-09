import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { Product } from "../types/Api";

const fetchProducts = async (): Promise<Product[]> => {
  const skip = Math.floor(Math.random() * 9) * 10;
  const response = await fetch(
    `https://dummyjson.com/products?limit=10&skip=${skip}&select=title,price,category`,
  );
  const json = await response.json();
  return (json as { products: Product[] }).products;
};

export default function RefreshProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    const loadInitial = async () => {
      try {
        setProducts(await fetchProducts());
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    loadInitial();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      setProducts(await fetchProducts());
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#007AFF" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.hint}>Kéo xuống để tải lại</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        refreshing={refreshing}
        onRefresh={onRefresh}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>
              ${item.price} - {item.category}
            </Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  hint: { marginBottom: 6, color: "#666" },
  item: { paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: "#eee" },
  title: { fontSize: 15, fontWeight: "600" },
});
