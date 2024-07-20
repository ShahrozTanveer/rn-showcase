import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/useThemeColor";
import Item from "@/components/Toolbar/Item";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

const Toolbar = () => {
  const [selected, setSelected] = useState<null | number>(null);

  const data: Array<{
    title: string;
    color: string;
    icon: keyof typeof AntDesign.glyphMap;
  }> = [
    {
      title: "Home",
      color: "#F38181",
      icon: "home" as const,
    },
    {
      title: "Messages",
      color: "orange",
      icon: "message1" as const,
    },
    {
      title: "Notifications",
      color: "#AA96DA",
      icon: "notification" as const,
    },
    {
      title: "Settings",
      color: "#FC5185",
      icon: "setting" as const,
    },
    {
      title: "Profile",
      color: "#00B8A9",
      icon: "profile" as const,
    },
  ];
  const totalItems = data.length;
  const itemHeight = 60;
  const totalHeight = totalItems * itemHeight + (totalItems - 1) * 2;
  const findItemIndex = (xValue: number = 0, yValue: number = 0) => {
    //check out of bound x
    if (xValue < 0 || xValue > 76) {
      return -1;
    }
    let currentY = 8; //padding at start

    for (let i = 0; i < totalItems; i++) {
      const nextY = currentY + itemHeight;
      if (yValue >= currentY && yValue <= nextY) {
        return i;
      }
      currentY = nextY + 2; // 2 is gap
    }
    return -1;
  };

  const backgroundColor = useThemeColor({}, "background");
  const longTap = Gesture.LongPress()
    .onStart((event) => {
      const x = event.x;
      const y = event.y;
      setSelected(findItemIndex(x, y));
    })
    .onEnd((event) => {
      setSelected(-1);
    })
    .onTouchesMove((event) => {
      const x = event.allTouches[0].x;
      const y = event.allTouches[0].y;
      setSelected(findItemIndex(x, y));
    })
    .maxDistance(totalHeight)
    .runOnJS(true);
  const tap = Gesture.Tap()
    .onStart((event) => {
      console.log("tap", event.x, event.y); //TODO open option
    })
    .runOnJS(true);

  const composed = Gesture.Race(tap, longTap);

  return (
    <SafeAreaView style={[{ backgroundColor }, styles.container]}>
      <GestureDetector gesture={composed}>
        <View style={styles.wrapper}>
          {data.map((d, index) => (
            <Item
              key={index}
              index={index}
              title={d.title}
              icon={d.icon}
              color={d.color}
              selected={index === selected}
              ItemHeight={itemHeight}
            />
          ))}
        </View>
      </GestureDetector>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  row: { flexDirection: "row", gap: 2 },
  wrapper: {
    gap: 2,
    width: 76,
    backgroundColor: "#eee",
    paddingVertical: 8,
    paddingLeft: 8,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
export default Toolbar;
