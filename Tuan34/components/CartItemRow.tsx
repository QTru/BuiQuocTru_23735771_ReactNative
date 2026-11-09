import React from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { CartItem } from "../types/book";
import { coverUrl, finalPrice, formatPrice } from "../data/bookUtils";
import { colors } from "../theme";

interface CartItemRowProps {
  item: CartItem;
  onIncrease: () => void;
  onDecrease: () => void;
}

export default function CartItemRow({
  item,
  onIncrease,
  onDecrease,
}: CartItemRowProps) {
  const { book, quantity } = item;
  return (
    <View style={styles.row}>
      <Image source={{ uri: coverUrl(book) }} style={styles.cover} />
      <Text numberOfLines={2} style={styles.title}>
        {book.title}
      </Text>
      <View style={styles.stepper}>
        <Pressable style={styles.stepButton} onPress={onDecrease}>
          <Text style={styles.stepText}>−</Text>
        </Pressable>
        <Text style={styles.qty}>{quantity}</Text>
        <Pressable style={styles.stepButton} onPress={onIncrease}>
          <Text style={styles.stepText}>+</Text>
        </Pressable>
      </View>
      <Text style={styles.price}>
        {formatPrice(finalPrice(book) * quantity)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 8 },
  cover: { width: 48, height: 64, borderRadius: 4 }, // ảnh cố định
  title: { flex: 1, fontSize: 14, color: colors.text }, // tên chiếm phần còn lại
  stepper: {
    width: 84,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  stepButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.indigo,
    alignItems: "center",
    justifyContent: "center",
  },
  stepText: { color: colors.indigo, fontWeight: "bold" },
  qty: { fontWeight: "bold" },
  price: {
    width: 64,
    textAlign: "right",
    fontWeight: "bold",
    color: colors.red,
  },
});
