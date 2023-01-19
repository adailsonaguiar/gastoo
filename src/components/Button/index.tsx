import React from 'react';
import {TouchableOpacityProps} from 'react-native';

import * as S from './styles';

type ButtonProps = {
  label: string;
  loading?: boolean;
  color?: string;
} & TouchableOpacityProps;

const Button = ({label, loading, color, ...rest}: ButtonProps) => {
  return (
    <S.Button {...rest} disabled={loading}>
      {loading ? <S.Loading /> : <S.Label color={color}>{label}</S.Label>}
    </S.Button>
  );
};

export default Button;
