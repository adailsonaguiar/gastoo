import React from 'react';

import * as S from './styles';
import {TouchableOpacityProps} from 'react-native';

type RadioProps = {
  label: string;
  disabled: boolean;
} & TouchableOpacityProps;

const Radio: React.FC<RadioProps> = ({label, disabled, ...rest}) => {
  return (
    <S.Container {...rest}>
      <S.RadioBorder>{disabled && <S.SelectedItem />}</S.RadioBorder>
      <S.Label>{label}</S.Label>
    </S.Container>
  );
};

export default Radio;
