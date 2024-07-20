import { StyleSheet, useColorScheme } from "react-native";
import React from "react";
import Animated, {
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { FontAwesome5 } from "@expo/vector-icons";
import { useThemeColor } from "@/hooks/useThemeColor";
interface ItemProps {
  index: number;
  selected: boolean;
  totalItems: number;
  icon: string;
  ItemWidth: number;
}
const Item: React.FC<ItemProps> = ({
  index,
  icon,
  selected,
  totalItems,
  ItemWidth,
}) => {
  const backgroundColor = useThemeColor(
    { light: "#eee", dark: "#45474B" },
    "background"
  );
  const theme = useColorScheme() ?? "light";
  const animatedStyles = useAnimatedStyle(() => {
    return {
      shadowColor: theme === "light" ? "#000" : "#9b9d9e",
      shadowOffset: {
        width: 0,
        height: withSpring(selected ? 1 : 2),
      },
      shadowOpacity: withSpring(selected ? 0.3 : 0.8),
      shadowRadius: withSpring(selected ? 3 : 4.65),

      elevation: withSpring(selected ? 0 : 8),
      transform: [
        {
          scale: withSpring(selected ? 0.95 : 1),
        },
        {
          translateY: withSpring(selected ? -0.95 : 0),
        },
      ],
    };
  }, [selected, theme]);

  const isFirst = index === 0;
  const isLast = index === totalItems - 1;

  //TODO change to COLOR lib
  return (
    <Animated.View
      // onTouchStart={onPress}
      style={[
        styles.container,
        {
          backgroundColor,
          width: ItemWidth,
          borderTopLeftRadius: isFirst ? 12 : 0,
          borderBottomLeftRadius: isFirst ? 12 : 0,
          borderTopRightRadius: isLast ? 12 : 0,
          borderBottomRightRadius: isLast ? 12 : 0,
        },
        animatedStyles,
      ]}
    >
      <FontAwesome5
        name={icon}
        size={25}
        color={theme === "light" ? "black" : "white"}
      />
    </Animated.View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default React.memo(Item);
