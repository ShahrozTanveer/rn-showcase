import {
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { normalized } from "@/constants/Styles";
import Animated, {
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import AntDesign from "@expo/vector-icons/AntDesign";
import { OptionsType } from "@/app/subscription";

const Card = ({
  data,
  selected,
  onPress,
}: {
  data: OptionsType;
  selected: boolean;
  onPress: () => void;
}) => {
  const iconPadding = useSharedValue(50);
  const progress = useSharedValue(30);
  const theme = useColorScheme() ?? "light";

  useEffect(() => {
    onPressHandler(true);
  }, [selected]);
  const textStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        progress.value,
        [30, 500],
        [
          theme === "light" ? "white" : "black",
          theme === "light" ? "black" : "white",
        ]
      ),
    };
  }, [progress, theme]);
  const animateStyle = useAnimatedStyle(() => {
    return {
      width: progress.value,
      height: progress.value,
      transform: [
        { translateX: progress.value / 2 - 20 },
        { translateY: progress.value / -2 + 20 },
      ],
    };
  }, [progress]);
  const animateIcon = useAnimatedStyle(() => {
    return {
      paddingTop: iconPadding.value,
    };
  }, [iconPadding]);
  const onPressHandler = (flag: boolean) => {
    progress.value = withTiming(
      !selected ? 30 : 450,
      { duration: 500 },
      (isFinished) => {
        if (isFinished) {
          iconPadding.value = withTiming(!selected ? 50 : 0, {
            duration: 500,
          });
          if (!flag) {
            runOnJS(onPress)();
          }
        }
      }
    );
  };

  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor: theme === "light" ? "black" : "white",
          borderColor: selected ? "#36C2CE" : "black",
        },
        styles.container,
      ]}
      onPress={() => {
        onPressHandler(false);
      }}
    >
      <Animated.View
        style={[
          {
            backgroundColor: theme === "light" ? "white" : "black",
          },
          styles.overlay,
          animateStyle,
        ]}
      ></Animated.View>

      <Animated.View style={[styles.iconContainer, animateIcon]}>
        <AntDesign name="checkcircle" size={25} color="#36C2CE" />
      </Animated.View>
      <View>
        <Animated.Text style={[styles.title, textStyle]}>
          {data.value}
        </Animated.Text>
        {data.price && (
          <Animated.Text
            style={[styles.disable, { textDecorationLine: "line-through" }]}
          >
            {data.price}
          </Animated.Text>
        )}
        <Animated.Text style={[styles.price, textStyle]}>
          {data.now}
        </Animated.Text>
      </View>
      <Animated.Text style={styles.disable}>Billed {data.value}</Animated.Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    width: normalized(160),
    height: normalized(160),
    borderWidth: 1,
    borderRadius: normalized(16),
    position: "relative",
    overflow: "hidden",
    padding: normalized(12),
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "bold",
    fontSize: normalized(24),
    marginBottom: normalized(4),
  },
  disable: {
    fontWeight: "bold",
    fontSize: normalized(16),
    color: "grey",
  },
  price: { fontWeight: "bold", fontSize: normalized(38) },
  iconContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    right: 0,
    position: "absolute",
    zIndex: 1,
    transform: [{ translateX: -5 }, { translateY: 5 }],
    overflow: "hidden",
  },
  overlay: {
    width: 30,
    height: 30,
    borderRadius: 500,
    position: "absolute",
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Card;
