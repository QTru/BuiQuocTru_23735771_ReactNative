import React from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Alert,
  StyleSheet,
} from "react-native";
import CartItemRow from "../components/CartItemRow";
import { formatPrice } from "../data/bookUtils";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  changeQuantity,
  clearCart,
  selectCartItems,
  selectCartTotal,
} from "../store/cartSlice";
import { colors } from "../theme";

export default function CartScreen() {
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCartItems);
  const total = useAppSelector(selectCartTotal);

  const handleCheckout = () => {
    Alert.alert("Thanh toán", `Tổng tiền: ${formatPrice(total)}`, [
      { text: "Hủy", style: "cancel" },
      { text: "Xác nhận", onPress: () => dispatch(clearCart()) },
    ]);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Giỏ hàng</Text>
        {cart.length === 0 && (
          <Text style={styles.empty}>Giỏ hàng đang trống</Text>
        )}
        {cart.map((item) => (
          <CartItemRow
            key={item.book.id}
            item={item}
            onIncrease={() =>
              dispatch(changeQuantity({ bookId: item.book.id, delta: 1 }))
            }
            onDecrease={() =>
              dispatch(changeQuantity({ bookId: item.book.id, delta: -1 }))
            }
          />
        ))}
      </ScrollView>

      <View style={styles.summary}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Tổng tiền</Text>
          <Text style={styles.totalValue}>{formatPrice(total)}</Text>
        </View>
        <Pressable
          style={[styles.checkout, cart.length === 0 && styles.disabled]}
          disabled={cart.length === 0}
          onPress={handleCheckout}
        >
          <Text style={styles.checkoutText}>Thanh toán</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { flex: 1 },
  content: { padding: 16, gap: 14 },
  title: { fontSize: 20, fontWeight: "bold" },
  empty: { textAlign: "center", color: colors.gray, marginTop: 24 },
  summary: {
    padding: 16,
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: { fontSize: 15, color: colors.gray },
  totalValue: { fontSize: 20, fontWeight: "bold", color: colors.red },
  checkout: {
    backgroundColor: colors.indigo,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  disabled: { opacity: 0.4 },
  checkoutText: { color: colors.white, fontWeight: "bold" },
});
