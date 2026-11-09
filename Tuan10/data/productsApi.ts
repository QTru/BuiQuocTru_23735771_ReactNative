import { Product } from "../types";
import { SAMPLE_PRODUCTS } from "./sampleProducts";

export const PRODUCTS_API_URL = "";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getProducts(): Promise<Product[]> {
  if (!PRODUCTS_API_URL) {
    await delay(700);
    return SAMPLE_PRODUCTS;
  }
  const res = await fetch(PRODUCTS_API_URL);
  if (!res.ok) throw new Error(`Lỗi HTTP ${res.status}`);
  return (await res.json()) as Product[];
}
