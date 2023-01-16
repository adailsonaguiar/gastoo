import {SCHEMAS} from '.';

export const TransactionSchema = {
  name: SCHEMAS.TRANSACTION,
  properties: {
    _id: 'string',
    description: 'string',
    value: 'int',
    valueType: 'int',
    day: 'string',
    month: 'string',
    year: 'string',
    type: 'string',
    accountId: 'string',
    status: 'int',
    category: 'int',
    createdAt: 'date',
    date: 'date?',
    recurrence: 'bool?',
  },
  primaryKey: '_id',
};

export const transactionType = {
  TRANSACTION_IN: 'TRANSACTION_IN',
  TRANSACTION_OUT: 'TRANSACTION_OUT',
};
