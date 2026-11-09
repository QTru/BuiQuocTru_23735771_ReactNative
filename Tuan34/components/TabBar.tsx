import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { colors } from "../theme";

export type TabKey = "home" | "category" | "cart" | "account";

const TABS: { key: TabKey; icon: string; label: string }[] = [
  { key: "home", icon: "🏠", label: "Trang chủ" },
  { key: "category", icon: "📂", label: "Danh mục" },
  { key: "cart", icon: "🛒", label: "Giỏ hàng" },
  { key: "account", icon: "👤", label: "Tài khoản" },
];

interface TabBarProps {
  active: TabKey;
  cartCount: number;
  onChange: (tab: TabKey) => void;
}

export default function TabBar({ active, cartCount, onChange }: TabBarProps) {
  return (
    <View style={styles.bar}>
      {TABS.map((tab) => {
        const isActive = tab.key === active;
        return (
          <Pressable
            key={tab.key}
            style={styles.item}
            onPress={() => onChange(tab.key)}
          >
            <View>
              <Text style={[styles.icon, !isActive && styles.dim]}>
                {tab.icon}
              </Text>
              {tab.key === "cart" && cartCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{cartCount}</Text>
                </View>
              )}
            </View>
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.white,
  },
  item: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
  },
  icon: { fontSize: 22 },
  dim: { opacity: 0.4 },
  label: { fontSize: 11, color: colors.gray, marginTop: 2 },
  labelActive: { color: colors.indigo, fontWeight: "bold" },
  badge: {
    position: "absolute",
    top: -4,
    right: -10,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    paddingHorizontal: 3,
    backgroundColor: colors.red,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: { color: colors.white, fontSize: 10, fontWeight: "bold" },
});
