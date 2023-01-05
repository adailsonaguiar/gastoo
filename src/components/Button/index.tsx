import React from 'react';
import {ActivityIndicator, TouchableOpacityProps} from 'react-native';

import * as S from './styles';

type ButtonProps = {
  label: string;
  loading?: boolean;
  color?: string;
} & TouchableOpacityProps;

const Button = ({label, loading, color, ...rest}: ButtonProps) => {
  return (
    <S.Button {...rest} disabled={loading} activeOpacity={0.9}>
      {loading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <S.Label color={color}>{label}</S.Label>
      )}
    </S.Button>
  );
};

export default Button;
