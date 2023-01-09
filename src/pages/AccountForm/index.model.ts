import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {Alert} from 'react-native';
import React from 'react';
import uuid from 'react-native-uuid';

import {getRealm} from '../../database/realm';
import {Account} from '../../models/Accounts';
import {showAlertError} from '../../services/alertService';
import {deleteAccount, saveAccount} from '../../services/accountsService';
import {fetchTransactions} from '../../services/transactionsService';

type AccountFormProps = {
  initialBalance: number;
} & Account;

type AccountFormRouteProps = {
  props: {
    formType: string;
    account?: Account;
  };
};

type RouterProps = RouteProp<AccountFormRouteProps, 'props'>;

export const AccountFormViewModel = () => {
  const navigation = useNavigation();
  const {params} = useRoute<RouterProps>();
  const accountItem = (params?.account as Account) || null;
  const [loading, setLoading] = React.useState(false);

  const currentAccount: AccountFormProps = {
    _id: accountItem ? accountItem._id : '',
    description: accountItem ? accountItem.description : '',
    balance: accountItem ? accountItem.balance / 100 : 0,
    initialBalance: accountItem ? accountItem.balance / 100 : 0,
    day: accountItem?.day || '',
    month: accountItem?.month || '',
    year: accountItem?.year || '',
    color: accountItem?.color || '',
    createdAt: new Date(),
  };

  function validateForm(values: AccountFormProps) {
    if (!values.description.length) {
      showAlertError('Digite uma descrição!');
      return false;
    }
    return true;
  }

  const handleDeleteAccount = async (account: Account) => {
    setLoading(true);
    await deleteAccount(account);
    navigation.goBack();
    setLoading(false);
  };

  async function askDelection(account: Account) {
    Alert.alert(
      'Atenção',
      'Deseja realmente deletar essa conta?',
      [
        {
          text: 'Cancelar',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Sim',
          onPress: () => {
            handleDeleteAccount(account);
          },
        },
      ],
      {cancelable: false, userInterfaceStyle: 'dark'},
    );
  }

  async function verifyTransactionsAsociate(id: string, realm: Realm) {
    const data = await fetchTransactions(`accountId = '${id}'`, realm);
    if (data?.length) {
      return true;
    }
    return false;
  }

  async function saveAccountBd(values: AccountFormProps, realm: Realm) {
    setLoading(true);
    if (validateForm(values)) {
      const accountToSave = {_id: values._id} as Account;
      if (!currentAccount._id) {
        accountToSave._id = String(uuid.v4());
      }
      accountToSave.balance = 0;
      const date = new Date();
      accountToSave.day = String(date.getDate());
      accountToSave.month = String(date.getMonth() + 1);
      accountToSave.year = String(date.getFullYear());
      accountToSave.description = values.description;
      accountToSave.color = values.color;
      accountToSave.createdAt = values.createdAt;
      await saveAccount(accountToSave, realm);
      navigation.goBack();
    }
    setLoading(false);
  }

  async function onSubmit(values: AccountFormProps) {
    const realm = await getRealm();
    if (currentAccount._id) {
      const transactionsAssociate = await verifyTransactionsAsociate(
        values._id,
        realm,
      );
      if (transactionsAssociate) {
        showAlertError(
          'Você não pode editar essa conta, ela ainda contém transações',
        );
      } else {
        await saveAccountBd(values, realm);
      }
    } else {
      await saveAccountBd(values, realm);
    }
  }

  return {loading, currentAccount, askDelection, onSubmit};
};
