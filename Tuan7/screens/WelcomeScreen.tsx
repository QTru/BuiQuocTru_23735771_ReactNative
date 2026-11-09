import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/types";
import { getBikeImage } from "../data/bikes";

type Props = NativeStackScreenProps<RootStackParamList, "Welcome">;

const MONO = Platform.select({ ios: "Courier", default: "monospace" });

export default function WelcomeScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.slogan}>
          A premium online store for sporter and their stylish choice
        </Text>

        <View style={styles.imageBox}>
          <Image
            source={getBikeImage("bike1")}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>POWER BIKE{"\n"}SHOP</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("BikeList")}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#F8F7F5" },
  container: { flex: 1, padding: 16, alignItems: "center", justifyContent: "space-between" },
  slogan: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: MONO,
    fontWeight: "bold",
    marginTop: 40,
    paddingHorizontal: 16,
  },
  imageBox: {
    width: "100%",
    flex: 1,
    maxHeight: 360,
    marginVertical: 16,
    backgroundColor: "#F8E3E3",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  image: { width: "100%", height: "100%" },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 16 },
  button: {
    width: "100%",
    backgroundColor: "#EA4040",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 18, fontFamily: MONO, fontWeight: "bold" },
});
