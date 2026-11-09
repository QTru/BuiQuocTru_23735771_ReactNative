import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabBar, { TabKey } from "../components/TabBar";
import HomeScreen from "../screens/HomeScreen";
import CategoryScreen from "../screens/CategoryScreen";
import CartScreen from "../screens/CartScreen";
import AccountScreen from "../screens/AccountScreen";
import BookDetailScreen from "../screens/BookDetailsScreen";
import { useAppSelector } from "../store/hooks";
import { selectCartCount } from "../store/cartSlice";
import type { RootStackParamList, TabParamList } from "./types";

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function MainTabs() {
  const cartCount = useAppSelector(selectCartCount);
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={({ state, navigation }) => (
        <TabBar
          active={state.routes[state.index].name as TabKey}
          cartCount={cartCount}
          onChange={(key) => navigation.navigate(key)}
        />
      )}
    >
      <Tab.Screen name="home" component={HomeScreen} />
      <Tab.Screen name="category" component={CategoryScreen} />
      <Tab.Screen name="cart" component={CartScreen} />
      <Tab.Screen name="account" component={AccountScreen} />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="BookDetail" component={BookDetailScreen} />
    </Stack.Navigator>
  );
}
