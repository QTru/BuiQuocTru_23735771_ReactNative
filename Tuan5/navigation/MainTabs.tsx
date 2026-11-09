import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import ProductsScreen from "../screens/ProductsScreen";
import SearchScreen from "../screens/SearchScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import ProfileScreen from "../screens/ProfileScreen";
import type { TabParamList } from "../types/navigation";

type IconName = React.ComponentProps<typeof Ionicons>["name"];

const ICONS: Record<keyof TabParamList, [IconName, IconName]> = {
  ProductsTab: ["phone-portrait", "phone-portrait-outline"],
  SearchTab: ["search", "search-outline"],
  FavoritesTab: ["heart", "heart-outline"],
  ProfileTab: ["person", "person-outline"],
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // header do Stack cha hiển thị
        tabBarActiveTintColor: "#EE0D0D",
        tabBarIcon: ({ focused, color, size }) => (
          <Ionicons
            name={ICONS[route.name][focused ? 0 : 1]}
            size={size}
            color={color}
          />
        ),
      })}
    >
      <Tab.Screen
        name="ProductsTab"
        component={ProductsScreen}
        options={{ title: "Products" }}
      />
      <Tab.Screen
        name="SearchTab"
        component={SearchScreen}
        options={{ title: "Search" }}
      />
      <Tab.Screen
        name="FavoritesTab"
        component={FavoritesScreen}
        options={{ title: "Favorites" }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileScreen}
        options={{ title: "Profile" }}
      />
    </Tab.Navigator>
  );
}
