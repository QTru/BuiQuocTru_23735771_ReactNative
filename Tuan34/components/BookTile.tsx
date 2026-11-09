import React from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { Book } from "../types/book";
import { coverUrl, finalPrice, formatPrice } from "../data/bookUtils";
import { colors } from "../theme";

interface BookTileProps {
  book: Book;
  badge?: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export default function BookTile({
  book,
  badge,
  style,
  onPress,
}: BookTileProps) {
  return (
    <Pressable style={style} onPress={onPress}>
      <View style={styles.coverBox}>
        <Image source={{ uri: coverUrl(book) }} style={styles.cover} />
        {badge && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{badge}</Text>
          </View>
        )}
      </View>
      <Text numberOfLines={2} style={styles.title}>
        {book.title}
      </Text>
      <Text style={styles.price}>{formatPrice(finalPrice(book))}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  coverBox: { position: "relative" },
  cover: { width: "100%", aspectRatio: 3 / 4, borderRadius: 8 },
  badge: {
    position: "absolute",
    top: 6,
    left: 6,
    backgroundColor: colors.red,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: { color: colors.white, fontSize: 12, fontWeight: "bold" },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
    marginTop: 6,
    minHeight: 36,
  },
  price: { fontSize: 14, fontWeight: "bold", color: colors.red },
});
