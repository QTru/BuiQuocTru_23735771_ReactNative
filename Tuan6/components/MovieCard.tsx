import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export interface Movie {
  id: string;
  title: string;
  genre: string;
  year: number;
  rating: number;
  poster: string;
  isShowing: boolean;
}

export interface MovieCardProps {
  movie: Movie;
  layout?: "row" | "tile";
  onSelect: (id: string) => void;
}

function MovieCard({ movie, layout = "row", onSelect }: MovieCardProps) {
  const isTile = layout === "tile";
  const ratingLabel = `⭐ ${movie.rating.toFixed(1)}`;
  const genreLabel = movie.genre.split("|").join(", ");
  const posterUri = movie.poster.replace(/^http:\/\//, "https://");

  return (
    <TouchableOpacity
      style={[styles.card, isTile && styles.cardTile]}
      onPress={() => onSelect(movie.id)}
      activeOpacity={0.8}
    >
      <View style={isTile ? styles.posterBoxTile : undefined}>
        <Image
          source={{ uri: posterUri }}
          style={[styles.poster, isTile && styles.posterTile]}
        />
        {isTile && (
          <Text style={[styles.rating, styles.ratingBadge]}>{ratingLabel}</Text>
        )}
      </View>

      <View style={[styles.info, isTile && styles.infoTile]}>
        <Text style={styles.title} numberOfLines={isTile ? 1 : 2}>
          {movie.title}
        </Text>
        {!isTile && <Text style={styles.meta}>{genreLabel}</Text>}
        {!isTile && <Text style={styles.meta}>{String(movie.year)}</Text>}
        {!isTile && <Text style={styles.rating}>{ratingLabel}</Text>}
        <Text style={styles.status}>{movie.isShowing ? "✅" : "❌"}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default React.memo(MovieCard);

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    padding: 8,
    marginBottom: 10,
  },
  poster: { width: 70, height: 100, borderRadius: 6 },
  info: { flex: 1, marginLeft: 10 },
  title: { fontSize: 15, fontWeight: "bold" },
  meta: { color: "#666", marginTop: 2 },
  rating: { marginTop: 2, fontWeight: "bold" },
  status: { marginTop: 4, fontSize: 16 },

  cardTile: {
    flexDirection: "column",
    flex: 1,
    maxWidth: "48%",
    padding: 0,
    overflow: "hidden",
  },
  posterBoxTile: { width: "100%" },
  posterTile: {
    width: "100%",
    height: undefined,
    aspectRatio: 2 / 3,
    borderRadius: 0,
  },
  ratingBadge: {
    position: "absolute",
    top: 6,
    left: 6,
    backgroundColor: "rgba(0,0,0,0.7)",
    color: "#fff",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: "hidden",
  },
  infoTile: { flex: 0, marginLeft: 0, padding: 8 },
});
