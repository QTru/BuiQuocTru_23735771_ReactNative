import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Product } from "../types";
import { formatCurrency } from "../utils/format";

interface ProductCardProps {
  product: Product;
  inCartQty: number;
  onAdd: (product: Product) => void;
}

function ProductCard({ product, inCartQty, onAdd }: ProductCardProps) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.name} numberOfLines={1}>
        {product.name}
      </Text>
      <Text style={styles.price}>{formatCurrency(product.price)}</Text>
      {inCartQty > 0 && <Text style={styles.inCart}>Trong giỏ: {inCartQty}</Text>}
      <TouchableOpacity style={styles.button} onPress={() => onAdd(product)}>
        <Text style={styles.buttonText}>Thêm vào giỏ</Text>
      </TouchableOpacity>
    </View>
  );
}

export default React.memo(ProductCard);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    maxWidth: "48%",
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    padding: 8,
    marginBottom: 12,
  },
  image: { width: "100%", aspectRatio: 1, borderRadius: 6, backgroundColor: "#eee" },
  name: { fontSize: 15, fontWeight: "600", marginTop: 6 },
  price: { color: "#1565c0", fontWeight: "bold", marginTop: 2 },
  inCart: { color: "#2e7d32", fontSize: 12, marginTop: 2 },
  button: {
    backgroundColor: "#1565c0",
    borderRadius: 6,
    paddingVertical: 8,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
