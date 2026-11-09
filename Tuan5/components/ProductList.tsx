import React from "react";
import {
  FlatList,
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { usePhones } from "../context/PhoneContext";
import { useOpenProduct } from "../hooks/useOpenProduct";
import { PHONE_IMAGES, Phone, formatVND } from "../data/phone";

interface ProductListProps {
  phones: Phone[];
  emptyText: string;
}

export default function ProductList({ phones, emptyText }: ProductListProps) {
  const { selectedColors, favoriteIds, toggleFavorite } = usePhones();
  const openProduct = useOpenProduct();

  return (
    <FlatList
      data={phones}
      keyExtractor={(item) => String(item.id)}
      contentContainerStyle={styles.list}
      keyboardShouldPersistTaps="handled"
      ListEmptyComponent={<Text style={styles.empty}>{emptyText}</Text>}
      renderItem={({ item }) => {
        const isFavorite = favoriteIds.includes(item.id);
        return (
          <Pressable style={styles.row} onPress={() => openProduct(item.id)}>
            <Image
              source={PHONE_IMAGES[selectedColors[item.id] ?? item.color]}
              style={styles.thumb}
              resizeMode="contain"
            />
            <View style={styles.info}>
              <Text numberOfLines={2} style={styles.title}>
                {item.title}
              </Text>
              <Text style={styles.rating}>
                ★ {item.rating} ({item.rating_amount})
              </Text>
              <Text style={styles.price}>{formatVND(item.price)}</Text>
            </View>
            <Pressable hitSlop={10} onPress={() => toggleFavorite(item.id)}>
              <Ionicons
                name={isFavorite ? "heart" : "heart-outline"}
                size={24}
                color="#EE0D0D"
              />
            </Pressable>
          </Pressable>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  list: { padding: 12, gap: 10, flexGrow: 1 },
  empty: { textAlign: "center", color: "#808080", marginTop: 32 },
  row: {
    flexDirection: "row",
    gap: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  thumb: { width: 64, height: 80 },
  info: { flex: 1, justifyContent: "space-between" },
  title: { fontSize: 14, fontWeight: "600" },
  rating: { fontSize: 12, color: "#555" },
  price: { fontSize: 15, fontWeight: "bold", color: "#EE0D0D" },
});
