import {FlatList} from 'react-native';

import {Transaction} from '../../models/transaction';
import {pages} from '../../routes';
import {getTransactionStatus} from '../../utils/FunctionUtils';
import CardTransaction from '../CardTransaction';
import {Account} from '../../models/Accounts';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Nav} from '../../models/useNavigation.model';
import ExpenseIcon from '../TransactionTypeIcon';
import {transactionType} from '../../database/schemas/TransactionSchema';

type TransactionListProps = {
  transactions: Transaction[];
  accounts: Account[];
};

export function TransactionsList({transactions, accounts = []}: TransactionListProps) {
  function getAccountById(accountId: string) {
    return accounts.find(item => item._id === accountId)?.description || '';
  }

  const navigation = useNavigation<Nav>();

  return (
    <>
      <FlatList
        data={transactions}
        renderItem={({item}) => (
          <>
            <CardTransaction
              iconLeft={<ExpenseIcon type={item.type} categoryCode={Number(item.category)} />}
              transactionTitle={item.description}
              categoryTransaction={getAccountById(item.accountId)}
              value={item.value}
              date={{day: item.day, month: item.month, year: item.year}}
              status={getTransactionStatus(item.status)}
              type={item.type}
              transactionStatus={item.status}
              onClickItem={() =>
                navigation.navigate(pages.transactionForm, {
                  transaction: item,
                  formType: item.type === transactionType.TRANSACTION_IN ? true : false,
                })
              }
            />
          </>
        )}
        keyExtractor={item => item._id}
      />
    </>
  );
}
