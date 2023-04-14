import React from 'react';
import {transactionType} from '../../database/schemas/TransactionSchema';
import {Transaction} from '../../models/transaction';
import {fetchTransactions} from '../../services/transactionsService';
import {fetchAccounts} from '../../services/accountsService';
import {Account} from '../../models/Accounts';
import {AccountCategories} from '../../utils/categoriesAccounts';

export function TransactionsModel({realm}: {realm: Realm | null}) {
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const [accounts, setAccounts] = React.useState<Account[]>([]);

  const [totalsMonth, setTotalsMonth] = React.useState({
    totalIncome: 0,
    totalExpense: 0,
    totalInvestiment: 0,
    totalCurrent: 0,
  });

  async function getAccountValues(accountList: Account[]) {
    const totalValues = {totalInvestiment: 0, totalCurrent: 0};

    accountList.map(account => {
      if (account.type === AccountCategories.CONTA_CORRENTE) {
        totalValues.totalCurrent = totalValues.totalCurrent + account.balance;
      }
      if (account.type === AccountCategories.CONTA_INVESTIMENTO) {
        totalValues.totalInvestiment = totalValues.totalInvestiment + account.balance;
      }
    });

    setTotalsMonth({...totalsMonth, ...totalValues});
  }

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
    setTotalsMonth({...totalsMonth, ...totalValues});
  }

  async function getTransactions(props?: {month: number; year: number}) {
    const response = fetchTransactions({filter: `month = "${props?.month}" AND year = "${props?.year}"`, realm});
    if (response?.length) {
      setTransactions(response);
      getAllTransactionsData(response);
    } else {
      setTransactions([]);
      setTotalsMonth({
        ...totalsMonth,
        totalIncome: 0,
        totalExpense: 0,
      });
    }
  }

  async function getAccounts() {
    const response = await fetchAccounts({realm});
    if (response) {
      setAccounts(response);
      getAccountValues(response);
    }
  }

  return {transactions, getTransactions, totalsMonth, getAccounts, accounts};
}
