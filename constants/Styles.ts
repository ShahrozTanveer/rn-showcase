import { Dimensions, PixelRatio } from "react-native";
const templateWidth = 375;
const templateHeight = 812;
export const ScreenSize = Dimensions.get("window");
const widthRatio = ScreenSize.width / templateWidth;
const heightRatio = ScreenSize.height / templateHeight;

export const normalized = (value: number) =>
  PixelRatio.roundToNearestPixel(value * widthRatio);

export const hv = (value: number) =>
  PixelRatio.roundToNearestPixel(value * heightRatio);
