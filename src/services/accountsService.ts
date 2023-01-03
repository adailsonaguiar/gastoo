import {
  closeRealmInstance,
  handleRealmInstance,
  loadData,
  writeData,
} from '../database/realm';
import {SCHEMAS} from '../database/schemas';
import {Account} from '../models/Accounts';
import {showAlertError} from './alertService';

export async function fetchAccounts(
  filter?: string,
  externalRealmInstance?: Realm,
) {
  let realm = await handleRealmInstance(externalRealmInstance);
  const response = await loadData({schema: SCHEMAS.ACCOUNT, realm, filter});
  if (response) {
    return response as Account[];
  }
  closeRealmInstance(realm, externalRealmInstance);
}

export async function getTransactionAccount(
  accountId: string,
  localRealmInstance: Realm,
) {
  const transactionAccount = await fetchAccounts(
    `_id = '${accountId}'`,
    localRealmInstance,
  );
  if (transactionAccount?.length) {
    return transactionAccount[0];
  }
  return null;
}

export async function saveAccount(
  account: Account,
  externalRealmInstance?: Realm,
) {
  let realm = await handleRealmInstance(externalRealmInstance);
  await writeData({schema: SCHEMAS.ACCOUNT, data: account, realm});
  closeRealmInstance(realm, externalRealmInstance);
}

export function handleAccountBalance(
  account: Account,
  valueToUpdate: number,
  realmInstance: Realm,
) {
  if ((account && valueToUpdate > 0) || (account && valueToUpdate < 0)) {
    account.balance = account.balance + valueToUpdate;
    if (account.balance >= 0) {
      saveAccount(account, realmInstance);
    } else {
      showAlertError('Saldo da conta não pode ser menor que zero.');
      throw new Error('Saldo da conta não pode ser menor que zero.');
    }
  }
}
