import { StyleSheet, useWindowDimensions } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import Item from "@/components/Tape/item";
import Animated from "react-native-reanimated";

const MusicTape = () => {
  const [selected, setSelected] = useState<null | number>(null);
  const backgroundColor = useThemeColor({}, "background");
  const data = [
    { icon: "play" },
    { icon: "pause" },
    { icon: "step-backward" },
    { icon: "step-forward" },

  ];
  const totalItems = data.length;
  const { width } = useWindowDimensions();
  const TotalSpace = width - 32 - (totalItems - 1) * 2;
  const ItemWidth = TotalSpace / totalItems;
  const findItemIndex = (xValue: number, yValue: number = 0) => {
    //check out of bound y
    if (yValue < 0 || yValue > 60) {
      return -1;
    }
    let currentX = 16; //padding at start

    for (let i = 0; i < totalItems; i++) {
      const nextX = currentX + ItemWidth;
      if (xValue >= currentX && xValue <= nextX) {
        return i;
      }
      currentX = nextX + 2; // 2 is gap
    }
    return -1;
  };
  return (
    <SafeAreaView style={[{ backgroundColor }, styles.container]}>
      <Animated.View
        onTouchMove={(event) => {
          setSelected(
            findItemIndex(event.nativeEvent.pageX, event.nativeEvent.locationY)
          );
        }}
        onTouchStart={(event) => {
          setSelected(findItemIndex(event.nativeEvent.pageX));
        }}
        style={styles.row}
      >
        {data.map((d, index) => (
          <Item
            ItemWidth={ItemWidth}
            key={index}
            index={index}
            icon={d.icon}
            selected={index === selected}
            totalItems={totalItems}
          />
        ))}
      </Animated.View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: "space-around",
  },
  row: { flexDirection: "row", gap: 2 },
});
export default MusicTape;
