import React from 'react';
import * as S from './styles';
import Header from '../../components/Header';
import {TransactionsModel} from './index.model';
import {TransactionsList} from '../../components/TransactionsList';
import {useNavigation} from '@react-navigation/native';
import {formatMoney} from '../../utils/FunctionUtils';
import incomeIcon from '../../assets/arrow-income.png';
import expanseIcon from '../../assets/arrow-expanse.png';
import {Loading} from '../../components/Loading';
import {useRealm} from '../../store/realm';

const Transactions = () => {
  const {realm} = useRealm();

  const {transactions, getTransactions, totalsMonth, loading} = TransactionsModel({realm});

  const navigation = useNavigation();
  return (
    <>
      <Header title="Transações" onChangeMonth={getTransactions} onClose={() => navigation.goBack()} />
      <S.Container>
        <S.List>
          <TransactionsList transactions={transactions} />
        </S.List>
        <S.Footer>
          <S.Incomes>
            <S.IconTotal source={incomeIcon} />
            <S.SaldoTotal>R$ {formatMoney(totalsMonth.totalIncome)}</S.SaldoTotal>
          </S.Incomes>
          <S.Expanse>
            <S.IconTotal source={expanseIcon} />
            <S.SaldoTotal>R$ {formatMoney(totalsMonth.totalExpense)}</S.SaldoTotal>
          </S.Expanse>
        </S.Footer>
      </S.Container>
      <Loading isLoading={loading} />
    </>
  );
};

export default Transactions;
