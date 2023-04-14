import {loadData, removeById, writeData} from '../database/realm';
import {SCHEMAS} from '../database/schemas';
import {Transaction} from '../models/transaction';
import {getTransactionAccount, handleAccountBalance} from './accountsService';
import {transactionType} from '../database/schemas/TransactionSchema';
import {isFuture} from 'date-fns';

export function fetchTransactions(props: {filter?: string; realm: Realm | null}) {
  const response = loadData({
    schema: SCHEMAS.TRANSACTION,
    realm: props.realm,
    filter: props.filter,
    sort: 'date',
  });

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

async function updateAccountTransactionBalance(transaction: Transaction, realm: Realm | null) {
  const account = await getTransactionAccount({accountId: transaction.accountId, realm});

  const formattedDate = new Date(transaction.date.toISOString().split('T')[0]);
  if (account && !isFuture(formattedDate)) {
    const value = calculateAccountBalance({
      accountBalance: account.balance,
      initialValue: transaction.initialValue,
      transactionType: transaction.type,
      valueType: transaction.valueType,
    });

    handleAccountBalance(account, value, realm);
  }
}

export async function saveTransaction(transaction: Transaction, realm: Realm | null, isBackup?: boolean) {
  try {
    if (!isBackup) {
      updateAccountTransactionBalance(transaction, realm);
    }

    writeData({
      schema: SCHEMAS.TRANSACTION,
      realm,
      data: transaction,
    });
  } catch (error) {
    console.error(error);
  }
}

export async function deleteTransaction(transaction: Transaction, realm: Realm | null) {
  const account = await getTransactionAccount({accountId: transaction.accountId, realm});
  if (account) {
    const value = calculateAccountBalance({
      accountBalance: account.balance,
      initialValue: transaction.initialValue,
      transactionType: transaction.type,
      valueType: transaction.valueType,
    });
    handleAccountBalance(account, value, realm);
  }
  removeById({id: transaction._id, schema: SCHEMAS.TRANSACTION, realm});
}
