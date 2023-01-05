import React from 'react';
import {
  TextInputMask,
  TextInputMaskOptionProp,
  TextInputMaskTypeProp,
  TextInputMaskProps,
} from 'react-native-masked-text';
import {Label} from '../Label';

import * as S from './styles';

type InputProps = {
  label: string;
  type?: TextInputMaskTypeProp;
  options?: TextInputMaskOptionProp;
  onChangeMasked: (maskedValue: string, rawValue: string) => void;
  mainInput?: boolean;
} & TextInputMaskProps;

const InputMask = ({
  label,
  type,
  options,
  onChangeMasked,
  mainInput,
  ...rest
}: InputProps) => {
  return (
    <S.Container>
      <Label>{label}</Label>
      <S.InputWrapper>
        <S.InputMask
          {...rest}
          type={type}
          options={options}
          mainInput={mainInput}
          onChangeText={(maskedValue: string, rawValue: string) =>
            onChangeMasked(maskedValue, rawValue)
          }
        />
      </S.InputWrapper>
    </S.Container>
  );
};

export default InputMask;
