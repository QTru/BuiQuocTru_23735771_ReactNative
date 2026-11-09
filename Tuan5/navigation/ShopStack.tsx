import React from "react";
import { Pressable } from "react-native";
import { DrawerActions } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import MainTabs from "./MainTabs";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import ColorPickerScreen from "../screens/ColorPickerScreen";
import type { ShopStackParamList } from "../types/navigation";

const Stack = createNativeStackNavigator<ShopStackParamList>();

export default function ShopStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={MainTabs}
        options={({ navigation }) => ({
          title: "Cửa hàng",
          headerLeft: () => (
            <Pressable
              hitSlop={10}
              onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
            >
              <Ionicons name="menu" size={26} />
            </Pressable>
          ),
        })}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{ title: "Chi tiết sản phẩm" }}
      />
      <Stack.Screen
        name="ColorPicker"
        component={ColorPickerScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
