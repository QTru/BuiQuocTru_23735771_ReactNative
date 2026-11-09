import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import {
  SafeAreaProvider,
  SafeAreaView,
} from "react-native-safe-area-context";
import MovieCard, { Movie } from "./components/MovieCard";

const API_URL = "https://69831ab79c3efeb892a46ab7.mockapi.io/api/test/movies";

function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isTile, setIsTile] = useState(false); // Switch "Dạng lưới"

  const fetchMovies = useCallback(async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`Lỗi HTTP ${res.status}`);
      setMovies((await res.json()) as Movie[]);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Không tải được dữ liệu");
    }
  }, []);

  useEffect(() => {
    fetchMovies().finally(() => setLoading(false));
  }, [fetchMovies]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchMovies();
    setRefreshing(false);
  };

  const handleSelect = useCallback(
    (id: string) => {
      const movie = movies.find((m) => m.id === id);
      if (movie) Alert.alert(movie.title);
    },
    [movies],
  );

  const numColumns = isTile ? 2 : 1;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>Movie App</Text>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Dạng lưới</Text>
          <Switch value={isTile} onValueChange={setIsTile} />
        </View>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" />
        </View>
      ) : error && movies.length === 0 ? (
        <View style={styles.center}>
          <Text>Lỗi: {error}</Text>
        </View>
      ) : (
        <FlatList
          key={String(numColumns)}
          data={movies}
          keyExtractor={(item) => item.id}
          numColumns={numColumns}
          columnWrapperStyle={isTile ? styles.column : undefined}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          renderItem={({ item }) => (
            <MovieCard
              movie={item}
              layout={isTile ? "tile" : "row"}
              onSelect={handleSelect}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <Home />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#f5f5f5" },
  header: { padding: 16, backgroundColor: "#1565c0" },
  title: { fontSize: 24, fontWeight: "bold", color: "#fff" },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  switchLabel: { color: "#fff" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  list: { padding: 16 },
  column: { justifyContent: "space-between", gap: 12 },
});
