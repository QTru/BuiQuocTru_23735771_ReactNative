import "react-native-gesture-handler";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { PhoneProvider } from "./context/PhoneContext";
import { SettingsProvider } from "./context/SettingsContext";
import RootNavigator from "./navigation/RootNavigator";

export default function App() {
  return (
    <SafeAreaProvider>
      <SettingsProvider>
        <PhoneProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </PhoneProvider>
      </SettingsProvider>
    </SafeAreaProvider>
  );
}
