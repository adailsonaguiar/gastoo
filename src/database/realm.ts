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

export const loadData = async (props: {realm: Realm; schema: string; filter?: string; sort?: string}) => {
  try {
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
  } catch (error) {
    throw error;
  }
};

export const writeData = async (props: {realm: Realm; schema: string; data: any}) => {
  try {
    return props.realm.write(() => {
      props.realm.create(props.schema, props.data, true);
    });
  } catch (error) {
    throw error;
  }
};

export const removeById = async (props: {realm: Realm; schema: string; id: string}) => {
  try {
    props.realm.write(() => {
      const data = props.realm.objectForPrimaryKey(props.schema, props.id);
      props.realm.delete(data);
    });
  } catch (error) {
    throw error;
  }
};

export async function handleRealmInstance(externalRealmInstance?: Realm) {
  if (externalRealmInstance) {
    return externalRealmInstance;
  } else {
    return await getRealm();
  }
}

export async function closeRealmInstance(localInstance: Realm, externalRealmInstance?: Realm) {
  if (!externalRealmInstance) {
    localInstance.close();
  }
}
