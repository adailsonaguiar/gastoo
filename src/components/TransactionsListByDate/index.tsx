/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/react-in-jsx-scope */
import {Transaction} from '../../models/transaction';
import {pages} from '../../routes';
import {getTransactionStatus} from '../../utils/FunctionUtils';
import CardTransaction from '../CardTransaction';
import {Account} from '../../models/Accounts';
import React from 'react';
import {format, isSameDay} from 'date-fns';

import * as S from './styles';
import {useNavigation} from '@react-navigation/native';
import {Nav} from '../../models/useNavigation.model';
import ExpenseIcon from '../TransactionTypeIcon';

type TransactionListProps = {
  transactions: Transaction[];
  accounts: Account[];
};

export function TransactionsListByDate({transactions, accounts = []}: TransactionListProps) {
  const [transactionsByDate, setTransactionsByDate] = React.useState<Transaction[][]>([]);

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
          newtransactionsByDate[index].push(item);
        }
      });

      if (!foundedTransaction?._id || !newtransactionsByDate.length) {
        newtransactionsByDate.push([item]);
      }
    });

    setTransactionsByDate(newtransactionsByDate);
  }, [transactions]);

  const navigation = useNavigation<Nav>();

  return (
    <>
      <S.List>
        {transactionsByDate.map((td, index) => (
          <S.DateSection key={td[0]._id + index}>
            <S.WrapperDate>
              <S.Date>{format(td[0].date, 'dd/MM/yyyy')}</S.Date>
            </S.WrapperDate>
            {td.map((transaction, idx) => (
              <CardTransaction
                key={transaction._id + idx}
                iconLeft={<ExpenseIcon type={transaction.type} categoryCode={Number(transaction.category)} />}
                transactionTitle={transaction.description}
                categoryTransaction={getAccountById(transaction.accountId)}
                value={transaction.value}
                date={{day: transaction.day, month: transaction.month, year: transaction.year}}
                status={getTransactionStatus(transaction.status)}
                type={transaction.type}
                transactionStatus={transaction.status}
                onClickItem={() => navigation.navigate(pages.transactionForm, {transaction})}
              />
            ))}
          </S.DateSection>
        ))}
      </S.List>
    </>
  );
}
