import styled from 'styled-components/native';
import colors from '../../styles/colors';
import {fontBold, fontMedium} from '../../styles/fonts';

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.backgroundColorPrimary};
`;

export const CompHead = styled.View`
  flex-direction: column;
  align-items: flex-start;
  padding: 30px 15px;
`;
export const TitleGrid = styled.Text`
  color: #00d0b4;
  font-size: 14px;
  margin-left: 10px;
  font-weight: 700;
  margin-top: 20px;
  text-align: center;
`;

export const ContainerSaldo = styled.View`
  flex-direction: row;
  align-items: flex-end;
`;

export const Cifra = styled.Text`
  color: ${colors.fontLight};
  font-size: 16px;
  /* font-family: ${fontMedium}; */
  margin-bottom: 14px;
  margin-right: 5px;
`;

export const TxtSaldo = styled.Text`
  color: ${colors.fontLight};
  font-size: 35px;
  /* font-family: ${fontBold}; */
`;

export const TxtDescricao = styled.Text`
  /* font-family: ${fontMedium}; */
  font-size: 13px;
  color: ${colors.fontLight};
`;

export const ContentWrapper = styled.View`
  /* padding: 0 10px; */
  flex: 1;
`;

export const Footer = styled.View`
  background: ${colors.backgroundColorPrimary};
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 20px;
  padding-top: 10px;
  flex-direction: row;
`;
