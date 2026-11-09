import React, { useMemo, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/types";
import BikeCard from "../components/BikeCard";
import { useFavorites } from "../context/FavoritesContext";
import { BIKES, FILTERS, Filter } from "../data/bikes";

type Props = NativeStackScreenProps<RootStackParamList, "BikeList">;

export default function BikeListScreen({ navigation }: Props) {
  const [filter, setFilter] = useState<Filter>("All");
  const { favorites, toggleFavorite } = useFavorites();

  const data = useMemo(
    () => (filter === "All" ? BIKES : BIKES.filter((b) => b.genre === filter)),
    [filter],
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>The world’s Best Bike</Text>

      <View style={styles.filters}>
        {FILTERS.map((f) => {
          const active = f === filter;
          return (
            <TouchableOpacity
              key={f}
              style={[styles.chip, active && styles.chipActive]}
              onPress={() => setFilter(f)}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>
                {f}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.column}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <BikeCard
            bike={item}
            isFavorite={favorites.includes(item.id)}
            onPress={(id) => navigation.navigate("BikeDetail", { id })}
            onToggleFavorite={toggleFavorite}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 16 },
  title: { fontSize: 24, fontWeight: "bold", color: "#EA4040", marginTop: 8 },
  filters: { flexDirection: "row", gap: 12, marginVertical: 16 },
  chip: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#F4B0B0",
  },
  chipActive: { borderColor: "#EA4040" },
  chipText: { color: "#B0B0B0" },
  chipTextActive: { color: "#EA4040" },
  column: { justifyContent: "space-between", gap: 12 },
});
