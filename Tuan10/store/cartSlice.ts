import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, Product } from "../types";

export interface CartState {
  items: CartItem[];
  discountCode: string | null;
  taxRate: number;
  shippingCost: number;
}

export type PersistedCart = Pick<CartState, "items" | "discountCode" | "shippingCost">;

const initialState: CartState = {
  items: [],
  discountCode: null,
  taxRate: 0.1,
  shippingCost: 10,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<Product>) {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) existing.quantity += 1;
      else state.items.push({ ...action.payload, quantity: 1 });
    },
    increaseQuantity(state, action: PayloadAction<number>) {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.quantity += 1;
    },
    decreaseQuantity(state, action: PayloadAction<number>) {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
    },
    removeFromCart(state, action: PayloadAction<number>) {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    clearCart(state) {
      state.items = [];
    },
    applyDiscount(state, action: PayloadAction<string>) {
      state.discountCode = action.payload;
    },
    removeDiscount(state) {
      state.discountCode = null;
    },
    setShippingCost(state, action: PayloadAction<number>) {
      state.shippingCost = action.payload;
    },
    hydrateCart(state, action: PayloadAction<PersistedCart>) {
      state.items = action.payload.items;
      state.discountCode = action.payload.discountCode;
      state.shippingCost = action.payload.shippingCost;
    },
  },
});

export default cartSlice.reducer;
export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
  applyDiscount,
  removeDiscount,
  setShippingCost,
  hydrateCart,
} = cartSlice.actions;
