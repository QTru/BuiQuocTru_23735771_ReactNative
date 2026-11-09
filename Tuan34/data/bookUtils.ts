import { Book } from '../types/book';

export const coverUrl = (book: Book): string =>
  book.image.replace('http://', 'https://').replace('400x300', '300x400');

export const finalPrice = (book: Book): number => book.price * (1 - book.discount / 100);

export const formatPrice = (value: number): string => `$${value.toFixed(2)}`;

export const discountLabel = (book: Book): string | undefined =>
  book.discount > 0 ? `-${book.discount}%` : undefined;

export const ALL_CATEGORY = 'Tất cả';

export const filterByGenre = (books: Book[], genre: string): Book[] =>
  genre === ALL_CATEGORY ? books : books.filter((book) => book.genre === genre);