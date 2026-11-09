import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { formatDate, formatPrice, getSeatLabel } from "../utils/tour";

export interface Tour {
  id: string;
  name: string;
  city: string;
  days: number;
  price: number;
  seats: number;
  departure: string;
  image: string;
  isFavorite: boolean;
}

export interface TourItemProps {
  tour: Tour;
  compact?: boolean;
  onPress: (tour: Tour) => void;
  onToggleFavorite: (id: string, next: boolean) => void;
}

function TourItem({
  tour,
  compact = false,
  onPress,
  onToggleFavorite,
}: TourItemProps) {
  const lowSeats = tour.seats <= 3;

  const heart = (
    <TouchableOpacity
      testID="fav-btn"
      style={[styles.heart, compact && styles.heartCompact]}
      onPress={() => onToggleFavorite(tour.id, !tour.isFavorite)}
    >
      <Text style={styles.heartText}>{tour.isFavorite ? "♥" : "♡"}</Text>
    </TouchableOpacity>
  );

  return (
    <TouchableOpacity
      style={[styles.card, compact && styles.cardCompact]}
      onPress={() => onPress(tour)}
      activeOpacity={0.8}
    >
      <View style={compact ? styles.imageBoxCompact : styles.imageBox}>
        <Image
          source={{ uri: tour.image }}
          style={compact ? styles.imageCompact : styles.image}
        />
        {compact && heart}
      </View>

      <View style={[styles.info, compact && styles.infoCompact]}>
        <Text style={styles.name} numberOfLines={compact ? 1 : 2}>
          {tour.name}
        </Text>
        {!compact && <Text style={styles.city}>{tour.city}</Text>}
        {!compact && (
          <Text style={styles.date}>
            {`📅 ${formatDate(tour.departure)} · ${tour.days} ngày`}
          </Text>
        )}
        <Text style={styles.price}>{formatPrice(tour.price)}</Text>
        {!compact && (
          <Text style={[styles.seats, lowSeats && styles.seatsLow]}>
            {getSeatLabel(tour.seats)}
          </Text>
        )}
      </View>

      {!compact && heart}
    </TouchableOpacity>
  );
}

export default React.memo(TourItem);

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    padding: 8,
    marginHorizontal: 16,
    marginVertical: 6,
  },
  imageBox: { width: 90, height: 90 },
  image: { width: 90, height: 90, borderRadius: 8 },
  info: { flex: 1, marginHorizontal: 10 },
  name: { fontSize: 15, fontWeight: "bold" },
  city: { color: "#666", marginTop: 2 },
  date: { color: "#444", marginTop: 2 },
  price: { fontWeight: "bold", color: "#1565c0", marginTop: 2 },
  seats: { marginTop: 2, color: "#2e7d32" },
  seatsLow: { color: "red" },
  heart: { alignSelf: "flex-start", padding: 4 },
  heartText: { fontSize: 22, color: "#e53935" },

  cardCompact: {
    flexDirection: "column",
    width: 160,
    padding: 0,
    marginHorizontal: 0,
    marginVertical: 0,
    overflow: "hidden",
  },
  imageBoxCompact: { width: "100%" },
  imageCompact: { width: "100%", aspectRatio: 4 / 3 },
  infoCompact: { flex: 0, margin: 8 },
  heartCompact: {
    position: "absolute",
    top: 6,
    right: 6,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 16,
    alignSelf: "auto",
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
});
