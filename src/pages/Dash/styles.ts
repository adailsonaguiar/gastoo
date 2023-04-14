import styled from 'styled-components/native';
import colors from '../../styles/colors';
import {fontBold, fontMedium, fontRegular} from '../../styles/fonts';
import {css} from 'styled-components';

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.darkBackground};
  padding-top: 24px;
`;

export const HeaderWrapper = styled.View`
  padding: 10px 0;
`;

export const TitleGrid = styled.Text`
  color: #00d0b4;
  font-size: 14px;
  margin-left: 10px;
  font-weight: 700;
  margin-top: 20px;
  text-align: center;
`;

export const HaederLogo = styled.View`
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  padding: 0 20px;
`;

export const ContentWrapper = styled.View<{background?: string}>`
  ${({background}) => css`
    background: ${background ? background : colors.darkBackground};
    flex: 1;
    /* padding: 0 24px; */
  `}
`;

export const Footer = styled.View`
  background: ${colors.backgroundColorPrimary};
  align-items: center;
  padding-bottom: 20px;
  padding-top: 10px;
  flex-direction: row;
`;

export const IncomeCard = styled.View<{color?: string; alignRight?: boolean}>`
  ${({alignRight}) => css`
    align-items: ${alignRight ? 'flex-end' : 'flex-start'};
  `}
`;

export const IncomeCardsWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const IncomeCardValue = styled.Text<{colorSuccess?: boolean}>`
  ${({colorSuccess}) => css`
    color: ${colorSuccess ? colors.supportSuccess : colors.supportDanger};
    font-size: 18px;
    font-family: ${fontBold};
    line-height: 24px;
  `}
`;

export const Label = styled.Text`
  font-size: 12px;
  font-family: ${fontMedium};
  color: ${colors.backgroundColorPrimary};
`;

export const SeeMoreBtn = styled.TouchableOpacity``;

export const SeeMore = styled.Text`
  font-size: 16px;
  font-family: ${fontRegular};
  color: ${colors.eletricBlue};
`;

export const Logo = styled.Image`
  width: 75px;
  height: 75px;
`;

export const WrapperMoneyHidden = styled.View`
  background-color: ${colors.gray100};
  width: 100px;
  height: 30px;
  border-radius: 5px;
`;

export const CustomWrapper = styled.View<{background?: string; marginBottom?: string; padding?: number}>`
  ${({background, marginBottom, padding}) => css`
    background: ${background ? background : colors.darkBackground};
    padding: ${Number.isInteger(padding) ? padding + 'px' : '0 24px'};
    margin-bottom: ${marginBottom ? marginBottom : '37px'};
  `}
`;

export const CustomWrapperWithoutMargin = styled.View<{background?: string}>`
  ${({background}) => css`
    background: ${background ? background : colors.darkBackground};
    padding: 0;
    flex: 1;
  `}
`;
