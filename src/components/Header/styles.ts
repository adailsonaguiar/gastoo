import styled, {css} from 'styled-components/native';
import colors from '../../styles/colors';
import {fontMedium} from '../../styles/fonts';

export const Container = styled.View`
  background: ${colors.backgroundColorPrimary};
  height: 50px;
  flex-direction: row;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  justify-content: center;
`;

export const Title = styled.Text`
  color: #03dac5;
  font-size: 17px;
`;

export const HeaderForm = styled.View`
  width: 100%;
  background: ${colors.backgroundColorPrimary};
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 30px;
  padding-bottom: 15px;
`;

export const RowWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const TxtHeaderForm = styled.Text`
  color: ${colors.fontLight};
  font-size: 26px;
  font-family: ${fontMedium};
`;

export const BtnFechar = styled.TouchableOpacity`
  width: 35px;
  height: 35px;
  align-items: flex-end;
`;

type LineProps = {
  lineColor?: string;
};

export const Line = styled.View<LineProps>`
  ${({lineColor}) => css`
    width: 41px;
    height: 4px;
    margin-top: 17px;
    background-color: ${lineColor ? lineColor : colors.greenApp};
  `}
`;

export const Subtitle = styled.Text`
  font-size: 16px;
  color: ${colors.fontLight};
  font-family: ${fontMedium};
  margin-top: 5px;
`;
