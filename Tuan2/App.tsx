import React from "react";
import { View, Text, StyleSheet } from "react-native";

import NewsFeed from "./components/NewsFeed";
import UserProfile from "./components/UserProfile";
import ProductSearch from "./components/ProductSearch";
import ApiErrorDemo from "./components/ApiErrorDemo";
import FilteredList from "./components/FilteredList";
import PaginatedProducts from "./components/PaginatedProducts";
import RefreshProducts from "./components/RefreshProducts";

export default function App() {
  return (
    <View style={styles.container}>
      {/* Bài 9 */}
      {/* <Text style={styles.title}>Bài 9: News Feed</Text>
      <NewsFeed /> */}

      {/* Bài 10 */}
      {/* <Text style={styles.title}>Bài 10: User Profile</Text>
      <UserProfile /> */}

      {/* Bài 11 */}
      {/* <Text style={styles.title}>Bài 11: Product Search</Text>
      <ProductSearch /> */}

      {/* Bài 12 */}
      {/* <Text style={styles.title}>Bài 12: API Error Handling</Text>
      <ApiErrorDemo /> */}

      {/* Bài 13 */}
      {/* <Text style={styles.title}>Bài 13: Filtered List (Generic)</Text>
      <FilteredList /> */}

      {/* Bài 14 */}
      {/* <Text style={styles.title}>Bài 14: Pagination</Text>
      <PaginatedProducts /> */}

      {/* Bài 15 */}
      <Text style={styles.title}>Bài 15: Pull to Refresh</Text>
      <RefreshProducts />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
});
