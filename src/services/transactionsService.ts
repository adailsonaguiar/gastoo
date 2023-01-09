import {
  closeRealmInstance,
  getRealm,
  handleRealmInstance,
  loadData,
  removeById,
  writeData,
} from '../database/realm';
import {SCHEMAS} from '../database/schemas';
import {Transaction} from '../models/transaction';
import {getTransactionAccount, handleAccountBalance} from './accountsService';
import {transactionType} from '../database/schemas/TransactionSchema';

export async function fetchTransactions(
  filter?: string,
  externalRealmInstance?: Realm,
) {
  let realm = await handleRealmInstance(externalRealmInstance);
  const response = await loadData({
    schema: SCHEMAS.TRANSACTION,
    realm,
    filter,
    sort: 'date',
  });
  if (response) {
    return response as Transaction[];
  }
  closeRealmInstance(realm, externalRealmInstance);
}

function calculateAccountBalance(props: {
  transactionType: string;
  valueType: number;
  initialValue: number;
  accountBalance: number;
}) {
  if (props.transactionType === transactionType.TRANSACTION_OUT) {
    if (props.valueType === 0) {
      return props.accountBalance + props.initialValue;
    } else {
      return props.accountBalance + +props.initialValue + props.valueType;
    }
  } else {
    if (props.valueType === 0) {
      return props.accountBalance - props.initialValue;
    } else {
      return props.accountBalance - props.initialValue + props.valueType;
    }
  }
}

export async function saveTransaction(transaction: Transaction) {
  const realm = await getRealm();
  try {
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

export async function deleteTransaction(
  transaction: Transaction,
  externalRealmInstance?: Realm,
) {
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
