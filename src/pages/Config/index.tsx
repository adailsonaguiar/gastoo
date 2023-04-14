import React from 'react';
import Header from '../../components/Header';
import IconFt from 'react-native-vector-icons/FontAwesome';

import {version} from '../../../package.json';

import * as S from './styles';
import {exportDataToExcel, reatDataFileBackup} from '../../services/csvFileService';
import {PermissionsAndroid} from 'react-native';
import {useExportData} from '../../hooks/useExportData';
import {fetchTransactions, saveTransaction} from '../../services/transactionsService';
import {Account} from '../../models/Accounts';
import {Transaction} from '../../models/transaction';
import {getTransactionAccount, handleAccountBalance, saveAccount} from '../../services/accountsService';
import {useRealm} from '../../store/realm';

// import databackup from '../../../gastoo_data_backup.json';
import {transactionType} from '../../database/schemas/TransactionSchema';

type ConfigProps = {
  navigation: any;
};

export const Config = ({navigation}: ConfigProps) => {
  const {realm} = useRealm();

  const {getAllData} = useExportData(realm);

  const handleClick = async () => {
    const dataToExport = getAllData();
    try {
      let isPermitedExternalStorage = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );

      if (!isPermitedExternalStorage) {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          exportDataToExcel(dataToExport);
        }
      } else {
        exportDataToExcel(dataToExport);
      }
    } catch (e) {
      console.log(e);
      return;
    }
  };

  async function handleBackup(backup: {accounts: Account[]; transactions: Transaction[]}) {
    const response = fetchTransactions({realm});

    if (!response?.length) {
      console.log('...backup started');
      const accountPromises = [] as Promise<void>[];
      const transactionPromises = [] as Promise<void>[];
      backup.accounts.map(async account => {
        const accountToSave = {
          ...account,
          createdAt: new Date(account.createdAt),
          balance: 0,
        } as Account;
        const createPromise = async () => await saveAccount(accountToSave, realm);
        accountPromises.push(createPromise());
      });

      backup.transactions.map(async transaction => {
        if (transaction.type === transactionType.TRANSACTION_IN) {
          const transactionToSave = {
            ...transaction,
            createdAt: new Date(transaction.createdAt),
            date: new Date(transaction.date),
          } as Transaction;

          const createPromise = async () => saveTransaction(transactionToSave, realm, true);

          transactionPromises.push(createPromise());
        }
      });

      backup.transactions.map(async transaction => {
        if (transaction.type === transactionType.TRANSACTION_OUT) {
          const transactionToSave = {
            ...transaction,
            createdAt: new Date(transaction.createdAt),
            date: new Date(transaction.date),
          } as Transaction;

          const createPromise = async () => saveTransaction(transactionToSave, realm, true);

          transactionPromises.push(createPromise());
        }
      });

      //  update accounts balance
      let accountsBalance = [] as {id: string; balance: number}[];

      const transactions = fetchTransactions({realm});

      transactions?.map(item => {
        // FIND BY ACCOUNT ID
        const transactionAccount = accountsBalance.find(account => account.id === item.accountId);
        if (transactionAccount) {
          //  REMOVE ACCOUNT FOUNDED OF A LIST
          accountsBalance = accountsBalance?.filter(account => account.id !== transactionAccount.id);

          //  CONCAT VALUE BALANCE OF ACCOUNT
          transactionAccount.balance += item.valueType;

          //  ADD ACCOUNT BALANCE WITH NEW VALUE
          accountsBalance.push(transactionAccount);
        } else {
          accountsBalance.push({id: item.accountId, balance: item.valueType});
        }
      });

      accountsBalance.map(async item => {
        const account = await getTransactionAccount({accountId: item.id, realm});
        if (account) {
          handleAccountBalance(account, item.balance, realm);
        }
      });

      await Promise.all(accountPromises);
      await Promise.all(transactionPromises);
    }
    console.log('...backup finished');
  }

  async function handleImportData() {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, {
        title: 'Cool Photo App Camera Permission',
        message: 'Your app needs permission.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      });
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const file = JSON.parse(await reatDataFileBackup());
        // const file = databackup;
        handleBackup(
          file as unknown as {
            accounts: Account[];
            transactions: Transaction[];
          },
        );

        return true;
      } else {
        console.log('Camera permission denied');
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
  return (
    <S.Container>
      <Header title="Configurações" onClose={() => navigation.goBack()} />
      <S.MenuWrapper>
        <S.SelectOption onPress={() => handleClick()}>
          <S.LabelOption>Exportar dados</S.LabelOption>
          <IconFt size={20} name="angle-right" />
        </S.SelectOption>
        <S.SelectOption onPress={() => handleImportData()}>
          <S.LabelOption>Importar dados</S.LabelOption>
          <IconFt size={20} name="angle-right" />
        </S.SelectOption>
      </S.MenuWrapper>
      <S.Footer>
        <S.LabelOption>v {version}</S.LabelOption>
      </S.Footer>
    </S.Container>
  );
};
