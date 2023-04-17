import styled from 'styled-components/native';
import {fontMedium} from '../../styles/fonts';

export const TabItem = styled.TouchableOpacity.attrs({
  activeOpacity: 0.9,
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
