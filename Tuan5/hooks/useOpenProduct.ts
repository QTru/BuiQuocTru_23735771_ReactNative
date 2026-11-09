import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { ShopStackParamList } from "../types/navigation";

export function useOpenProduct() {
  const navigation =
    useNavigation<NativeStackNavigationProp<ShopStackParamList>>();
  return (id: number) => navigation.navigate("ProductDetail", { id });
}
