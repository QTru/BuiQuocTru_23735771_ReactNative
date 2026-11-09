import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { API_URL, Phone, PhoneColor } from "../data/phone";

interface PhoneContextValue {
  phones: Phone[];
  getPhone: (id: number) => Phone | undefined;
  selectedColors: Record<number, PhoneColor>;
  setSelectedColor: (id: number, color: PhoneColor) => void;
  favoriteIds: number[];
  toggleFavorite: (id: number) => void;
}

const PhoneContext = createContext<PhoneContextValue | null>(null);

export function usePhones(): PhoneContextValue {
  const ctx = useContext(PhoneContext);
  if (!ctx) throw new Error("usePhones phải nằm trong PhoneProvider");
  return ctx;
}

export function PhoneProvider({ children }: PropsWithChildren) {
  const [phones, setPhones] = useState<Phone[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedColors, setSelectedColors] = useState<
    Record<number, PhoneColor>
  >({});
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`Lỗi HTTP ${res.status}`);
        setPhones((await res.json()) as Phone[]);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Không tải được dữ liệu");
      }
    };
    load();
  }, []);

  const getPhone = useCallback(
    (id: number) => phones?.find((p) => p.id === id),
    [phones],
  );

  const setSelectedColor = useCallback((id: number, color: PhoneColor) => {
    setSelectedColors((prev) => ({ ...prev, [id]: color }));
  }, []);

  const toggleFavorite = useCallback((id: number) => {
    setFavoriteIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }, []);

  if (error) {
    return (
      <View style={styles.center}>
        <Text>Lỗi: {error}</Text>
      </View>
    );
  }
  if (!phones) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#EE0D0D" />
      </View>
    );
  }

  return (
    <PhoneContext.Provider
      value={{
        phones,
        getPhone,
        selectedColors,
        setSelectedColor,
        favoriteIds,
        toggleFavorite,
      }}
    >
      {children}
    </PhoneContext.Provider>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
