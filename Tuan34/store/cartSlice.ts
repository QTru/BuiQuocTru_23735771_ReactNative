import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book, CartItem } from "../types/book";
import { finalPrice } from "../data/bookUtils";
import type { RootState } from "./index";

interface CartState {
  items: CartItem[];
}

const initialState: CartState = { items: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Book>) {
      const found = state.items.find((i) => i.book.id === action.payload.id);
      if (found) found.quantity += 1;
      else state.items.push({ book: action.payload, quantity: 1 });
    },
    
    changeQuantity(
      state,
      action: PayloadAction<{ bookId: number; delta: number }>,
    ) {
      const { bookId, delta } = action.payload;
      const item = state.items.find((i) => i.book.id === bookId);
      if (!item) return;
      item.quantity += delta;
      if (item.quantity <= 0) {
        state.items = state.items.filter((i) => i.book.id !== bookId);
      }
    },
    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addToCart, changeQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartCount = (state: RootState) =>
  state.cart.items.reduce((sum, i) => sum + i.quantity, 0);
export const selectCartTotal = (state: RootState) =>
  state.cart.items.reduce((sum, i) => sum + finalPrice(i.book) * i.quantity, 0);
