import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FavoritesProvider } from "./context/FavoritesContext";
import WelcomeScreen from "./screens/WelcomeScreen";
import BikeListScreen from "./screens/BikeListScreen";
import BikeDetailScreen from "./screens/BikeDetailScreen";
import type { RootStackParamList } from "./navigation/types";

const Stack = createNativeStackNavigator<RootStackParamList>();

const backHeader = {
  title: "",
  headerShadowVisible: false,
  headerBackButtonDisplayMode: "minimal" as const,
  headerTintColor: "#EA4040",
};

export default function App() {
  return (
    <SafeAreaProvider>
      <FavoritesProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen
              name="Welcome"
              component={WelcomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="BikeList" component={BikeListScreen} options={backHeader} />
            <Stack.Screen name="BikeDetail" component={BikeDetailScreen} options={backHeader} />
          </Stack.Navigator>
        </NavigationContainer>
      </FavoritesProvider>
    </SafeAreaProvider>
  );
}
