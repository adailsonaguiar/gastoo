import React, {ReactNode} from 'react';
import {useNavigation} from '@react-navigation/native';

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
  screenNavigate: string;
  transactionStatus?: number;
  iconLeft?: ReactNode;
};

const CardTransaction = ({
  routeParameters,
  lineLeftColor,
  transactionTitle,
  categoryTransaction,
  value,
  status = '',
  transactionStatus,
  date,
  type = 'TRANSACTION_IN',
  screenNavigate,
  iconLeft,
}: CardTransactionProps) => {
  const navigation = useNavigation();

  function handleTransactionTitle(title: string) {
    const LIMIT_OF_TITLE_LENGTH = 23;
    if (title.length > LIMIT_OF_TITLE_LENGTH) {
      return `${transactionTitle.slice(0, LIMIT_OF_TITLE_LENGTH)}...`;
    }
    return title;
  }
  return (
    <S.Conta onPress={() => navigation && navigation.navigate(screenNavigate, routeParameters)}>
      {lineLeftColor && <S.LineLeft lineLeftColor={lineLeftColor} />}
      <S.WrapperIcon>{iconLeft && iconLeft}</S.WrapperIcon>

      <S.ColLeft>
        <S.TitleConta>{handleTransactionTitle(transactionTitle)}</S.TitleConta>
        <S.CategoryConta>{categoryTransaction}</S.CategoryConta>
      </S.ColLeft>
      <S.ColRight>
        <S.Saldo type={type}>{`${type === 'TRANSACTION_OUT' ? '-' : ''}R$${formatMoney(value)}`}</S.Saldo>
        <S.Atualizado>{`${status} ${formatteNumber(date.day)}/${formatteNumber(date.month)}`}</S.Atualizado>
      </S.ColRight>
      {transactionStatus === 0 ? <S.BadgeStatus /> : null}
    </S.Conta>
  );
};

export default CardTransaction;
