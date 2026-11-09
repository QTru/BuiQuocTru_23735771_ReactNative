import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { Provider } from "react-redux";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { store } from "./store";
import { initPersistence } from "./store/persistence";
import { useAppSelector } from "./store/hooks";
import { selectItemCount } from "./store/cartSelectors";
import ProductsScreen from "./screens/ProductsScreen";
import CartScreen from "./screens/CartScreen";

const Tab = createBottomTabNavigator();

function Tabs() {
  const count = useAppSelector(selectItemCount);
  return (
    <Tab.Navigator screenOptions={{ tabBarActiveTintColor: "#1565c0" }}>
      <Tab.Screen
        name="Products"
        component={ProductsScreen}
        options={{
          title: "Sản phẩm",
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>🛍️</Text>,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          title: "Giỏ hàng",
          tabBarBadge: count > 0 ? count : undefined,
          tabBarIcon: () => <Text style={{ fontSize: 20 }}>🛒</Text>,
        }}
      />
    </Tab.Navigator>
  );
}

function Root() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initPersistence().finally(() => setReady(true));
  }, []);

  if (!ready) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Tabs />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Root />
      </SafeAreaProvider>
    </Provider>
  );
}
