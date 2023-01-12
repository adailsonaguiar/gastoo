import {fetchTransactions} from '../services/transactionsService';
import {fetchAccounts} from '../services/accountsService';
import {handleRealmInstance} from '../database/realm';

export function useExportData() {
  async function getAllData() {
    const realm = await handleRealmInstance();
    const transactions = await fetchTransactions(undefined, realm);
    const accounts = await fetchAccounts(undefined, realm);
    let data = {transactions: {}, accounts: {}};
    if (transactions) {
      data.transactions = transactions;
    }
    if (accounts) {
      data.accounts = accounts;
    }
    return [data.accounts, data.transactions];
  }

  return {getAllData};
}
