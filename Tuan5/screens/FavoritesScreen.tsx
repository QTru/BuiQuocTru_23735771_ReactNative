import React from "react";
import ProductList from "../components/ProductList";
import { usePhones } from "../context/PhoneContext";

export default function FavoritesScreen() {
  const { phones, favoriteIds } = usePhones();
  const saved = phones.filter((p) => favoriteIds.includes(p.id));
  return <ProductList phones={saved} emptyText="Chưa có sản phẩm yêu thích" />;
}
