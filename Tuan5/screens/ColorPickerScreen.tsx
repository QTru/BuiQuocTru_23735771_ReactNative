import React from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { ShopStackParamList } from "../types/navigation";
import { usePhones } from "../context/PhoneContext";
import {
  COLOR_OPTIONS,
  PHONE_IMAGES,
  colorLabel,
  formatVND,
} from "../data/phone";

type Props = NativeStackScreenProps<ShopStackParamList, "ColorPicker">;

export default function ColorPickerScreen({ route, navigation }: Props) {
  const { id } = route.params;
  const { getPhone, selectedColors, setSelectedColor } = usePhones();
  const phone = getPhone(id);
  if (!phone) return null;

  const selectedColor = selectedColors[id];
  const shownColor = selectedColor ?? phone.color;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <Image
          source={PHONE_IMAGES[shownColor]}
          style={styles.thumb}
          resizeMode="contain"
        />
        <View style={styles.info}>
          <Text style={styles.name}>{phone.title}</Text>
          <Text style={styles.name}>Hàng chính hãng</Text>
          {selectedColor && (
            <>
              <Text style={styles.line}>
                Màu:{" "}
                <Text style={styles.bold}>{colorLabel(selectedColor)}</Text>
              </Text>
              <Text style={styles.line}>
                Cung cấp bởi <Text style={styles.bold}>Tiki Tradding</Text>
              </Text>
              <Text style={styles.price}>{formatVND(phone.price)}</Text>
            </>
          )}
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.prompt}>Chọn một màu bên dưới:</Text>
        <View style={styles.swatches}>
          {COLOR_OPTIONS.map((c) => (
            <Pressable
              key={c.key}
              onPress={() => setSelectedColor(id, c.key)}
              style={[
                styles.swatch,
                { backgroundColor: c.swatch },
                selectedColor === c.key && styles.swatchActive,
              ]}
            />
          ))}
        </View>

        <Pressable style={styles.done} onPress={() => navigation.goBack()}>
          <Text style={styles.doneText}>XONG</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    gap: 16,
    padding: 8,
    backgroundColor: "#fff",
  },
  thumb: { width: 85, height: 100 },
  info: { flex: 1, gap: 2 },
  name: { fontSize: 14 },
  line: { fontSize: 14, marginTop: 2 },
  bold: { fontWeight: "bold" },
  price: { fontSize: 15, fontWeight: "bold", marginTop: 4, marginLeft: 8 },
  body: { flex: 1, backgroundColor: "#C4C4C4", padding: 12 },
  prompt: { fontSize: 16, marginBottom: 12 },
  swatches: { flex: 1, alignItems: "center", gap: 10 },
  swatch: { width: 84, height: 66, borderWidth: 3, borderColor: "transparent" },
  swatchActive: { borderColor: "#4B66C0" },
  done: {
    backgroundColor: "#4B66C0",
    paddingVertical: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#EE0D0D",
    alignItems: "center",
  },
  doneText: { color: "#fff", fontWeight: "bold", fontSize: 18 },
});
