import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";

export type Variant = "primary" | "secondary" | "outline" | "danger";
export type Size = "small" | "medium" | "large";

export interface AppButtonProps {
  title: string;
  variant?: Variant;
  size?: Size;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
}

// Style tách riêng theo variant / size bằng object, không if-else lồng trong JSX
const variantStyles: Record<Variant, ViewStyle> = {
  primary: { backgroundColor: "#007AFF" },
  secondary: { backgroundColor: "#6C757D" },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 1.5,
    borderColor: "#007AFF",
  },
  danger: { backgroundColor: "#DC3545" },
};

const variantTextStyles: Record<Variant, TextStyle> = {
  primary: { color: "#fff" },
  secondary: { color: "#fff" },
  outline: { color: "#007AFF" },
  danger: { color: "#fff" },
};

const sizeStyles: Record<Size, ViewStyle> = {
  small: { paddingVertical: 6, paddingHorizontal: 12 },
  medium: { paddingVertical: 10, paddingHorizontal: 18 },
  large: { paddingVertical: 14, paddingHorizontal: 24 },
};

const sizeTextStyles: Record<Size, TextStyle> = {
  small: { fontSize: 12 },
  medium: { fontSize: 15 },
  large: { fontSize: 18 },
};

export default function AppButton({
  title,
  variant = "primary",
  size = "medium",
  onPress,
  disabled = false,
  loading = false,
  icon,
}: AppButtonProps) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        variantStyles[variant],
        sizeStyles[size],
        (disabled || loading) && styles.disabled,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={variantTextStyles[variant].color} />
      ) : (
        <View style={styles.row}>
          {icon}
          <Text
            style={[
              styles.text,
              variantTextStyles[variant],
              sizeTextStyles[size],
            ]}
          >
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: { borderRadius: 8, alignItems: "center", justifyContent: "center" },
  row: { flexDirection: "row", alignItems: "center" },
  text: { fontWeight: "bold" },
  disabled: { opacity: 0.5 },
});
