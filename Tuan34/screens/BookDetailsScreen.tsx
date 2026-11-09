import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  Pressable,
  Alert,
  StyleSheet,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/types";
import { coverUrl, finalPrice, formatPrice } from "../data/bookUtils";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { booksSelectors } from "../store/booksSlice";
import { addToCart } from "../store/cartSlice";
import { colors } from "../theme";

type Props = NativeStackScreenProps<RootStackParamList, "BookDetail">;

export default function BookDetailScreen({ route, navigation }: Props) {
  const dispatch = useAppDispatch();
  const book = useAppSelector((s) =>
    booksSelectors.selectById(s, route.params.bookId),
  );
  if (!book) return null;

  const handleAdd = () => {
    dispatch(addToCart(book));
    Alert.alert("Đã thêm vào giỏ", book.title);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <Pressable onPress={navigation.goBack}>
          <Text style={styles.back}>← Quay lại</Text>
        </Pressable>
        <Image source={{ uri: coverUrl(book) }} style={styles.cover} />
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.meta}>
          {book.author} • {book.genre}
        </Text>
        <Text style={styles.description}>{book.description}</Text>
      </ScrollView>

      <View style={styles.bottomBar}>
        <View>
          <View style={styles.priceRow}>
            <Text style={styles.price}>{formatPrice(finalPrice(book))}</Text>
            {book.discount > 0 && (
              <Text style={styles.oldPrice}>{formatPrice(book.price)}</Text>
            )}
          </View>
          {book.discount > 0 && (
            <Text style={styles.discount}>Giảm {book.discount}%</Text>
          )}
        </View>
        <Pressable style={styles.addButton} onPress={handleAdd}>
          <Text style={styles.addText}>Thêm vào giỏ</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { flex: 1 },
  content: { padding: 16, gap: 8 },
  back: { color: colors.indigo, fontWeight: "bold" },
  cover: {
    alignSelf: "center",
    width: "60%",
    aspectRatio: 3 / 4,
    borderRadius: 8,
    marginVertical: 8,
  },
  title: { fontSize: 20, fontWeight: "bold", color: colors.text },
  meta: { fontSize: 13, color: colors.gray },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: colors.text,
    marginTop: 8,
  },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  priceRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  price: { fontSize: 20, fontWeight: "bold", color: colors.red },
  oldPrice: {
    fontSize: 13,
    color: colors.gray,
    textDecorationLine: "line-through",
  },
  discount: { fontSize: 12, color: colors.orange },
  addButton: {
    backgroundColor: colors.indigo,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  addText: { color: colors.white, fontWeight: "bold" },
});
