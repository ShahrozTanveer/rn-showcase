import { StyleSheet } from "react-native";
import React, { useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import { AntDesign } from "@expo/vector-icons";

const PayButton = () => {
  const [isPaid, setIsPaid] = useState(false);
  const height = useSharedValue(56);
  const offset = useSharedValue(0);
  const paidOffset = useSharedValue(60);
  const progress = useSharedValue(0);
  const backgroundColor = useThemeColor({}, "background");
  const buttonTextAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: offset.value }],
    };
  }, [offset]);
  const buttonAnimatedStyle = useAnimatedStyle(() => {
    return {
      height: height.value,
    };
  }, [height]);
  const handlePress = () => {
    if (!isPaid) {
      setIsPaid(true);
      offset.value = withTiming(-60, { duration: 600 }, (finished) => {
        if (finished) {
          height.value = withTiming(30, { duration: 600 }, (fin) => {
            if (fin) {
              progress.value = withTiming(100, { duration: 1000 }, (isFin) => {
                if (isFin) {
                  height.value = withTiming(56, { duration: 600 }, (fin) => {
                    if (fin) {
                      paidOffset.value = withTiming(0, { duration: 600 });
                    }
                  });
                }
              });
            }
          });
        }
      });
    }
  };
  const progressAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: `${progress.value}%`,
      height: height.value,
    };
  }, [progress, height]);
  const paidAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: paidOffset.value }],
    };
  }, [paidOffset]);
  return (
    <SafeAreaView style={[{ backgroundColor }, styles.container]}>
      <Animated.View
        style={[styles.button, buttonAnimatedStyle]}
        onTouchStart={handlePress}
      >
        <Animated.Text style={[styles.buttonText, buttonTextAnimatedStyle]}>
          Pay Now
        </Animated.Text>
        <Animated.View style={[styles.paidContainer, paidAnimatedStyle]}>
          <AntDesign name="checkcircle" size={25} color="#fff" />
          <Animated.Text style={[styles.paidButtonText]}>Paid</Animated.Text>
        </Animated.View>
        <Animated.View
          style={[styles.progress, progressAnimatedStyle]}
        ></Animated.View>
      </Animated.View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  button: {
    width: "100%",
    backgroundColor: "#eee",
    borderRadius: 28,
    position: "relative",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontWeight: "bold",
    fontSize: 32,
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
  },
  paidButtonText: {
    fontWeight: "bold",
    fontSize: 32,
    color: "#fff",
  },
  paidContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 0,
    gap: 4,
    flexDirection: "row",
    right: 0,
    zIndex: 10,
  },
  progress: {
    backgroundColor: "#4cd964",
    borderRadius: 28,
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
  },
});
export default PayButton;
