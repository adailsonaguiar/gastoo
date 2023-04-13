import styled from 'styled-components/native';
import colors from '../../styles/colors';
import {FontInputStyles, InputWrapperStyles} from '../InputWrapperStyles';
import {css} from 'styled-components';

export const Container = styled.View``;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: colors.gray400,
})`
  flex: 1;
  padding-left: 10px;
  height: 66px;
  ${FontInputStyles}
`;

export const InputWrapper = styled.View`
  flex-direction: row;
  padding-left: 10px;
  align-items: center;
  ${InputWrapperStyles}
`;

export const LineLeft = styled.View<{lineLeftColor: string}>`
  ${({lineLeftColor}) => css`
    width: 16px;
    height: 16px;
    border-radius: 24px;
    background-color: ${lineLeftColor};
  `}
`;
