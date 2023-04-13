import {Alert} from 'react-native';
import React from 'react';
import uuid from 'react-native-uuid';
import Realm from 'realm';

import {Account} from '../../../../models/Accounts';
import {AccountCategories} from '../../../../utils/categoriesAccounts';
import {showAlertError} from '../../../../services/alertService';
import {deleteAccount, saveAccount} from '../../../../services/accountsService';
import {fetchTransactions} from '../../../../services/transactionsService';

type AccountFormProps = {} & Account;

const INITIAL_ACCOUNT_PROPS: AccountFormProps = {
  _id: '',
  description: '',
  balance: 0,
  day: '',
  month: '',
  year: '',
  color: '',
  createdAt: new Date(),
  type: AccountCategories.CONTA_CORRENTE,
};

export const AccountFormViewModel = (realm: Realm | null, onFishInteration: () => void, accountItem?: Account) => {
  const [loading, setLoading] = React.useState(false);

  const currentAccount: AccountFormProps = accountItem
    ? {
        _id: accountItem._id,
        description: accountItem.description,
        balance: accountItem.balance,
        day: accountItem.day,
        month: accountItem.month,
        year: accountItem.year,
        color: accountItem.color,
        createdAt: new Date(),
        type: accountItem?.type,
      }
    : INITIAL_ACCOUNT_PROPS;

  function validateForm(values: AccountFormProps) {
    if (!values.description.length) {
      showAlertError('Digite uma descrição!');
      return false;
    }
    if (!values.type) {
      showAlertError('Selecione um tipo de conta.');
      return false;
    }
    return true;
  }

  const handleDeleteAccount = async (account: Account) => {
    setLoading(true);
    await deleteAccount(account, realm);
    onFishInteration();
    setLoading(false);
  };

  async function askDelection(account: Account) {
    const transactionsAssociate = await verifyTransactionsAsociate(account._id);
    if (transactionsAssociate) {
      showAlertError('Você não pode remover essa conta, ela ainda contém transações');
    } else {
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
  }

  async function verifyTransactionsAsociate(id: string) {
    const data = fetchTransactions({filter: `accountId = '${id}'`, realm});
    if (data?.length) {
      return true;
    }
    return false;
  }

  async function saveAccountBd(values: AccountFormProps) {
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
      accountToSave.type = values.type;
      accountToSave.balance = values.balance;

      await saveAccount(accountToSave, realm);
      onFishInteration();
    }
    setLoading(false);
  }

  async function onSubmit(values: AccountFormProps) {
    if (currentAccount._id) {
      await saveAccountBd(values);
    } else {
      await saveAccountBd(values);
    }
  }

  return {loading, currentAccount, askDelection, onSubmit};
};
