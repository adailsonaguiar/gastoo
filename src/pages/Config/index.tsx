import React from 'react';
import Header from '../../components/Header';
import ArrowRightIcon from '../../assets/arrow-right-blue.png';
import {version} from '../../../package.json';

import * as S from './styles';
import {
  exportDataToExcel,
  reatDataFileBackup,
} from '../../services/csvFileService';
import {PermissionsAndroid} from 'react-native';
import {useExportData} from '../../hooks/useExportData';
import {handleRealmInstance} from '../../database/realm';
import {
  fetchTransactions,
  saveTransaction,
} from '../../services/transactionsService';
import {Account} from '../../models/Accounts';
import {Transaction} from '../../models/transaction';
import {saveAccount} from '../../services/accountsService';

type ConfigProps = {
  navigation: any;
};

export const Config = ({navigation}: ConfigProps) => {
  const {getAllData} = useExportData();

  const handleClick = async () => {
    const dataToExport = await getAllData();
    try {
      let isPermitedExternalStorage = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );

      if (!isPermitedExternalStorage) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );

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

  async function handleBackup(backup: {
    accounts: Account[];
    transactions: Transaction[];
  }) {
    const realm = await handleRealmInstance();
    const response = await fetchTransactions('', realm);

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
        const createPromise = async () =>
          await saveAccount(accountToSave, realm);
        accountPromises.push(createPromise());
      });
      backup.transactions.map(async transaction => {
        const transactionToSave = {
          ...transaction,
          createdAt: new Date(transaction.createdAt),
          date: new Date(transaction.date),
          status: 0,
          valueType: 0,
        } as Transaction;
        const createPromise = async () =>
          await saveTransaction(transactionToSave, realm);
        transactionPromises.push(createPromise());
      });

      await Promise.all(accountPromises);
      await Promise.all(transactionPromises);
    }
    console.log('...backup finished');
    realm.close();
  }

  async function handleImportData() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Cool Photo App Camera Permission',
          message: 'Your app needs permission.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        const file = JSON.parse(await reatDataFileBackup());
        handleBackup(
          file as {
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
          <S.ChevRightIcon source={ArrowRightIcon} />
        </S.SelectOption>
        <S.SelectOption onPress={() => handleImportData()}>
          <S.LabelOption>Importar dados</S.LabelOption>
          <S.ChevRightIcon source={ArrowRightIcon} />
        </S.SelectOption>
      </S.MenuWrapper>
      <S.Footer>
        <S.LabelOption>v {version}</S.LabelOption>
      </S.Footer>
    </S.Container>
  );
};
