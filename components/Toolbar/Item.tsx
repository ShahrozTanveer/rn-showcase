import { StyleSheet } from "react-native";
import React from "react";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import AntDesign from "@expo/vector-icons/AntDesign";

interface ItemProps {
  index: number;
  selected: boolean;
  color: string;
  title: string;
  icon: keyof typeof AntDesign.glyphMap;
  ItemHeight: number;
}
const Item: React.FC<ItemProps> = ({ selected, icon, color, title }) => {
  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(selected ? 200 : 60),
      transform: [
        {
          translateX: withSpring(selected ? 70 : 0),
        },
        {
          translateY: withSpring(selected ? -2 : 0),
        },
      ],
    };
  }, [selected]);
  const animatedText = useAnimatedStyle(() => {
    return {
      marginStart: withSpring(selected ? 20 : 0),
      opacity: withSpring(selected ? 1 : 0.2),
      left: withSpring(selected ? 32 : 65),
    };
  }, [selected]);
  return (
    <Animated.View
      style={[styles.container, { backgroundColor: color }, animatedStyle]}
    >
      <AntDesign name={icon} size={24} color={"#fff"} style={styles.icon} />

      <Animated.Text style={[styles.title, animatedText]}>
        {title}
      </Animated.Text>
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    borderRadius: 6,
    overflow: "hidden",
    position: "relative",
  },
  title: { color: "#fff", fontSize: 24, position: "absolute" },
  icon: { left: 18, position: "absolute" },
});

export default Item;
