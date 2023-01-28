import React from 'react';
import {ActivityIndicator} from 'react-native';
import colors from '../../styles/colors';
import * as S from './styles';

type LoadingProps = {
  isLoading: boolean;
};
export const Loading = ({isLoading}: LoadingProps) => {
  return (
    <S.Container visible={isLoading}>
      <S.LoadingWrapper>
        <ActivityIndicator size="large" color={colors.backgroundColorPrimary} />
      </S.LoadingWrapper>
    </S.Container>
  );
};
