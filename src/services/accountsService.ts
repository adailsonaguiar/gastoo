import {loadData, removeById, writeData} from '../database/realm';
import {SCHEMAS} from '../database/schemas';
import {Account} from '../models/Accounts';
import {showAlertError} from './alertService';

export async function fetchAccounts(props: {filter?: string; realm: Realm | null}) {
  const response = await loadData({schema: SCHEMAS.ACCOUNT, ...props});
  return response as Account[];
}

export async function getTransactionAccount(props: {accountId: string; realm: Realm | null}) {
  const transactionAccount = await fetchAccounts({filter: `_id = '${props.accountId}'`, realm: props.realm});
  if (transactionAccount?.length) {
    return transactionAccount[0];
  }
  return null;
}

export async function saveAccount(account: Account, realm: Realm | null) {
  writeData({schema: SCHEMAS.ACCOUNT, data: account, realm});
}

export function handleAccountBalance(account: Account, valueToUpdate: number, realmInstance: Realm | null) {
  account.balance = valueToUpdate;
  if (account.balance >= 0) {
    saveAccount(account, realmInstance);
  } else {
    showAlertError('Saldo da conta não pode ser menor que zero.');
    throw new Error('Saldo da conta não pode ser menor que zero.');
  }
}

export async function deleteAccount(account: Account, realm: Realm | null) {
  const data = loadData({
    schema: SCHEMAS.TRANSACTION,
    filter: `accountId = '${account._id}'`,
    realm,
  });
  if (data?.length) {
    showAlertError('Você não pode remover essa conta, ela ainda contém transações');
  } else {
    removeById({id: account._id, schema: SCHEMAS.ACCOUNT, realm});
  }
}
