import React from 'react';
import {
  TextInputMask,
  TextInputMaskOptionProp,
  TextInputMaskTypeProp,
  TextInputMaskProps,
} from 'react-native-masked-text';

import * as S from './styles';

type InputProps = {
  label: string;
  type?: TextInputMaskTypeProp;
  options?: TextInputMaskOptionProp;
  onChangeMasked: (maskedValue: string, rawValue: string) => void;
} & TextInputMaskProps;

const InputMask = ({
  label,
  type,
  options,
  onChangeMasked,
  ...rest
}: InputProps) => {
  return (
    <S.Container>
      <S.Label>{label}</S.Label>
      <S.InputWrapper>
        <S.InputMask
          {...rest}
          type={type}
          options={options}
          onChangeText={(maskedValue: string, rawValue: string) =>
            onChangeMasked(maskedValue, rawValue)
          }
        />
      </S.InputWrapper>
    </S.Container>
  );
};

export default InputMask;
