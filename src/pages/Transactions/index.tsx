import React from 'react';
import * as S from './styles';
import Header from '../../components/Header';
import {TransactionsModel} from './index.model';
import {TransactionsList} from '../../components/TransactionsList';
import {useNavigation} from '@react-navigation/native';

const Transactions = () => {
  const {transactions, getTransactions} = TransactionsModel();
  const navigation = useNavigation();
  return (
    <>
      <Header
        title="Transações"
        onChangeMonth={getTransactions}
        onClose={() => navigation.goBack()}
      />
      <S.Container>
        <S.List>
          <TransactionsList transactions={transactions} />
        </S.List>
        <S.Footer>
          {/* <S.SaldoTotal>
            Economia do mês: R$ {formatMoney(totalValueIn - totalValueOut)}
          </S.SaldoTotal> */}
        </S.Footer>
      </S.Container>
    </>
  );
};

export default Transactions;
