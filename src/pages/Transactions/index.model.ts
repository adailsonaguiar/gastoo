import {useFocusEffect} from '@react-navigation/native';
import React from 'react';
import {transactionType} from '../../database/schemas/TransactionSchema';
import {Transaction} from '../../models/transaction';
import {fetchTransactions} from '../../services/transactionsService';

export function TransactionsModel() {
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const [totalsMonth, setTotalsMonth] = React.useState({
    totalIncome: 0,
    totalExpense: 0,
  });
  const getCurrentDate = () => {
    const date = new Date();
    return {month: date.getMonth() + 1, year: date.getFullYear()};
  };

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
    month?: number;
    year?: number;
    realmInstance?: Realm;
  }) {
    const {month, year} = getCurrentDate();
    const response = await fetchTransactions(
      `month = "${props?.month || month}" AND year = "${props?.year || year}"`,
      props?.realmInstance,
    );

    if (response?.length) {
      getAllTransactionsData(response);
      setTransactions(response);
    } else {
      setTransactions([]);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      if (!transactions.length) {
        getTransactions();
      }
    }, []),
  );

  return {transactions, getTransactions, totalsMonth};
}
