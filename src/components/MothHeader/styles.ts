import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TouchableOpacity} from 'react-native';
import colors from '../../styles/colors';
import {fontBold} from '../../styles/fonts';

export const Container = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  background-color: ${colors.backgroundColorPrimary};
  padding-left: 70px;
  padding-right: 70px;
`;

export const Month = styled.Text`
  color: ${colors.greenApp};
  font-family: ${fontBold};
`;

export const CustomIcon = styled(Icon)``;

export const ButtonMonth = styled(TouchableOpacity)`
  background-color: ${colors.darker};
  width: 32px;
  height: 32px;
  border-radius: 32px;
`;
