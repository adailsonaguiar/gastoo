import {fetchTransactions} from '../services/transactionsService';
import {fetchAccounts} from '../services/accountsService';
import Realm from 'realm';

export function useExportData(realm: Realm | null) {
  function getAllData() {
    const transactions = fetchTransactions({realm});
    const accounts = fetchAccounts({realm});
    let data = {transactions: {}, accounts: {}};
    if (transactions) {
      data.transactions = transactions;
    }
    if (accounts) {
      data.accounts = accounts;
    }
    return {
      accounts: data.accounts,
      transactions: data.transactions,
    };
  }

  return {getAllData};
}
