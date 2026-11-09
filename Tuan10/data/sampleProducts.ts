import { Product } from "../types";

const img = (seed: string) => `https://picsum.photos/seed/${seed}/300/300`;

export const SAMPLE_PRODUCTS: Product[] = [
  { id: 1, name: "Laptop", price: 1000, image: img("rtk-laptop") },
  { id: 2, name: "Mouse", price: 25, image: img("rtk-mouse") },
  { id: 3, name: "Keyboard", price: 80, image: img("rtk-keyboard") },
  { id: 4, name: "Monitor 27\"", price: 320, image: img("rtk-monitor") },
  { id: 5, name: "Webcam HD", price: 55, image: img("rtk-webcam") },
  { id: 6, name: "Headphones", price: 120, image: img("rtk-headphones") },
  { id: 7, name: "USB-C Hub", price: 45, image: img("rtk-hub") },
  { id: 8, name: "SSD 1TB", price: 95, image: img("rtk-ssd") },
  { id: 9, name: "Bluetooth Speaker", price: 60, image: img("rtk-speaker") },
  { id: 10, name: "Tablet", price: 450, image: img("rtk-tablet") },
  { id: 11, name: "Smartwatch", price: 199, image: img("rtk-watch") },
  { id: 12, name: "Power Bank", price: 35, image: img("rtk-powerbank") },
];
