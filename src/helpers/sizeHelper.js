import { Dimensions, PixelRatio } from 'react-native';
import { PopinsFont } from './Fonts';
const screenSize = Dimensions.get('window');

const screentHeight = screenSize.height;
const screenWidth = screenSize.width;
const Height = 1334;
const Width = 750;
console.log('height, width ', screenSize);
const calHp = HP => {
  let heightPixel = HP; //- HP * 0.28
  let calculatedHeight =
    ((screentHeight > 1330 ? heightPixel : heightPixel) / Height) * 100;
  const elemHeight =
    typeof calculatedHeight === 'number'
      ? calculatedHeight
      : parseFloat(calculatedHeight);
  let heightDP = PixelRatio.roundToNearestPixel(
    (screentHeight * elemHeight) / 100,
  );
  return heightDP;
};

const calWp = WP => {
  let widthPixel = WP; //- WP * 0.28
  let calculatedWidth =
    ((screenWidth > 500 ? widthPixel : widthPixel) / Width) * 100;

  const elemWidth =
    typeof calculatedWidth === 'number'
      ? calculatedWidth
      : parseFloat(calculatedWidth);
  let widthDP = PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
  return widthDP;
};

const sizeHelper = {
  calHp,
  calWp,
  screentHeight,
  screenWidth,
};

export default sizeHelper;

export const FontSizes = {
  xs: 12,
  s: 14,
  m: 16,
  l: 18,
  xl: 22,
  xxl: 24,
  xl3: 26,
  xl4: 36,
  xl6: 52,
};

export const Spacing = {
  xxxs: 2,
  xxs: 4,
  xs: 8,
  s: 12,
  ms: 14,
  m: 16,
  l: 18,
  xl: 22,
  xxl: 24,
  xl3: 26,
  xl4: 28,
  xl5: 36,
  xl6: 44,
  xl7: 52,
};
