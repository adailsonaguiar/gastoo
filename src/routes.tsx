import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Dash} from './pages/Dash';
import Accounts from './pages/Accounts';
import AccountForm from './pages/AccountForm';
import TransactionForm from './pages/TransactionForm';
import Transactions from './pages/Transactions';

export const pages = {
  dash: 'Dash',
  accounts: 'Accounts',
  accountForm: 'AccountForm',
  transactions: 'Transactions',
  transactionForm: 'transactionForm',
};

const Stack = createNativeStackNavigator();

export default () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Dash">
        <Stack.Screen name={pages.dash} component={Dash} />
        <Stack.Screen name={pages.accounts} component={Accounts} />
        <Stack.Screen name={pages.accountForm} component={AccountForm} />
        <Stack.Screen
          name={pages.transactionForm}
          component={TransactionForm}
        />
        <Stack.Screen name={pages.transactions} component={Transactions} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
