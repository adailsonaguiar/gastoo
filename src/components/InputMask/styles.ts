import styled from 'styled-components/native';
import {TextInputMask} from 'react-native-masked-text';
import {css} from 'styled-components';
import {fontBold} from '../../styles/fonts';

export const Container = styled.View``;

const inputMainStyle = css`
  border-width: 0;
  font-size: 35px;
  font-family: ${fontBold};
  border-radius: 0;
  padding: 0;
`;

export const InputMask = styled(TextInputMask)<{mainInput?: boolean}>`
  ${({mainInput}) => css`
    padding-left: 10px;
    ${mainInput && inputMainStyle}
  `}
`;

export const InputWrapper = styled.View`
  justify-content: center;
`;
