import {
  closeRealmInstance,
  handleRealmInstance,
  loadData,
  removeById,
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
    closeRealmInstance(realm, externalRealmInstance);
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

export async function handleAccountBalance(
  account: Account,
  valueToUpdate: number,
  realmInstance: Realm,
) {
  account.balance = valueToUpdate;
  if (account.balance >= 0) {
    await saveAccount(account, realmInstance);
  } else {
    showAlertError('Saldo da conta não pode ser menor que zero.');
    throw new Error('Saldo da conta não pode ser menor que zero.');
  }
}

export async function deleteAccount(
  account: Account,
  externalRealmInstance?: Realm,
) {
  let realm = await handleRealmInstance(externalRealmInstance);
  const data = await loadData({
    schema: SCHEMAS.TRANSACTION,
    filter: `accountId = '${account._id}'`,
    realm,
  });
  if (data?.length) {
    showAlertError(
      'Você não pode remover essa conta, ela ainda contém transações',
    );
  } else {
    removeById({id: account._id, schema: SCHEMAS.ACCOUNT, realm});
  }
  closeRealmInstance(realm, externalRealmInstance);
}
