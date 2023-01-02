import React, {forwardRef} from 'react';
import {TextInputProps} from 'react-native';
import {TextInputMaskOptionProp} from 'react-native-masked-text';
import {TextInputMaskTypeProp} from 'react-native-masked-text';

import * as S from './styles';

type InputProps = {
  label: string;
  type?: TextInputMaskTypeProp;
  options?: TextInputMaskOptionProp;
} & TextInputProps;

const Input = ({label, type, options, ...rest}: InputProps) => {
  return (
    <S.Container>
      <S.Label>{label}</S.Label>
      <S.InputWrapper>
        {type ? (
          <S.InputMask {...rest} type={type} options={options} />
        ) : (
          <S.Input {...rest} />
        )}
      </S.InputWrapper>
    </S.Container>
  );
};

export default Input;
