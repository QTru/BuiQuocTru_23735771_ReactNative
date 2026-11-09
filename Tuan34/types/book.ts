export interface Book {
  id: number;
  image: string;
  title: string;
  author: string;
  genre: string;
  description: string;
  price: number;
  discount: number;
}

export interface CartItem {
  book: Book;
  quantity: number;
}