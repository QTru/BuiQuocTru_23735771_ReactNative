import React, { createContext, PropsWithChildren, useContext, useState } from "react";

interface SettingsValue {
  darkMode: boolean;
  notifications: boolean;
  setDarkMode: (v: boolean) => void;
  setNotifications: (v: boolean) => void;
}

const SettingsContext = createContext<SettingsValue | null>(null);

export function useSettings(): SettingsValue {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings phải nằm trong SettingsProvider");
  return ctx;
}

export function SettingsProvider({ children }: PropsWithChildren) {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  return (
    <SettingsContext.Provider
      value={{ darkMode, notifications, setDarkMode, setNotifications }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
