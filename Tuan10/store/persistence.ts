import AsyncStorage from "@react-native-async-storage/async-storage";
import { store } from "./index";
import { hydrateCart, PersistedCart } from "./cartSlice";

const KEY = "cart";

export async function initPersistence(): Promise<void> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    if (raw) {
      const saved = JSON.parse(raw) as PersistedCart;
      if (Array.isArray(saved.items)) store.dispatch(hydrateCart(saved));
    }
  } catch {
  }

  let last = store.getState().cart;
  store.subscribe(() => {
    const current = store.getState().cart;
    if (current === last) return;
    last = current;
    const { items, discountCode, shippingCost } = current;
    AsyncStorage.setItem(KEY, JSON.stringify({ items, discountCode, shippingCost })).catch(() => {});
  });
}
