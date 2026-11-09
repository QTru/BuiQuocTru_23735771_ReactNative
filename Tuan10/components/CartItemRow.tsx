import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { CartItem } from "../types";
import { formatCurrency } from "../utils/format";

interface CartItemRowProps {
  item: CartItem;
  onIncrease: (id: number) => void;
  onDecrease: (id: number) => void;
  onRemove: (id: number) => void;
}

function CartItemRow({ item, onIncrease, onDecrease, onRemove }: CartItemRowProps) {
  return (
    <View style={styles.row}>
      <View style={styles.top}>
        <Text style={styles.name}>{item.name}</Text>
        <TouchableOpacity onPress={() => onRemove(item.id)}>
          <Text style={styles.remove}>Xóa</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottom}>
        <Text style={styles.unit}>{formatCurrency(item.price)}</Text>

        <View style={styles.stepper}>
          <TouchableOpacity style={styles.stepButton} onPress={() => onDecrease(item.id)}>
            <Text style={styles.stepText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.qty}>{item.quantity}</Text>
          <TouchableOpacity style={styles.stepButton} onPress={() => onIncrease(item.id)}>
            <Text style={styles.stepText}>+</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.lineTotal}>{formatCurrency(item.price * item.quantity)}</Text>
      </View>
    </View>
  );
}

export default React.memo(CartItemRow);

const styles = StyleSheet.create({
  row: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    padding: 10,
    marginBottom: 8,
  },
  top: { flexDirection: "row", justifyContent: "space-between" },
  name: { fontSize: 15, fontWeight: "600" },
  remove: { color: "#d32f2f" },
  bottom: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 8 },
  unit: { width: 80, color: "#666" },
  stepper: { flexDirection: "row", alignItems: "center", gap: 12 },
  stepButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#1565c0",
    alignItems: "center",
    justifyContent: "center",
  },
  stepText: { color: "#1565c0", fontWeight: "bold" },
  qty: { fontWeight: "bold", minWidth: 20, textAlign: "center" },
  lineTotal: { width: 90, textAlign: "right", fontWeight: "bold" },
});
