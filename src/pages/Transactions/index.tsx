import React from 'react';
import * as S from './styles';
import Header from '../../components/Header';
import {TransactionsModel} from './index.model';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
// import {Loading} from '../../components/Loading';
import {useRealm} from '../../store/realm';
import {TransactionsListByDate} from '../../components/TransactionsListByDate';

const Transactions = () => {
  const {realm} = useRealm();

  const {transactions, getTransactions, getAccounts, accounts} = TransactionsModel({realm});

  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      getAccounts();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [realm]),
  );

  return (
    <>
      <Header title="Transações" onChangeMonth={getTransactions} onClose={() => navigation.goBack()} style="dark" />
      <S.Container>
        <S.List>
          <TransactionsListByDate transactions={transactions} accounts={accounts} />
        </S.List>
        {/* <S.Footer>
          <S.Incomes>
            <S.IconTotal source={incomeIcon} />
            <S.SaldoTotal>R$ {formatMoney(totalsMonth.totalIncome)}</S.SaldoTotal>
          </S.Incomes>
          <S.Expanse>
            <S.IconTotal source={expanseIcon} />
            <S.SaldoTotal>R$ {formatMoney(totalsMonth.totalExpense)}</S.SaldoTotal>
          </S.Expanse>
        </S.Footer> */}
      </S.Container>
      {/* <Loading isLoading={loading} /> */}
    </>
  );
};

export default Transactions;
