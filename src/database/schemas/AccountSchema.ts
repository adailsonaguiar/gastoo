import {SCHEMAS} from '.';

const AccountSchema = {
  name: SCHEMAS.ACCOUNT,
  properties: {
    _id: 'string',
    day: 'string',
    month: 'string',
    year: 'string',
    description: 'string',
    balance: 'int',
    color: 'string?',
    createdAt: 'date?',
    type: 'int?',
  },
  primaryKey: '_id',
};

export default AccountSchema;
