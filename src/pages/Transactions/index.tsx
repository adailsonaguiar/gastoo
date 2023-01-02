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

const Transactions = ({navigation}) => {
  // const transactions = useSelector(state => state.transactions.list);
  // const totalValueOut = useSelector(
  //   state => state.transactions.totalValueTransactionsOut,
  // );
  // const totalValueIn = useSelector(
  //   state => state.transactions.totalValueTransactionsIn,
  // );

  function getTransactionStatus(status: number) {
    const statusList: {[key: number]: string} = {
      0: 'Pendente',
      1: 'Confirmado',
      2: '',
    };
    return statusList[status];
  }

  function getCategories(transaction) {
    if (transaction.type === transactionType.TRANSACTION_IN) {
      return categoriesIncome;
    }
    return categoriesExpense;
  }

  return (
    <>
      <Header title="Transações" showMonthHeader navigation={navigation} />
      <S.Container>
        <S.List>
          {/* <FlatList
            data={transactions}
            renderItem={({item}) => (
              <CardTransaction
                navigation={navigation}
                screenNavigate={pages.transactionForm}
                parameters={{
                  transaction: item,
                  date: {day: item.day, month: item.month, year: item.year},
                  formType: item.type === transactionType.TRANSACTION_IN,
                }}
                transactionTitle={item.description}
                categoryTransaction={getCategories(item)[item.category].label}
                value={item.value}
                date={{day: item.day, month: item.month, year: item.year}}
                status={getTransactionStatus(item.status)}
                type={item.type}
              />
            )}
            keyExtractor={item => item.id.toString()}
          /> */}
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
