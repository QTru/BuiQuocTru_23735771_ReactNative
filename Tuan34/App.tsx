import React, { useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import Screen from "./components/Screen";
import RootNavigator from "./navigation/RootNavigator";
import { store } from "./store";
import { useAppDispatch, useAppSelector } from "./store/hooks";
import { fetchBooks } from "./store/booksSlice";
import { colors } from "./theme";

function AppContent() {
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((s) => s.books);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  if (status === "idle" || status === "loading") {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.indigo} />
      </View>
    );
  }

  if (status === "failed") {
    return (
      <View style={styles.center}>
        <Text>Lỗi: {error}</Text>
      </View>
    );
  }

  return (
    <Screen>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </Screen>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <AppContent />
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
});
