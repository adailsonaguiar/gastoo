import {FlatList} from 'react-native';
import styled from 'styled-components/native';
import {transactionType} from '../../database/schemas/TransactionSchema';
import {Transaction} from '../../models/transaction';
import {pages} from '../../routes';
import {getTransactionStatus} from '../../utils/FunctionUtils';
import CardTransaction from '../CardTransaction';
import carIcon from '../../assets/categories/Car.png';
import dollarIcon from '../../assets/categories/dollar.png';
import forkIcon from '../../assets/categories/forkknife.png';
import toolIcon from '../../assets/categories/tool.png';
import {Account} from '../../models/Accounts';
import React from 'react';

type TransactionListProps = {
  transactions: Transaction[];
  accounts: Account[];
};

const TransactionIcon = styled.Image``;

export function TransactionsList({transactions, accounts = []}: TransactionListProps) {
  function getIconByCategory(categoryCode: number, type: string) {
    if (type === transactionType.TRANSACTION_OUT) {
      switch (categoryCode) {
        case 1:
          return forkIcon;
        case 3:
          return toolIcon;
        case 2:
          return carIcon;
        case 8:
          return dollarIcon;
        default:
          return dollarIcon;
      }
    }
    return dollarIcon;
  }

  function getAccountById(accountId: string) {
    return accounts.find(item => item._id === accountId)?.description || '';
  }

  return (
    <>
      <FlatList
        data={transactions}
        renderItem={({item}) => (
          <>
            <CardTransaction
              routeParameters={{
                transaction: item,
                date: {day: item.day, month: item.month, year: item.year},
                formType: item.type === transactionType.TRANSACTION_IN,
              }}
              iconLeft={<TransactionIcon source={getIconByCategory(Number(item.category), item.type)} />}
              transactionTitle={item.description}
              // categoryTransaction={getCategories(item)[item.category].label}
              categoryTransaction={getAccountById(item.accountId)}
              value={item.value}
              date={{day: item.day, month: item.month, year: item.year}}
              status={getTransactionStatus(item.status)}
              type={item.type}
              screenNavigate={pages.transactionForm}
              transactionStatus={item.status}
            />
          </>
        )}
        keyExtractor={item => item._id}
      />
    </>
  );
}
