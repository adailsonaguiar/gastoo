import React from 'react';
import {TextInputProps} from 'react-native';
import {Label} from '../Label';

import * as S from './styles';

type InputProps = {
  label: string;
} & TextInputProps;

const Input = ({label, ...rest}: InputProps) => {
  return (
    <S.Container>
      <Label>{label}</Label>
      <S.InputWrapper>
        <S.Input {...rest} />
      </S.InputWrapper>
    </S.Container>
  );
};

export default Input;
