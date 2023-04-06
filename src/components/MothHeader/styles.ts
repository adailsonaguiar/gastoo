import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native';
import colors from '../../styles/colors';
import {fontBold} from '../../styles/fonts';

export const Container = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 25px 0;
  background-color: ${colors.darkBackground};
`;

export const MonthCenter = styled.Text`
  color: ${colors.backgroundColorPrimary};
  font-family: ${fontBold};
  font-size: 15px;
  background-color: #ffffff1a;
  border-radius: 24px;
  padding: 5px 20px;
`;

export const ButtonMonthIconPrev = styled.Image`
  margin-right: 20px;
`;

export const ButtonMonthIconNext = styled.Image`
  margin-left: 20px;
`;

export const ButtonPrevMonth = styled(TouchableOpacity)``;

export const ButtonNextMonth = styled(TouchableOpacity)``;
