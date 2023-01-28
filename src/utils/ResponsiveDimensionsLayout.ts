import {Dimensions, PixelRatio} from 'react-native';
export const screenWidth = Dimensions.get('window').width;

export function widthPercentageToDP(widthPercent: number) {
  const elemWidth = typeof widthPercent === 'number' ? widthPercent : parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
}
