import React, { useLayoutEffect } from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { ShopStackParamList } from "../types/navigation";
import { usePhones } from "../context/PhoneContext";
import { PHONE_IMAGES, formatVND } from "../data/phone";

type Props = NativeStackScreenProps<ShopStackParamList, "ProductDetail">;

function Stars({ rating }: { rating: number }) {
  const filled = Math.round(rating);
  return (
    <Text style={styles.stars}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Text key={i} style={{ color: i <= filled ? "#E5E100" : "#D0D0D0" }}>
          ★
        </Text>
      ))}
    </Text>
  );
}

export default function ProductDetailScreen({ route, navigation }: Props) {
  const { id } = route.params;
  const { getPhone, selectedColors, favoriteIds, toggleFavorite } = usePhones();
  const phone = getPhone(id);
  const isFavorite = favoriteIds.includes(id);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable hitSlop={10} onPress={() => toggleFavorite(id)}>
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={24}
            color="#EE0D0D"
          />
        </Pressable>
      ),
    });
  }, [navigation, id, isFavorite, toggleFavorite]);

  if (!phone) return null;

  const selectedColor = selectedColors[id];
  const shownColor = selectedColor ?? phone.color;

  return (
    <SafeAreaView style={styles.safe} edges={["bottom"]}>
      <View style={styles.container}>
        <Image
          source={PHONE_IMAGES[shownColor]}
          style={styles.image}
          resizeMode="contain"
        />

        <Text style={styles.title}>{phone.title}</Text>

        <View style={styles.ratingRow}>
          <Stars rating={phone.rating} />
          <Text style={styles.ratingCount}>
            (Xem {phone.rating_amount} đánh giá)
          </Text>
        </View>

        <View style={styles.priceRow}>
          <Text style={styles.price}>{formatVND(phone.price)}</Text>
          <Text style={styles.oldPrice}>{formatVND(phone.price)}</Text>
        </View>

        <View style={styles.cheapRow}>
          <Text style={styles.cheapText}>Ở ĐÂU RẺ HƠN HOÀN TIỀN</Text>
          <View style={styles.help}>
            <Text style={styles.helpText}>?</Text>
          </View>
        </View>

        <Pressable
          style={styles.optionButton}
          onPress={() => navigation.navigate("ColorPicker", { id })}
        >
          <Text style={styles.optionText}>
            {selectedColor ? "4 MÀU-CHỌN LOẠI" : "4 MÀU-CHỌN MÀU"}
          </Text>
          <Text style={styles.chevron}>›</Text>
        </Pressable>

        <View style={styles.spacer} />

        <Pressable style={styles.buyButton}>
          <Text style={styles.buyText}>CHỌN MUA</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, padding: 16, gap: 8 },
  image: { width: "100%", flex: 1, minHeight: 220 },
  title: { fontSize: 14, color: "#000", marginTop: 8 },
  ratingRow: { flexDirection: "row", alignItems: "center", gap: 16 },
  stars: { fontSize: 22 },
  ratingCount: { fontSize: 13, color: "#333" },
  priceRow: { flexDirection: "row", alignItems: "center", gap: 20 },
  price: { fontSize: 16, fontWeight: "bold" },
  oldPrice: {
    fontSize: 14,
    color: "#808080",
    textDecorationLine: "line-through",
  },
  cheapRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  cheapText: { fontSize: 11, fontWeight: "bold", color: "#EE0D0D" },
  help: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#555",
    alignItems: "center",
    justifyContent: "center",
  },
  helpText: { fontSize: 10, color: "#555" },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#808080",
    borderRadius: 8,
    marginTop: 8,
  },
  optionText: { flex: 1, textAlign: "center", fontSize: 14 },
  chevron: { fontSize: 22, color: "#000" },
  spacer: { height: 24 },
  buyButton: {
    backgroundColor: "#EE0D0D",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buyText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
