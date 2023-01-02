import React from 'react';

import {formatMoney, formatteNumber} from '../../utils/FunctionUtils';
import * as S from './styles';

type CardTransactionProps = {
  routeParameters: any;
  lineLeftColor?: string;
  transactionTitle: string;
  categoryTransaction?: string;
  value: number;
  status?: string;
  date: {day: string; month: string; year: string};
  type?: 'TRANSACTION_IN' | 'TRANSACTION_OUT';
  navigation: any;
  screenNavigate: any;
};

const CardTransaction = ({
  navigation,
  screenNavigate,
  routeParameters,
  lineLeftColor,
  transactionTitle,
  categoryTransaction,
  value,
  status = '',
  date,
  type = 'TRANSACTION_IN',
}: CardTransactionProps) => {
  return (
    <S.Conta
      onPress={() =>
        navigation && navigation.navigate(screenNavigate, routeParameters)
      }>
      {lineLeftColor && <S.LineLeft lineLeftColor={lineLeftColor} />}
      <S.ColLeft>
        <S.TitleConta>{transactionTitle}</S.TitleConta>
        <S.CategoryConta>{categoryTransaction}</S.CategoryConta>
      </S.ColLeft>
      <S.ColRight>
        <S.Saldo type={type}>R${`${formatMoney(value)}`}</S.Saldo>
        <S.Atualizado>{`${status} ${formatteNumber(date.day)}/${formatteNumber(
          date.month,
        )}`}</S.Atualizado>
      </S.ColRight>
    </S.Conta>
  );
};

export default CardTransaction;
