import React, { useCallback, useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import CartItemRow from "../components/CartItemRow";
import { DISCOUNT_CODES, SHIPPING_OPTIONS } from "../data/constants";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  applyDiscount,
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeDiscount,
  removeFromCart,
  setShippingCost,
} from "../store/cartSlice";
import { selectCartItems, selectCartSummary } from "../store/cartSelectors";
import { formatCurrency } from "../utils/format";

export default function CartScreen() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const summary = useAppSelector(selectCartSummary);
  const discountCode = useAppSelector((s) => s.cart.discountCode);
  const shippingCost = useAppSelector((s) => s.cart.shippingCost);

  const [codeInput, setCodeInput] = useState("");
  const [message, setMessage] = useState<{ text: string; ok: boolean } | null>(null);

  const handleIncrease = useCallback((id: number) => dispatch(increaseQuantity(id)), [dispatch]);
  const handleDecrease = useCallback((id: number) => dispatch(decreaseQuantity(id)), [dispatch]);
  const handleRemove = useCallback((id: number) => dispatch(removeFromCart(id)), [dispatch]);

  const handleApplyCode = () => {
    const code = codeInput.trim().toUpperCase();
    if (DISCOUNT_CODES[code]) {
      dispatch(applyDiscount(code));
      setMessage({ text: `Đã áp dụng ${code}`, ok: true });
      setCodeInput("");
    } else {
      setMessage({ text: "Mã giảm giá không hợp lệ", ok: false });
    }
  };

  const handleCheckout = () => {
    Alert.alert("Thanh toán", `Tổng thanh toán: ${formatCurrency(summary.total)}`, [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xác nhận",
        onPress: () => {
          dispatch(clearCart());
          dispatch(removeDiscount());
          Alert.alert("Thành công", "Cảm ơn bạn đã đặt hàng!");
        },
      },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.titleRow}>
        <Text style={styles.title}>Giỏ hàng ({summary.itemCount} sản phẩm)</Text>
        {items.length > 0 && (
          <TouchableOpacity onPress={() => dispatch(clearCart())}>
            <Text style={styles.clear}>Xóa tất cả</Text>
          </TouchableOpacity>
        )}
      </View>

      {items.length === 0 ? (
        <Text style={styles.empty}>Giỏ hàng trống. Hãy thêm sản phẩm ở tab Sản phẩm.</Text>
      ) : (
        items.map((item) => (
          <CartItemRow
            key={item.id}
            item={item}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            onRemove={handleRemove}
          />
        ))
      )}

      <Text style={styles.section}>Mã giảm giá</Text>
      {discountCode ? (
        <View style={styles.chip}>
          <Text style={styles.chipText}>
            {discountCode} (-{DISCOUNT_CODES[discountCode] * 100}%)
          </Text>
          <TouchableOpacity onPress={() => dispatch(removeDiscount())}>
            <Text style={styles.chipClose}>✕</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.codeRow}>
          <TextInput
            style={styles.input}
            placeholder="Nhập mã (SUMMER10, SPECIAL20)"
            value={codeInput}
            onChangeText={setCodeInput}
            autoCapitalize="characters"
            autoCorrect={false}
          />
          <TouchableOpacity style={styles.applyButton} onPress={handleApplyCode}>
            <Text style={styles.applyText}>Áp dụng</Text>
          </TouchableOpacity>
        </View>
      )}
      {message && (
        <Text style={[styles.message, { color: message.ok ? "#2e7d32" : "#d32f2f" }]}>
          {message.text}
        </Text>
      )}

      <Text style={styles.section}>Phí vận chuyển</Text>
      {SHIPPING_OPTIONS.map((opt) => {
        const selected = opt.cost === shippingCost;
        return (
          <TouchableOpacity
            key={opt.label}
            style={styles.radioRow}
            onPress={() => dispatch(setShippingCost(opt.cost))}
          >
            <View style={[styles.radio, selected && styles.radioOn]}>
              {selected && <View style={styles.radioDot} />}
            </View>
            <Text>
              {opt.label} ({formatCurrency(opt.cost)})
            </Text>
          </TouchableOpacity>
        );
      })}

      {/* Tóm tắt hóa đơn */}
      <View style={styles.summary}>
        <Text style={styles.summaryTitle}>Tóm tắt đơn hàng</Text>
        <SummaryRow label="Tổng cộng" value={formatCurrency(summary.subtotal)} />
        {summary.discount > 0 && (
          <SummaryRow label="Giảm giá" value={`-${formatCurrency(summary.discount)}`} green />
        )}
        <SummaryRow label="Thuế (10%)" value={formatCurrency(summary.tax)} />
        <SummaryRow label="Vận chuyển" value={formatCurrency(summary.shipping)} />
        <SummaryRow label="Thành tiền" value={formatCurrency(summary.total)} bold />
      </View>

      <TouchableOpacity
        style={[styles.checkout, items.length === 0 && styles.disabled]}
        disabled={items.length === 0}
        onPress={handleCheckout}
      >
        <Text style={styles.checkoutText}>Thanh toán</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function SummaryRow({
  label,
  value,
  bold,
  green,
}: {
  label: string;
  value: string;
  bold?: boolean;
  green?: boolean;
}) {
  return (
    <View style={styles.summaryRow}>
      <Text style={[bold && styles.bold]}>{label}</Text>
      <Text style={[bold && styles.bold, green && { color: "#2e7d32" }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16 },
  titleRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  title: { fontSize: 18, fontWeight: "bold" },
  clear: { color: "#d32f2f" },
  empty: { textAlign: "center", color: "#666", marginVertical: 24 },
  section: { fontSize: 16, fontWeight: "bold", marginTop: 16, marginBottom: 8 },
  codeRow: { flexDirection: "row", gap: 8 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#c4c4c4",
    borderRadius: 6,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  applyButton: { backgroundColor: "#1565c0", borderRadius: 6, paddingHorizontal: 14, justifyContent: "center" },
  applyText: { color: "#fff", fontWeight: "bold" },
  message: { marginTop: 6 },
  chip: {
    flexDirection: "row",
    alignSelf: "flex-start",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#e8f5e9",
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  chipText: { color: "#2e7d32", fontWeight: "bold" },
  chipClose: { color: "#2e7d32" },
  radioRow: { flexDirection: "row", alignItems: "center", gap: 10, paddingVertical: 6 },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#1565c0",
    alignItems: "center",
    justifyContent: "center",
  },
  radioOn: { borderColor: "#1565c0" },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: "#1565c0" },
  summary: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    padding: 12,
    marginTop: 20,
    gap: 6,
  },
  summaryTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 4 },
  summaryRow: { flexDirection: "row", justifyContent: "space-between" },
  bold: { fontWeight: "bold", fontSize: 16 },
  checkout: {
    backgroundColor: "#d32f2f",
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 16,
  },
  disabled: { opacity: 0.4 },
  checkoutText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
