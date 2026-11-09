import type { NavigatorScreenParams } from "@react-navigation/native";

export type TabParamList = {
  ProductsTab: undefined;
  SearchTab: undefined;
  FavoritesTab: undefined;
  ProfileTab: undefined;
};

export type ShopStackParamList = {
  Tabs: NavigatorScreenParams<TabParamList>;
  ProductDetail: { id: number };
  ColorPicker: { id: number };
};

// Bài 5: Drawer
export type DrawerParamList = {
  Home: undefined;
  Shop: NavigatorScreenParams<ShopStackParamList>;
  Profile: undefined;
  Settings: undefined;
};
