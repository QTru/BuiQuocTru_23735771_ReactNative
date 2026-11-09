import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  RefreshControl,
  SectionList,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import {
  SafeAreaProvider,
  SafeAreaView,
} from "react-native-safe-area-context";
import TourItem, { Tour } from "./components/TourItem";
import { formatDate, formatPrice, groupByCity } from "./utils/tour";

const API_URL = "https://69831ab79c3efeb892a46ab7.mockapi.io/api/test/tours";

const Separator = () => <View style={styles.separator} />;

function Home() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [compact, setCompact] = useState(false);

  const fetchTours = useCallback(async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`Lỗi HTTP ${res.status}`);
      setTours((await res.json()) as Tour[]);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Không tải được dữ liệu");
    }
  }, []);

  useEffect(() => {
    fetchTours().finally(() => setLoading(false));
  }, [fetchTours]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchTours();
    setRefreshing(false);
  };

  const handlePress = useCallback((tour: Tour) => {
    Alert.alert(
      tour.name,
      `Ngày khởi hành: ${formatDate(tour.departure)}\n` +
      `Số ngày: ${tour.days}\n` +
      `Giá: ${formatPrice(tour.price)}`,
    );
  }, []);

  const handleToggleFavorite = useCallback(
    async (id: string, next: boolean) => {
      setTours((prev) =>
        prev.map((t) => (t.id === id ? { ...t, isFavorite: next } : t)),
      );
      try {
        const res = await fetch(`${API_URL}/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isFavorite: next }),
        });
        if (!res.ok) throw new Error(`Lỗi HTTP ${res.status}`);
      } catch {
        setTours((prev) =>
          prev.map((t) => (t.id === id ? { ...t, isFavorite: !next } : t)),
        );
        Alert.alert("Lỗi", "Không cập nhật được yêu thích. Vui lòng thử lại.");
      }
    },
    [],
  );

  const sections = useMemo(() => {
    const keyword = search.trim().toLowerCase();
    const filtered = keyword
      ? tours.filter((t) => t.name.toLowerCase().includes(keyword))
      : tours;
    return groupByCity(filtered);
  }, [tours, search]);

  const favorites = useMemo(() => tours.filter((t) => t.isFavorite), [tours]);

  const listHeader = (
    <View style={styles.favSection}>
      <Text style={styles.favTitle}>Tour yêu thích ({favorites.length})</Text>
      {favorites.length === 0 ? (
        <Text style={styles.favEmpty}>Chưa có tour yêu thích</Text>
      ) : (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={favorites}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={Separator}
          contentContainerStyle={styles.favList}
          renderItem={({ item }) => (
            <TourItem
              tour={item}
              compact
              onPress={handlePress}
              onToggleFavorite={handleToggleFavorite}
            />
          )}
        />
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>Tour Việt</Text>
        <Text style={styles.student}>23735771 – Bùi Quốc Trụ</Text>
        <TextInput
          style={styles.input}
          placeholder="Tìm tour theo tên..."
          value={search}
          onChangeText={setSearch}
        />
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>Bố cục thu gọn</Text>
          <Switch value={compact} onValueChange={setCompact} />
        </View>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" />
        </View>
      ) : error && tours.length === 0 ? (
        <View style={styles.center}>
          <Text>Lỗi: {error}</Text>
        </View>
      ) : (
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          stickySectionHeadersEnabled
          extraData={compact}
          ListHeaderComponent={listHeader}
          ListEmptyComponent={
            <Text style={styles.empty}>Không tìm thấy tour phù hợp</Text>
          }
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          renderSectionHeader={({ section }) => (
            <Text style={styles.sectionHeader}>
              {section.title} · {section.data.length} tour
            </Text>
          )}
          renderItem={({ item }) => {
            const row = (
              <TourItem
                tour={item}
                compact={compact}
                onPress={handlePress}
                onToggleFavorite={handleToggleFavorite}
              />
            );
            return compact ? <View style={styles.compactWrap}>{row}</View> : row;
          }}
        />
      )}
    </SafeAreaView>
  );
}

// SafeAreaProvider bọc toàn bộ app
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
  student: { color: "#fff", marginTop: 2 },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 10,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  switchLabel: { color: "#fff" },
  compactWrap: { marginHorizontal: 16, marginVertical: 6 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  favSection: { paddingTop: 12 },
  favTitle: { fontSize: 16, fontWeight: "bold", marginHorizontal: 16 },
  favEmpty: { color: "#666", marginHorizontal: 16, marginTop: 8 },
  favList: { paddingHorizontal: 16, paddingVertical: 8 },
  separator: { width: 12 },
  sectionHeader: {
    backgroundColor: "#e3f2fd",
    paddingHorizontal: 16,
    paddingVertical: 6,
    fontWeight: "bold",
  },
  empty: { textAlign: "center", color: "#666", marginTop: 24 },
});