import styled from 'styled-components/native';
import {TouchableOpacity} from 'react-native';
import colors from '../../styles/colors';
import {fontBold, fontMedium} from '../../styles/fonts';

export const Container = styled.View`
  flex-direction: row;
  width: 100%;
  align-items: center;
  padding-top: 10px;
  background-color: ${colors.backgroundColorPrimary};
  padding-left: 20px;
  padding-right: 20px;
`;

export const MonthCenter = styled.Text`
  color: ${colors.backgroundColorPrimary};
  font-family: ${fontBold};
  font-size: 15px;
  background-color: ${colors.appColor};
  border-radius: 24px;
  padding: 5px 20px;
`;

export const Month = styled.Text`
  color: ${colors.fontLight};
  font-family: ${fontMedium};
  font-size: 15px;
  /* line-height: 17px; */
`;

export const ButtonMonthIconPrev = styled.Image`
  width: 15px;
  height: 15px;
  margin-right: 20px;
`;

export const ButtonMonthIconNext = styled.Image`
  width: 15px;
  height: 15px;
  margin-left: 20px;
`;

export const ButtonPrevMonth = styled(TouchableOpacity)`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

export const ButtonNextMonth = styled(TouchableOpacity)`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;
