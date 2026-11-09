import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import ShopStack from "./ShopStack";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import type { DrawerParamList } from "../types/navigation";

type IconName = React.ComponentProps<typeof Ionicons>["name"];

const Drawer = createDrawerNavigator<DrawerParamList>();

const icon =
  (name: IconName) =>
  ({ color, size }: { color: string; size: number }) => (
    <Ionicons name={name} size={size} color={color} />
  );

export default function RootNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Shop">
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Home", drawerIcon: icon("home-outline") }}
      />
      <Drawer.Screen
        name="Shop"
        component={ShopStack}
        options={{
          title: "Cửa hàng",
          headerShown: false, // Stack bên trong tự có header
          drawerIcon: icon("phone-portrait-outline"),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: "Profile", drawerIcon: icon("person-outline") }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: "Settings", drawerIcon: icon("settings-outline") }}
      />
    </Drawer.Navigator>
  );
}
