/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/react-in-jsx-scope */
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
import {format, isSameDay} from 'date-fns';

import * as S from './styles';

type TransactionListProps = {
  transactions: Transaction[];
  accounts: Account[];
};

const TransactionIcon = styled.Image``;

export function TransactionsListByDate({transactions, accounts = []}: TransactionListProps) {
  const [transactionsByDate, setTransactionsByDate] = React.useState<Transaction[][]>([]);
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

  React.useEffect(() => {
    const newtransactionsByDate = [] as Transaction[][];
    let foundedTransaction: Transaction | undefined;

    transactions.map(item => {
      newtransactionsByDate.map((transactionsOfDay, index) => {
        foundedTransaction = transactionsOfDay.find(td => isSameDay(td.date, item.date));
        if (foundedTransaction?._id) {
          newtransactionsByDate[index].push(foundedTransaction);
        }
      });

      if (!foundedTransaction?._id || !newtransactionsByDate.length) {
        newtransactionsByDate.push([item]);
      }
    });

    setTransactionsByDate(newtransactionsByDate);
  }, [transactions]);

  return (
    <>
      <S.List>
        {transactionsByDate.map((td, index) => (
          <S.DateSection key={td[0]._id + index}>
            <S.WrapperDate>
              <S.Date>{format(td[0].date, 'dd/MM')}</S.Date>
            </S.WrapperDate>
            {td.map((transaction, idx) => (
              <CardTransaction
                routeParameters={{
                  transaction: transaction,
                  date: {day: transaction.day, month: transaction.month, year: transaction.year},
                  formType: transaction.type === transactionType.TRANSACTION_IN,
                }}
                iconLeft={
                  <TransactionIcon source={getIconByCategory(Number(transaction.category), transaction.type)} />
                }
                transactionTitle={transaction.description}
                // categoryTransaction={getCategories(item)[transaction.category].label}
                categoryTransaction={getAccountById(transaction.accountId)}
                value={transaction.value}
                date={{day: transaction.day, month: transaction.month, year: transaction.year}}
                status={getTransactionStatus(transaction.status)}
                type={transaction.type}
                screenNavigate={pages.transactionForm}
                transactionStatus={transaction.status}
                key={transaction._id + idx}
              />
            ))}
          </S.DateSection>
        ))}
      </S.List>
    </>
  );
}
