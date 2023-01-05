import React from 'react';
import {StatusBar, FlatList} from 'react-native';

import {formatMoney} from '../../utils/FunctionUtils';
import colors from '../../styles/colors';

import * as S from './styles';
import Header from '../../components/Header';
import {pages} from '../../routes';
import CardTransaction from '../../components/CardTransaction';
import {
  categoriesExpense,
  categoriesIncome,
} from '../../utils/categoriesTransactions';
import {transactionType} from '../../database/schemas/TransactionSchema';
import {TransactionsModel} from './index.model';
import {TransactionsList} from '../../components/TransactionsList';

const Transactions = () => {
  const {transactions, getTransactions} = TransactionsModel();

  return (
    <>
      <Header title="Transações" onChangeMonth={getTransactions} />
      <S.Container>
        <S.List>
          <TransactionsList transactions={transactions} />
        </S.List>
        <S.Footer>
          {/* <S.SaldoTotal>
            Economia do mês: R$ {formatMoney(totalValueIn - totalValueOut)}
          </S.SaldoTotal> */}
        </S.Footer>
      </S.Container>
    </>
  );
};

export default Transactions;
