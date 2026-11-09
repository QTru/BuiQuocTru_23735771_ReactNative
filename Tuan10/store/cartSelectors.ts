import { createSelector } from "@reduxjs/toolkit";
import { DISCOUNT_CODES } from "../data/constants";
import type { RootState } from "./index";

export const selectCartItems = (state: RootState) => state.cart.items;
const selectDiscountCode = (state: RootState) => state.cart.discountCode;
const selectTaxRate = (state: RootState) => state.cart.taxRate;
const selectShippingCost = (state: RootState) => state.cart.shippingCost;

export const selectItemCount = createSelector([selectCartItems], (items) =>
  items.reduce((count, i) => count + i.quantity, 0),
);

export const selectSubtotal = createSelector([selectCartItems], (items) =>
  items.reduce((total, i) => total + i.price * i.quantity, 0),
);

export const selectDiscount = createSelector(
  [selectSubtotal, selectDiscountCode],
  (subtotal, code) => subtotal * (DISCOUNT_CODES[code ?? ""] ?? 0),
);

export const selectTax = createSelector(
  [selectSubtotal, selectTaxRate],
  (subtotal, rate) => subtotal * rate,
);

export const selectShipping = createSelector(
  [selectCartItems, selectShippingCost],
  (items, cost) => (items.length > 0 ? cost : 0),
);

export const selectCartTotal = createSelector(
  [selectSubtotal, selectDiscount, selectTax, selectShipping],
  (subtotal, discount, tax, shipping) => subtotal - discount + tax + shipping,
);

export const selectCartSummary = createSelector(
  [selectSubtotal, selectDiscount, selectTax, selectShipping, selectCartTotal, selectItemCount],
  (subtotal, discount, tax, shipping, total, itemCount) => ({
    subtotal,
    discount,
    tax,
    shipping,
    total,
    itemCount,
  }),
);
