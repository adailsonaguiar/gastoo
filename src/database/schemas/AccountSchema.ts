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
    test1: 'string?',
  },
  primaryKey: '_id',
};

export default AccountSchema;
