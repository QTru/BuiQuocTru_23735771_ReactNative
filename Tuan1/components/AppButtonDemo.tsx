import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import AppButton from "./AppButton";

export default function AppButtonDemo() {
  const [loading, setLoading] = useState<boolean>(false);

  const handleAddToCart = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <View style={styles.container}>
      <AppButton
        title="Thêm vào giỏ hàng"
        variant="primary"
        icon={<Text style={styles.icon}>🛒</Text>}
        loading={loading}
        onPress={handleAddToCart}
      />
      <AppButton
        title="Xem chi tiết"
        variant="outline"
        size="small"
        onPress={() => console.log("Xem chi tiết")}
      />
      <AppButton
        title="Xóa sách"
        variant="danger"
        size="large"
        icon={<Text style={styles.icon}>🗑️</Text>}
        onPress={() => console.log("Xóa sách")}
      />
      <AppButton
        title="Bị vô hiệu hóa"
        variant="secondary"
        disabled
        onPress={() => {}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 12 },
  icon: { marginRight: 6 },
});
