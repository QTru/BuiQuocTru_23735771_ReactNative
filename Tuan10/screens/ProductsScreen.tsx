import React, { useCallback, useEffect, useMemo } from "react";
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import ProductCard from "../components/ProductCard";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchProducts } from "../store/productsSlice";
import { addToCart } from "../store/cartSlice";
import { selectCartItems } from "../store/cartSelectors";
import { Product } from "../types";

export default function ProductsScreen() {
  const dispatch = useAppDispatch();
  const { items, status, error } = useAppSelector((s) => s.products);
  const cartItems = useAppSelector(selectCartItems);

  useEffect(() => {
    if (status === "idle") dispatch(fetchProducts());
  }, [status, dispatch]);

  const qtyById = useMemo(
    () => Object.fromEntries(cartItems.map((i) => [i.id, i.quantity])) as Record<number, number>,
    [cartItems],
  );

  const handleAdd = useCallback(
    (product: Product) => dispatch(addToCart(product)),
    [dispatch],
  );

  if (status === "idle" || status === "loading") {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.hint}>Đang tải sản phẩm...</Text>
      </View>
    );
  }

  if (status === "failed") {
    return (
      <View style={styles.center}>
        <Text>Lỗi: {error}</Text>
        <TouchableOpacity style={styles.retry} onPress={() => dispatch(fetchProducts())}>
          <Text style={styles.retryText}>Thử lại</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => String(item.id)}
      numColumns={2}
      columnWrapperStyle={styles.column}
      contentContainerStyle={styles.list}
      renderItem={({ item }) => (
        <ProductCard product={item} inCartQty={qtyById[item.id] ?? 0} onAdd={handleAdd} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center", gap: 8 },
  hint: { color: "#666" },
  retry: { backgroundColor: "#1565c0", borderRadius: 6, paddingHorizontal: 16, paddingVertical: 8 },
  retryText: { color: "#fff", fontWeight: "bold" },
  list: { padding: 12 },
  column: { justifyContent: "space-between", gap: 12 },
});
