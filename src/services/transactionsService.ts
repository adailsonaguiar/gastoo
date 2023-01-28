import {closeRealmInstance, getRealm, handleRealmInstance, loadData, removeById, writeData} from '../database/realm';
import {SCHEMAS} from '../database/schemas';
import {Transaction} from '../models/transaction';
import {getTransactionAccount, handleAccountBalance} from './accountsService';
import {transactionType} from '../database/schemas/TransactionSchema';
import {isFuture} from 'date-fns';

export async function fetchTransactions(props: {filter?: string; realm: Realm | null}) {
  console.log('started+fetchTransactions', new Date());

  const response = await loadData({
    schema: SCHEMAS.TRANSACTION,
    realm: props.realm,
    filter: props.filter,
    sort: 'date',
  });
  console.log('finish+fetchTransactions...', new Date());

  if (response) {
    return response as Transaction[];
  }
}

function calculateAccountBalance(props: {
  transactionType: string;
  valueType: number;
  initialValue: number;
  accountBalance: number;
}) {
  if (props.transactionType === transactionType.TRANSACTION_OUT) {
    if (props.valueType === 0) {
      return props.accountBalance + props.initialValue || 0;
    } else {
      return props.accountBalance + +props.initialValue + props.valueType || 0;
    }
  } else {
    if (props.valueType === 0) {
      return props.accountBalance - props.initialValue || 0;
    } else {
      return props.accountBalance - props.initialValue + props.valueType || 0;
    }
  }
}

export async function saveTransaction(transaction: Transaction, externalRealmInstance?: Realm) {
  let realm = await handleRealmInstance(externalRealmInstance);
  try {
    const account = await getTransactionAccount(transaction.accountId, realm);
    if (account && !isFuture(transaction.date)) {
      const value = calculateAccountBalance({
        accountBalance: account.balance,
        initialValue: transaction.initialValue,
        transactionType: transaction.type,
        valueType: transaction.valueType,
      });
      await handleAccountBalance(account, value, realm);
    }
    await writeData({
      schema: SCHEMAS.TRANSACTION,
      realm,
      data: transaction,
    });
    closeRealmInstance(realm, externalRealmInstance);
  } catch (error) {
    console.error(error);
    closeRealmInstance(realm, externalRealmInstance);
  }
}

export async function deleteTransaction(transaction: Transaction, externalRealmInstance?: Realm) {
  let realm = await handleRealmInstance(externalRealmInstance);
  const account = await getTransactionAccount(transaction.accountId, realm);
  if (account) {
    const value = calculateAccountBalance({
      accountBalance: account.balance,
      initialValue: transaction.initialValue,
      transactionType: transaction.type,
      valueType: transaction.valueType,
    });
    await handleAccountBalance(account, value, realm);
  }
  removeById({id: transaction._id, schema: SCHEMAS.TRANSACTION, realm});
  closeRealmInstance(realm, externalRealmInstance);
}
