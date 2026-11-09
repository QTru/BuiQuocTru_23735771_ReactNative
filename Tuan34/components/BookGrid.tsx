import React from "react";
import { View, StyleSheet } from "react-native";
import { Book } from "../types/book";
import { discountLabel } from "../data/bookUtils";
import BookTile from "./BookTile";

interface BookGridProps {
  books: Book[];
  onPressBook: (book: Book) => void;
}

export default function BookGrid({ books, onPressBook }: BookGridProps) {
  return (
    <View style={styles.grid}>
      {books.map((book) => (
        <BookTile
          key={book.id}
          book={book}
          style={styles.item}
          badge={discountLabel(book)}
          onPress={() => onPressBook(book)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  item: { width: "48%", marginBottom: 16 }, // chừa 4% ở giữa 2 cột
});
