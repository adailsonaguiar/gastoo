import React from 'react';
import {Transaction} from '../../models/transaction';
import {fetchTransactions} from '../../services/transactionsService';

export function TransactionsModel() {
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const getCurrentDate = () => {
    const date = new Date();
    return {month: date.getMonth() + 1, year: date.getFullYear()};
  };

  async function getTransactions() {
    const {month, year} = getCurrentDate();
    const response = await fetchTransactions(
      `month = "${month}" AND year = "${year}"`,
    );
    console.log(`month = "${month}" AND year = "${year}"`);

    if (response?.length) {
      setTransactions(response);
    }
  }

  React.useEffect(() => {
    getTransactions();
  }, []);

  return {transactions};
}
