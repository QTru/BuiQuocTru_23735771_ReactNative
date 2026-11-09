import { ImageSourcePropType } from "react-native";

export type PhoneColor = "white" | "red" | "black" | "blue";

export interface Phone {
  id: number;
  title: string;
  rating: number;
  rating_amount: number;
  price: number;
  color: PhoneColor;
}

export const API_URL = "https://my.api.mockaroo.com/phones?key=212e1540";

export const PHONE_IMAGES: Record<PhoneColor, ImageSourcePropType> = {
  white: require("../assets/white.png"),
  red: require("../assets/red.png"),
  black: require("../assets/black.png"),
  blue: require("../assets/blue.png"),
};

export const COLOR_OPTIONS: {
  key: PhoneColor;
  label: string;
  swatch: string;
}[] = [
  { key: "white", label: "trắng", swatch: "#C5F0F9" },
  { key: "red", label: "đỏ", swatch: "#F30D0D" },
  { key: "black", label: "đen", swatch: "#000000" },
  { key: "blue", label: "xanh", swatch: "#234896" },
];

export const colorLabel = (color: PhoneColor): string =>
  COLOR_OPTIONS.find((c) => c.key === color)?.label ?? color;

export const formatVND = (value: number): string =>
  `${String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ`;
