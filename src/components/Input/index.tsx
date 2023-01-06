import React from 'react';
import {TextInputProps} from 'react-native';
import {Label} from '../Label';

import * as S from './styles';

type InputProps = {
  label: string;
  lineLeftColor?: string;
} & TextInputProps;

const Input = ({label, lineLeftColor, ...rest}: InputProps) => {
  return (
    <S.Container>
      <Label>{label}</Label>
      <S.InputWrapper>
        {lineLeftColor && <S.LineLeft lineLeftColor={lineLeftColor} />}
        <S.Input {...rest} />
      </S.InputWrapper>
    </S.Container>
  );
};

export default Input;
