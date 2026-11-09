import type { NavigatorScreenParams } from "@react-navigation/native";

export type TabParamList = {
  home: undefined;
  category: undefined;
  cart: undefined;
  account: undefined;
};

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<TabParamList>;
  BookDetail: { bookId: number };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
