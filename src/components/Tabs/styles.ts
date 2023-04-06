import styled from 'styled-components/native';
import {fontMedium} from '../../styles/fonts';
// import {fontRegular} from '../../styles/fonts';

export const TabsContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const TabItem = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  align-items: center;
`;

export const TitleCard = styled.Text`
  color: #fff;
  font-size: 14px;
  padding-top: 10px;
  font-family: ${fontMedium};
`;

export const IconArea = styled.View`
  align-items: center;
  width: 72px;
  height: 72px;
  background: #ffffff14;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
`;

export const ImageIcon = styled.Image``;
