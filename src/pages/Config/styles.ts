import styled from 'styled-components/native';
import colors from '../../styles/colors';
import {fontMedium} from '../../styles/fonts';
import {ContainerBorderPage} from '../Dash/styles';

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.backgroundColorPrimary};
`;

export const SelectOption = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  padding-right: 5px;
  border-bottom-width: 0.6px;
  border-bottom-color: ${colors.gray300};
`;

export const LabelOption = styled.Text`
  color: ${colors.fontLight};
  font-family: ${fontMedium};
  font-size: 16px;
`;

export const ChevRightIcon = styled.Image`
  width: 17px;
  height: 17px;
`;

export const MenuWrapper = styled.View`
  flex: 1;
`;

export const Footer = styled.View`
  background: ${colors.backgroundColorPrimary};
  align-items: center;
  justify-content: center;
  padding-bottom: 20px;
  padding-top: 10px;
  flex-direction: row;
  ${ContainerBorderPage}
`;
