import {getRealm, loadData, writeData} from '../database/realm';
import {SCHEMAS} from '../database/schemas';
import {Transaction} from '../models/transaction';
import {getTransactionAccount, handleAccountBalance} from './accountsService';

export async function fetchTransactions(filter?: string) {
  const realm = await getRealm();
  const response = await loadData({schema: SCHEMAS.TRANSACTION, realm, filter});
  if (response) {
    return response as Transaction[];
  }
  realm.close();
}

export async function saveTransaction(transaction: Transaction) {
  const realm = await getRealm();
  try {
    const account = await getTransactionAccount(transaction.accountId, realm);
    if (account) {
      handleAccountBalance(account, transaction.valueType, realm);
    }
    await writeData({
      schema: SCHEMAS.TRANSACTION,
      realm,
      data: transaction,
    });
    realm.close();
  } catch (error) {
    console.error(error);
  }
}
