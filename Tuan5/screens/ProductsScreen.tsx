import React from "react";
import ProductList from "../components/ProductList";
import { usePhones } from "../context/PhoneContext";

export default function ProductsScreen() {
  const { phones } = usePhones();
  return <ProductList phones={phones} emptyText="Chưa có sản phẩm" />;
}
