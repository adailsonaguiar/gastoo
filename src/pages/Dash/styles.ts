import styled from 'styled-components/native';
import colors from '../../styles/colors';
import {fontBold, fontMedium, fontRegular} from '../../styles/fonts';
import {css} from 'styled-components';

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.darkBackground};
`;

export const HeaderWrapper = styled.View`
  padding: 10px 0;
`;

export const CompHead = styled.View`
  flex-direction: column;
  align-items: flex-start;
  padding: 24px;
  border-radius: 12px;
  background: ${colors.eletricBlue};
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

export const ContainerSaldo = styled.View`
  flex-direction: row;
`;

export const TxtSaldo = styled.Text`
  color: ${colors.backgroundColorPrimary};
  font-size: 24px;
  font-family: ${fontBold};
  line-height: 40px;
`;

export const TxtDescricao = styled.Text`
  font-family: ${fontBold};
  font-size: 16px;
  color: ${colors.backgroundColorPrimary};
`;

export const LabelWrapper = styled.View`
  flex-direction: row;
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

export const EyeBtn = styled.TouchableOpacity`
  margin-left: 10px;
`;

export const eyeIcon = styled.Image`
  width: 25px;
  height: 25px;
`;

export const WrapperMoneyHidden = styled.View`
  background-color: ${colors.gray100};
  width: 100px;
  height: 30px;
  border-radius: 5px;
`;

export const CustomWrapper = styled.View<{background?: string; marginBottom?: string}>`
  ${({background, marginBottom}) => css`
    background: ${background ? background : colors.darkBackground};
    padding: 0 24px;
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
