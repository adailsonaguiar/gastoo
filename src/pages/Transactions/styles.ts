import {RectButton} from 'react-native-gesture-handler';
import styled from 'styled-components/native';
import colors from '../../styles/colors';
import {fontLight, fontMedium, fontRegular} from '../../styles/fonts';

export const Container = styled.View`
  flex: 1;
  background: ${colors.backgroundColorPrimary};
`;

export const List = styled.View`
  flex: 5;
`;

export const Conta = styled(RectButton)`
  flex-direction: row;
  height: 70px;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
`;

export const Icon = styled.Image`
  width: 30px;
  height: 30px;
`;

export const ColLeft = styled.View`
  flex-direction: column;
  align-items: flex-start;
  flex: 2;
`;

export const TitleConta = styled.Text`
  color: ${colors.fontLight};
  font-size: 15px;
  font-family: ${fontMedium};
`;

export const CategoryConta = styled.Text`
  color: #90909c;
  font-family: ${fontLight};
  font-size: 11px;
`;

export const ColRight = styled.View`
  flex-direction: column;
  align-items: flex-end;
  flex: 2;
`;

export const Saldo = styled.Text`
  color: ${colors.fontLight};
  font-size: 16px;
  font-family: ${fontMedium};
`;

export const Atualizado = styled.Text`
  color: #90909c;
  font-family: ${fontRegular};
  font-size: 11px;
`;

export const Footer = styled.View`
  background: ${colors.backgroundColorSecondary};
  height: 61px;
  align-items: center;
  padding-left: 20px;
  flex-direction: row;
`;

export const SaldoTotal = styled.Text`
  color: ${colors.fontLight};
  flex: 3;
  font-family: ${fontMedium};
  font-size: 11px;
`;

export const BtnNovaConta = styled.TouchableOpacity`
  background: #282828;
  border-radius: 10px;
  flex: 2;
  height: 47px;
  width: 110px;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
`;

export const TxtNovaConta = styled.Text`
  color: ${colors.fontLight};
  font-family: Roboto-Bold;
  font-size: 11px;
`;
