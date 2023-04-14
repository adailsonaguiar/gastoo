import styled from 'styled-components/native';
import {Dimensions} from 'react-native';
import {fontBold} from '../../../../styles/fonts';
import colors from '../../../../styles/colors';
const width = Dimensions.get('window').width;

export const CompHead = styled.TouchableOpacity.attrs({
  activeOpacity: 0.9,
})<{color: string}>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 24px;
  border-radius: 12px;
  background: ${props => props.color};
  width: ${width - 48}px;
  margin-right: 5px;
`;

export const ContainerSaldo = styled.View`
  flex-direction: row;
`;

export const HaederLogo = styled.View`
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  padding: 0 20px;
`;

export const TxtDescricao = styled.Text`
  font-family: ${fontBold};
  font-size: 16px;
  color: ${colors.backgroundColorPrimary};
`;

export const LabelWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const IconWrapper = styled.View`
  background-color: #ffffff1a;
  width: 56px;
  height: 56px;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
`;

export const TxtSaldo = styled.Text`
  color: ${colors.backgroundColorPrimary};
  font-size: 24px;
  font-family: ${fontBold};
  line-height: 40px;
`;

export const WrapperMoneyHidden = styled.View`
  background-color: ${colors.gray100};
  width: 100px;
  height: 30px;
  border-radius: 5px;
`;

export const Section = styled.View`
  flex-direction: column;
`;
