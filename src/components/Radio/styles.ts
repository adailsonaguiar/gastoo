import styled from 'styled-components/native';
import colors from '../../styles/colors';
import {fontBold} from '../../styles/fonts';

export const Container = styled.TouchableOpacity`
  flex-direction: row;
`;

export const RadioBorder = styled.View`
  height: 24px;
  width: 24px;
  border-radius: 12px;
  border-width: 2px;
  border-color: ${colors.gray40};
  align-items: center;
  justify-content: center;
`;

export const SelectedItem = styled.View`
  height: 12px;
  width: 12px;
  border-radius: 6px;
  background-color: ${colors.gray40};
`;

export const Label = styled.Text`
  font-family: ${fontBold};
  font-size: 16px;
  color: ${colors.darkBlue};
  margin-left: 16px;
`;
