import React from 'react';
import FlashMessage from 'react-native-flash-message';
import {LogBox, PermissionsAndroid, StatusBar} from 'react-native';
import Routes from './routes';
import 'react-native-gesture-handler';
import styled from 'styled-components/native';

import {
  fetchTransactions,
  saveTransaction,
} from './services/transactionsService';
import {handleRealmInstance} from './database/realm';
import {saveAccount} from './services/accountsService';
import {Account} from './models/Accounts';
import {Transaction} from './models/transaction';
import {reatDataFileBackup} from './services/csvFileService';

const Cotainer = styled.SafeAreaView`
  flex: 1;
`;

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
  'Node of type rule not supported as an inline style',
  'Warning: componentWillReceiveProps has been renamed, and is not recommended for use',
]);

const App = () => {
  return (
    <Cotainer>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Routes />
      <FlashMessage />
    </Cotainer>
  );
};

export default App;
