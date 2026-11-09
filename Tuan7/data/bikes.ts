import { ImageSourcePropType } from "react-native";
import data from "../assets/data.json";

export interface Bike {
  id: string;
  name: string;
  genre: string;
  image: string;
  price: number;
  discount: string;
  description: string;
}

export const BIKES: Bike[] = data as Bike[];

const BIKE_IMAGES: Record<string, ImageSourcePropType> = {
  bike1: require("../assets/bike1.png"),
  bike2: require("../assets/bike2.png"),
  bike3: require("../assets/bike3.png"),
  bike4: require("../assets/bike4.png"),
};

export const getBikeImage = (key: string): ImageSourcePropType =>
  BIKE_IMAGES[key] ?? BIKE_IMAGES.bike1;

export const FILTERS = ["All", "Roadbike", "Mountain"] as const;
export type Filter = (typeof FILTERS)[number];

export const discountPercent = (bike: Bike): number =>
  parseInt(bike.discount, 10) || 0;

export const salePrice = (bike: Bike): number =>
  Math.round(bike.price * (1 - discountPercent(bike) / 100));
