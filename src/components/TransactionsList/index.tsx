/* eslint-disable react/react-in-jsx-scope */
import {FlatList} from 'react-native';
import {transactionType} from '../../database/schemas/TransactionSchema';
import {Transaction} from '../../models/transaction';
import {pages} from '../../routes';
import {getCategories, getTransactionStatus} from '../../utils/FunctionUtils';
import CardTransaction from '../CardTransaction';

type TransactionListProps = {
  transactions: Transaction[];
};
export function TransactionsList({transactions}: TransactionListProps) {
  return (
    <>
      <FlatList
        data={transactions}
        renderItem={({item}) => (
          <CardTransaction
            routeParameters={{
              transaction: item,
              date: {day: item.day, month: item.month, year: item.year},
              formType: item.type === transactionType.TRANSACTION_IN,
            }}
            transactionTitle={item.description}
            categoryTransaction={getCategories(item)[item.category].label}
            value={item.value}
            date={{day: item.day, month: item.month, year: item.year}}
            status={getTransactionStatus(item.status)}
            type={item.type}
            screenNavigate={pages.transactionForm}
            transactionStatus={item.status}
          />
        )}
        keyExtractor={item => item._id}
      />
    </>
  );
}
