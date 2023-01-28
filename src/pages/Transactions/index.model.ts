import {useFocusEffect} from '@react-navigation/native';
import React from 'react';
import {loadData} from '../../database/realm';
import {SCHEMAS} from '../../database/schemas';
import {transactionType} from '../../database/schemas/TransactionSchema';
import {Transaction} from '../../models/transaction';
import {fetchTransactions} from '../../services/transactionsService';
import {useDate} from '../../store/date';

export function TransactionsModel({realm}: {realm: Realm | null}) {
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const [loading, setLoading] = React.useState(false);
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

  async function getTransactions(props?: {month: number; year: number}) {
    const response = fetchTransactions({filter: `month = "${props?.month}" AND year = "${props?.year}"`, realm});

    if (response?.length) {
      setTransactions(response);
      getAllTransactionsData(response);
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

  return {transactions, getTransactions, totalsMonth, loading};
}
