import styled from 'styled-components/native';
import {TextInputMask} from 'react-native-masked-text';
import colors from '../../styles/colors';
import {InputWrapperStyles} from '../InputWrapperStyles';

export const Container = styled.View`
  margin-bottom: 10px;
`;

export const Label = styled.Text`
  color: ${colors.fontLight};
  margin-bottom: 6px;
  font-size: 15px;
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: colors.colorStroke,
})`
  padding-left: 10px;
  ${InputWrapperStyles}
`;

export const InputMask = styled(TextInputMask)`
  padding-left: 10px;
  ${InputWrapperStyles}
`;

export const InputWrapper = styled.View`
  justify-content: center;
`;
