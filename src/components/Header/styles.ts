import styled, {css} from 'styled-components/native';
import colors from '../../styles/colors';
import {fontBold, fontMedium} from '../../styles/fonts';

export const Container = styled.View`
  background: ${colors.backgroundColorSecondary};
  height: 50px;
  flex-direction: row;
  align-items: center;
  padding-left: 24px;
  padding-right: 24px;
  justify-content: center;
`;

export const Title = styled.Text`
  color: #03dac5;
  font-size: 17px;
`;

export const HeaderForm = styled.View<{padding?: number; style?: 'dark' | 'light'}>`
  ${({padding, style}) => css`
    width: 100%;
    background: ${style === 'dark' ? colors.darkBackground : colors.backgroundColorSecondary};
    padding-left: ${padding ? padding + 'px' : '20px'};
    padding-right: ${padding ? padding + 'px' : '20px'};
    padding-top: ${padding ? padding + 'px' : '30px'};
  `}
`;

export const HeaderSelect = styled.View`
  ${({}) => css`
    width: 100%;
    padding: 10px 0;
  `}
`;

export const RowWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const SpaceWrapper = styled.View<{flex?: number; align?: string}>`
  ${({flex, align}) => css`
    flex: ${flex ? flex : 1};
    align-items: ${align ? align : 'center'};
  `}
`;

export const TxtHeaderForm = styled.Text<{style?: 'dark' | 'light'}>`
  ${({style}) => css`
    color: ${style === 'dark' ? colors.backgroundColorPrimary : colors.darkBackground};
    font-size: 24px;
    font-family: ${fontBold};
  `}
`;

export const HeaderBtn = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  width: 48px;
  height: 48px;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
  border: 1px solid ${colors.dark500};
`;

export const Subtitle = styled.View`
  font-size: 16px;
  color: ${colors.fontLight};
  font-family: ${fontMedium};
  margin-top: 5px;
`;

export const HeaderBtnIcon = styled.Image``;
