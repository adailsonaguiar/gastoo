import React from 'react';
import {TextInputProps} from 'react-native';

import * as S from './styles';

type InputProps = {
  label: string;
} & TextInputProps;

const Input = ({label, ...rest}: InputProps) => {
  return (
    <S.Container>
      <S.Label>{label}</S.Label>
      <S.InputWrapper>
        <S.Input {...rest} />
      </S.InputWrapper>
    </S.Container>
  );
};

export default Input;
