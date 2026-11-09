import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/types";
import { useFavorites } from "../context/FavoritesContext";
import { BIKES, discountPercent, getBikeImage, salePrice } from "../data/bikes";

type Props = NativeStackScreenProps<RootStackParamList, "BikeDetail">;

export default function BikeDetailScreen({ route }: Props) {
  const bike = BIKES.find((b) => b.id === route.params.id);
  const { favorites, toggleFavorite } = useFavorites();
  if (!bike) return null;

  const isFavorite = favorites.includes(bike.id);

  return (
    <SafeAreaView style={styles.safe} edges={["bottom"]}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.imageBox}>
          <Image source={getBikeImage(bike.image)} style={styles.image} resizeMode="contain" />
        </View>

        <Text style={styles.name}>{bike.name}</Text>
        <View style={styles.priceRow}>
          <Text style={styles.sale}>
            {discountPercent(bike)}% OFF | {salePrice(bike)}$
          </Text>
          <Text style={styles.oldPrice}>{bike.price}$</Text>
        </View>

        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{bike.description}</Text>
      </ScrollView>

      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.heartButton}
          onPress={() => toggleFavorite(bike.id)}
        >
          <Text style={[styles.heartText, isFavorite && styles.heartActive]}>
            {isFavorite ? "♥" : "♡"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => Alert.alert("Đã thêm vào giỏ", bike.name)}
        >
          <Text style={styles.addText}>Add to cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  content: { padding: 12 },
  imageBox: {
    width: "100%",
    aspectRatio: 1,
    backgroundColor: "#FCEBEA",
    borderRadius: 10,
    padding: 8,
  },
  image: { width: "100%", height: "100%" },
  name: { fontSize: 28, marginTop: 10 },
  priceRow: { flexDirection: "row", alignItems: "center", gap: 24, marginTop: 4 },
  sale: { fontSize: 16, color: "#666" },
  oldPrice: { fontSize: 16, textDecorationLine: "line-through" },
  sectionTitle: { fontSize: 17, fontWeight: "bold", marginTop: 18 },
  description: { fontSize: 15, lineHeight: 24, color: "#777", marginTop: 8 },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  heartButton: { padding: 4 },
  heartText: { fontSize: 32, color: "#222" },
  heartActive: { color: "#EA4040" },
  addButton: {
    flex: 1,
    backgroundColor: "#EA4040",
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: "center",
  },
  addText: { color: "#fff", fontSize: 18 },
});
