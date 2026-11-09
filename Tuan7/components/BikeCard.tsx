import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Bike, getBikeImage } from "../data/bikes";

interface BikeCardProps {
  bike: Bike;
  isFavorite: boolean;
  onPress: (id: string) => void;
  onToggleFavorite: (id: string) => void;
}

function BikeCard({ bike, isFavorite, onPress, onToggleFavorite }: BikeCardProps) {
  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={() => onPress(bike.id)}
    >
      <TouchableOpacity
        style={styles.heart}
        onPress={() => onToggleFavorite(bike.id)}
        hitSlop={8}
      >
        <Text style={[styles.heartText, isFavorite && styles.heartActive]}>
          {isFavorite ? "♥" : "♡"}
        </Text>
      </TouchableOpacity>

      <Image source={getBikeImage(bike.image)} style={styles.image} resizeMode="contain" />
      <Text style={styles.name}>{bike.name}</Text>
      <View style={styles.priceRow}>
        <Text style={styles.currency}>$ </Text>
        <Text style={styles.price}>{bike.price}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default React.memo(BikeCard);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    maxWidth: "48%",
    backgroundColor: "#FEF5EC",
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    alignItems: "center",
  },
  heart: { position: "absolute", top: 8, left: 10, zIndex: 1 },
  heartText: { fontSize: 20, color: "#9E9E9E" },
  heartActive: { color: "#EA4040" },
  image: { width: "100%", height: 110, marginTop: 8 },
  name: { marginTop: 6, fontSize: 15, color: "#555" },
  priceRow: { flexDirection: "row", marginTop: 2 },
  currency: { color: "#F5A623", fontSize: 15 },
  price: { color: "#444", fontSize: 15 },
});
