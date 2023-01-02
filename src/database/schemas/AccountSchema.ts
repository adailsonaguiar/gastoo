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
  },
  primaryKey: '_id',
};

export default AccountSchema;
