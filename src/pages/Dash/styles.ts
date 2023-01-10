import styled from 'styled-components/native';
import colors from '../../styles/colors';
import {fontBold, fontLight, fontMedium} from '../../styles/fonts';

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.backgroundColorPrimary};
`;

export const ContainerBorderPage = styled.View`
  padding-left: 20px;
  padding-right: 20px;
`;

export const CompHead = styled.View`
  flex-direction: column;
  align-items: flex-start;
  padding: 5px 20px 5px 20px;
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
`;

export const ContainerSaldo = styled.View`
  flex-direction: row;
`;

export const Cifra = styled.Text`
  color: ${colors.greenApp};
  font-size: 16px;
  font-family: ${fontMedium};
  margin-top: 9px;
`;

export const TxtSaldo = styled.Text`
  color: ${colors.greenApp};
  font-size: 35px;
  font-family: ${fontBold};
  line-height: 40px;
`;

export const TxtDescricao = styled.Text`
  font-family: ${fontMedium};
  font-size: 13px;
  color: ${colors.appColor};
  margin-left: 25px;
`;

export const ContentWrapper = styled.View`
  /* padding: 0 10px; */
  flex: 1;
`;

export const Footer = styled.View`
  background: ${colors.backgroundColorPrimary};
  align-items: center;
  padding-bottom: 20px;
  padding-top: 10px;
  flex-direction: row;
  ${ContainerBorderPage}
`;

export const IncomeCard = styled.View<{color?: string}>`
  background-color: ${props => (props.color ? props.color : colors.appColor)};
  border-radius: 15px;
  margin-right: 10px;
  padding: 14px 10px;
`;

export const IncomeCardsWrapper = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
`;

export const IncomeCardValue = styled.Text`
  color: ${colors.backgroundColorPrimary};
  font-size: 24px;
  font-family: ${fontBold};
  line-height: 30px;
`;

export const Label = styled.Text`
  font-size: 13px;
  font-family: ${fontLight};
  color: ${colors.backgroundColorPrimary};
`;

export const SeeMoreBtn = styled.TouchableOpacity``;

export const SeeMore = styled.Text`
  font-size: 13px;
  font-family: ${fontBold};
  color: ${colors.appColor2};
`;

export const Logo = styled.Image`
  width: 75px;
  height: 75px;
`;

export const EyeBtn = styled.TouchableOpacity`
  margin-left: 10px;
`;

export const eyeIcon = styled.Image`
  width: 30px;
  height: 30px;
`;
