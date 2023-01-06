import styled from 'styled-components/native';
import colors from '../../styles/colors';
import {fontLight} from '../../styles/fonts';
import {widthPercentageToDP} from '../../utils/ResponsiveDimensionsLayout';
// import {fontRegular} from '../../styles/fonts';

export const TabsContainer = styled.View`
  flex-direction: row;
  padding: 10px 20px;
`;

export const TabItem = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: ${widthPercentageToDP(100) / 3 - 23}px;
  height: 100px;
  background: ${colors.appColor};
  border-radius: 15px;
  margin-right: 15px;
  padding: 10px;
  align-items: center;
`;

export const TitleCard = styled.Text`
  color: #fff;
  font-size: 13px;
  padding-bottom: 10px;
  font-family: ${fontLight};
`;

export const IconArea = styled.View`
  flex: 3;
  padding-top: 15px;
  align-items: center;
`;

export const ImageIcon = styled.Image`
  width: 24px;
  height: 24px;
`;
