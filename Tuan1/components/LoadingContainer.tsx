import React, { useState, PropsWithChildren } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";

type LoadingContainerProps = PropsWithChildren<{
  isLoading: boolean;
}>;

export default function LoadingContainer({
  isLoading,
  children,
}: LoadingContainerProps) {
  if (isLoading) {
    return <ActivityIndicator size="large" color="#007AFF" />;
  }
  return <View>{children}</View>;
}

export function LoadingDemo() {
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <View>
      <TouchableOpacity style={styles.btn} onPress={() => setLoading(!loading)}>
        <Text style={styles.btnText}>{loading ? "Dừng tải" : "Tải lại"}</Text>
      </TouchableOpacity>
      <LoadingContainer isLoading={loading}>
        <Text style={styles.content}>Nội dung đã tải xong!</Text>
      </LoadingContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#007AFF",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  btnText: { color: "#fff", fontWeight: "bold" },
  content: { fontSize: 16 },
});
