import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import CategoryChips from "../components/CategoryChips";
import BookGrid from "../components/BookGrid";
import FloatingCartButton from "../components/FloatingCartButton";
import { CATEGORIES } from "../data/categories";
import { ALL_CATEGORY, filterByGenre } from "../data/bookUtils";
import { useAppSelector } from "../store/hooks";
import { booksSelectors } from "../store/booksSlice";
import { selectCartCount } from "../store/cartSlice";
import { colors } from "../theme";

export default function HomeScreen() {
  const navigation = useNavigation();
  const books = useAppSelector(booksSelectors.selectAll);
  const cartCount = useAppSelector(selectCartCount);
  const [category, setCategory] = useState<string>(ALL_CATEGORY);
  const list = filterByGenre(books, category);

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <CategoryChips
          categories={CATEGORIES}
          selected={category}
          onSelect={setCategory}
        />
        {list.length === 0 ? (
          <Text style={styles.empty}>Chưa có sách thuộc thể loại này</Text>
        ) : (
          <BookGrid
            books={list}
            onPressBook={(book) =>
              navigation.navigate("BookDetail", { bookId: book.id })
            }
          />
        )}
      </ScrollView>
      <FloatingCartButton
        count={cartCount}
        onPress={() => navigation.navigate("MainTabs", { screen: "cart" })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { flex: 1 },
  content: { padding: 16, gap: 16, paddingBottom: 100 }, // chừa chỗ để nút nổi không che item cuối
  empty: { textAlign: "center", color: colors.gray, marginTop: 24 },
});
