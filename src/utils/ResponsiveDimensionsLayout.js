import {Dimensions, PixelRatio} from 'react-native';
let screenWidth = Dimensions.get('window').width;

export function widthPercentageToDP(widthPercent) {
  const elemWidth =
    typeof widthPercent === 'number' ? widthPercent : parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100);
}
