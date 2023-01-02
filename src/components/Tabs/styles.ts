import styled from 'styled-components/native';
import colors from '../../styles/colors';
// import {fontRegular} from '../../styles/fonts';

export const TabsContainer = styled.ScrollView.attrs({
  horizontal: true,
  contentContainerStyle: {paddingRight: 15},
  overScrollMode: 'never',
  height: 1,
})`
  padding-left: 15px;
`;

export const TabItem = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  width: 100px;
  height: 95px;
  background: ${colors.backgroundColorSecondary};
  border-radius: 10px;
  margin-right: 10px;
  padding: 10px;
  align-items: center;
`;

export const TitleCard = styled.Text`
  color: #fff;
  font-size: 13px;
  padding-bottom: 10px;
`;

export const IconArea = styled.View`
  flex: 3;
  padding-top: 15px;
  align-items: center;
`;

export const ImageIcon = styled.Image``;
