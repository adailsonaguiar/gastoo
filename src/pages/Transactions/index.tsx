import React from 'react';
import * as S from './styles';
import Header from '../../components/Header';
import {TransactionsModel} from './index.model';
import {TransactionsList} from '../../components/TransactionsList';
import {useNavigation} from '@react-navigation/native';
import {formatMoney} from '../../utils/FunctionUtils';
import incomeIcon from '../../assets/arrow-income.png';
import expanseIcon from '../../assets/arrow-expanse.png';

const Transactions = () => {
  const {transactions, getTransactions, totalsMonth} = TransactionsModel();

  const navigation = useNavigation();
  return (
    <>
      <Header
        title="Transações"
        onChangeMonth={getTransactions}
        onClose={() => navigation.goBack()}
      />
      <S.Container>
        <S.List>
          <TransactionsList transactions={transactions} />
        </S.List>
        <S.Footer>
          <S.Incomes>
            <S.IconTotal source={incomeIcon} />
            <S.SaldoTotal>
              R$ {formatMoney(totalsMonth.totalIncome)}
            </S.SaldoTotal>
          </S.Incomes>
          <S.Expanse>
            <S.IconTotal source={expanseIcon} />
            <S.SaldoTotal>
              R$ {formatMoney(totalsMonth.totalExpense)}
            </S.SaldoTotal>
          </S.Expanse>
        </S.Footer>
      </S.Container>
    </>
  );
};

export default Transactions;
