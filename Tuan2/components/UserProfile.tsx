import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: { street: string; city: string };
  company: { name: string };
}

const Field = ({ label, value }: { label: string; value?: string }) =>
  value ? (
    <Text style={styles.field}>
      {label}: {value}
    </Text>
  ) : null;

export default function UserProfile() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users/1",
        );
        const data = await response.json();
        setUser(data as User);
      } catch (error) {
        console.log(error);
      }
    };
    loadUser();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{user?.name}</Text>
      <Field label="Username" value={user?.username} />
      <Field label="Email" value={user?.email} />
      <Field label="Điện thoại" value={user?.phone} />
      <Field label="Website" value={user?.website} />
      <Field label="Thành phố" value={user?.address?.city} />
      <Field label="Công ty" value={user?.company?.name} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 6 },
  name: { fontSize: 22, fontWeight: "bold" },
  field: { fontSize: 15 },
});
