import { HelloWave } from "@/components/HelloWave";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Link } from "expo-router";
import { StyleSheet } from "react-native";

export default function Home() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText>Home Screen</ThemedText>
      <Link href={{ pathname: "paywall-interaction" }}>
        <ThemedText> Paywall Interaction</ThemedText>
      </Link>
      <HelloWave />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 50,
    height: 50,
  },
});
