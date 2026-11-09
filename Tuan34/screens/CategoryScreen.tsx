import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Header from "../components/Header";
import CategoryChips from "../components/CategoryChips";
import BookCardRow from "../components/BookCardRow";
import { CATEGORIES } from "../data/categories";
import { ALL_CATEGORY, filterByGenre } from "../data/bookUtils";
import { useAppSelector } from "../store/hooks";
import { booksSelectors } from "../store/booksSlice";
import { colors } from "../theme";

export default function CategoryScreen() {
  const navigation = useNavigation();
  const books = useAppSelector(booksSelectors.selectAll);
  const [category, setCategory] = useState<string>(ALL_CATEGORY);
  const list = filterByGenre(books, category);

  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <CategoryChips
          categories={CATEGORIES}
          selected={category}
          onSelect={setCategory}
        />
        <Text style={styles.count}>{list.length} cuốn sách</Text>
        {list.map((book) => (
          <BookCardRow
            key={book.id}
            book={book}
            onPress={() =>
              navigation.navigate("BookDetail", { bookId: book.id })
            }
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { flex: 1 },
  content: { padding: 16, gap: 12 },
  count: { color: colors.gray },
});
