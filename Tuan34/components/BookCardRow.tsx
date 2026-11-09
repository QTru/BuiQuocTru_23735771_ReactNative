import React from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { Book } from "../types/book";
import { coverUrl, finalPrice, formatPrice } from "../data/bookUtils";
import { colors } from "../theme";

interface BookCardRowProps {
  book: Book;
  onPress?: () => void;
}

export default function BookCardRow({ book, onPress }: BookCardRowProps) {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image source={{ uri: coverUrl(book) }} style={styles.cover} />
      <View style={styles.info}>
        <View>
          <Text numberOfLines={2} style={styles.title}>
            {book.title}
          </Text>
          <Text style={styles.author}>{book.author}</Text>
        </View>
        <View style={styles.priceRow}>
          <Text style={styles.price}>{formatPrice(finalPrice(book))}</Text>
          {book.discount > 0 && (
            <Text style={styles.oldPrice}>{formatPrice(book.price)}</Text>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.white,
  },
  cover: { width: 80, height: 110, borderRadius: 6 },
  info: { flex: 1, minHeight: 110, justifyContent: "space-between" },
  title: { fontSize: 15, fontWeight: "600", color: colors.text },
  author: { fontSize: 13, color: colors.gray, marginTop: 2 },
  priceRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  price: { fontSize: 16, fontWeight: "bold", color: colors.red },
  oldPrice: {
    fontSize: 12,
    color: colors.gray,
    textDecorationLine: "line-through",
  },
});
