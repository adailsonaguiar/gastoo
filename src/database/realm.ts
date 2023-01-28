import Realm from 'realm';
import AccountSchema from './schemas/AccountSchema';

import {TransactionSchema} from './schemas/TransactionSchema';

export const getRealm = async () => {
  return await Realm.open({
    path: 'gastoo',
    schema: [TransactionSchema, AccountSchema],
    schemaVersion: 5,
  });
};

export const getId = async (schema: string) => {
  const realm = await getRealm();
  try {
    const maxId = realm.objects(schema).max('id');
    if (!maxId) {
      return 0;
    }
    return maxId;
  } catch (error) {
    throw error;
  } finally {
    realm.close();
  }
};

export const loadData = (props: {realm: Realm | null; schema: string; filter?: string; sort?: string}) => {
  try {
    if (props.realm) {
      let response = null;
      if (!props.filter?.length) {
        response = props.realm.objects(props.schema).toJSON();
      }
      if (props.filter?.length) {
        response = props.realm
          .objects(props.schema)
          .filtered(props.filter)
          .sorted(props.sort || 'createdAt', true)
          .toJSON();
      }
      return response;
    }
  } catch (error) {
    throw error;
  }
};

export const writeData = (props: {realm: Realm | null; schema: string; data: any}) => {
  try {
    if (props.realm) {
      return props.realm.write(() => {
        props.realm.create(props.schema, props.data, true);
      });
    }
  } catch (error) {
    throw error;
  }
};

export const removeById = (props: {realm: Realm | null; schema: string; id: string}) => {
  try {
    if (props.realm) {
      props.realm.write(() => {
        const data = props.realm.objectForPrimaryKey(props.schema, props.id);
        props.realm.delete(data);
      });
    }
  } catch (error) {
    throw error;
  }
};
