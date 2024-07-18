import Card from "@/components/Paywall/Card";
import { ThemedText } from "@/components/ThemedText";
import { ThemedTouchableOpacity } from "@/components/ThemedTouchableOpacity";
import { ThemedView } from "@/components/ThemedView";
import { normalized } from "@/constants/Styles";
import { useThemeColor } from "@/hooks/useThemeColor";
import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";

export type OptionsType = {
  label: string;
  value: string;
  price: string;
  now: string;
};
export default function PaywallInteraction() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const options: Array<OptionsType> = [
    { label: "Option 1", value: "Yearly", price: "$100", now: "$50.00" },
    { label: "Option 2", value: "Monthly", price: "", now: "$10.00" },
  ];
  const backgroundColor = useThemeColor({}, "background");
  const color = useThemeColor({}, "text");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
      <ThemedView style={styles.container}>
        <View>
          <ThemedText style={styles.title}>Unlock All Features</ThemedText>
          <View>
            <ThemedText style={styles.text}>
              <Entypo name="check" size={18} color={color} />
              Generate high-quality images
            </ThemedText>
            <ThemedText style={styles.text}>
              <Entypo name="check" size={18} color={color} />
              Customizable image creation
            </ThemedText>
            <ThemedText style={styles.text}>
              <Entypo name="check" size={18} color={color} />
              No ad interruptions
            </ThemedText>
            <ThemedText style={styles.text}>
              <Entypo name="check" size={18} color={color} />
              24/7 support
            </ThemedText>
          </View>
        </View>
        <View>
          <View style={styles.row}>
            {options.map((option) => (
              <Card
                key={option.value}
                data={option}
                selected={selectedOption === option.value}
                onPress={() => {
                  setSelectedOption(option.value);
                }}
              />
            ))}
          </View>
          <ThemedText lightColor="grey" darkColor="grey">
            Change plans or cancel anytime
          </ThemedText>
        </View>

        <ThemedTouchableOpacity
          lightColor="black"
          darkColor="white"
          style={{
            borderRadius: 24,
            paddingVertical: 12,
          }}
        >
          <ThemedText
            lightColor="white"
            darkColor="black"
            style={{ fontSize: 24, fontWeight: "bold", textAlign: "center" }}
          >
            Subscribe
          </ThemedText>
        </ThemedTouchableOpacity>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: normalized(16),
    // padd,
    justifyContent: "space-around",
  },
  title: {
    fontWeight: "bold",
    fontSize: normalized(34),
    lineHeight: normalized(34),
    textAlign: "center",
    marginBottom: normalized(24),
  },
  text: { fontWeight: "500" },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: normalized(12),
  },
});
