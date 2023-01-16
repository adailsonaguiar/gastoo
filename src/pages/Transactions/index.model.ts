import {useFocusEffect} from '@react-navigation/native';
import React from 'react';
import {transactionType} from '../../database/schemas/TransactionSchema';
import {Transaction} from '../../models/transaction';
import {fetchTransactions} from '../../services/transactionsService';
import {useDate} from '../../store/date';

export function TransactionsModel() {
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const [totalsMonth, setTotalsMonth] = React.useState({
    totalIncome: 0,
    totalExpense: 0,
  });
  const {month, year} = useDate(state => state);
  async function getAllTransactionsData(items: Transaction[]) {
    const totalValues = {totalIncome: 0, totalExpense: 0};
    items.map(transaction => {
      if (transaction.type === transactionType.TRANSACTION_OUT) {
        totalValues.totalExpense = totalValues.totalExpense + transaction.value;
      }
      if (transaction.type === transactionType.TRANSACTION_IN) {
        totalValues.totalIncome = totalValues.totalIncome + transaction.value;
      }
    });
    setTotalsMonth(totalValues);
  }

  async function getTransactions(props?: {
    month: number;
    year: number;
    realmInstance?: Realm;
  }) {
    const response = await fetchTransactions(
      `month = "${props?.month}" AND year = "${props?.year}"`,
      props?.realmInstance,
    );

    if (response?.length) {
      getAllTransactionsData(response);
      setTransactions(response);
    } else {
      setTransactions([]);
      setTotalsMonth({
        totalIncome: 0,
        totalExpense: 0,
      });
    }
  }

  React.useEffect(() => {
    getTransactions({month: month + 1, year});
  }, [month]);

  return {transactions, getTransactions, totalsMonth};
}
