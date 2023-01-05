import {useFocusEffect} from '@react-navigation/native';
import React from 'react';
import {Transaction} from '../../models/transaction';
import {fetchTransactions} from '../../services/transactionsService';

export function TransactionsModel() {
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const getCurrentDate = () => {
    const date = new Date();
    return {month: date.getMonth() + 1, year: date.getFullYear()};
  };

  async function getTransactions(props?: {month: number; year: number}) {
    const {month, year} = getCurrentDate();
    const response = await fetchTransactions(
      `month = "${props?.month || month}" AND year = "${props?.year || year}"`,
    );

    if (response?.length) {
      setTransactions(response);
    } else {
      setTransactions([]);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      getTransactions();
    }, []),
  );

  return {transactions, getTransactions};
}
