import styled from 'styled-components/native';
import {TextInputMask} from 'react-native-masked-text';
import colors from '../../styles/colors';
import {InputWrapperStyles} from '../InputWrapperStyles';
import {css} from 'styled-components';
import {fontSemibold} from '../../styles/fonts';

export const Container = styled.View``;

const inputMainStyle = css`
  border-width: 0;
  font-size: 30px;
  font-family: ${fontSemibold};
  border-radius: 0;
  padding: 0;
`;

export const InputMask = styled(TextInputMask)<{mainInput?: boolean}>`
  ${({mainInput}) => css`
    padding-left: 10px;
    ${InputWrapperStyles}
    ${mainInput && inputMainStyle}
  `}
`;

export const InputWrapper = styled.View`
  justify-content: center;
`;
