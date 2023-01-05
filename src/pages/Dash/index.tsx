import {useFocusEffect} from '@react-navigation/native';
import React from 'react';
import Button from '../../components/Button';
import Tabs from '../../components/Tabs';
import {TransactionsList} from '../../components/TransactionsList';
import {pages} from '../../routes';
import {TransactionsModel} from '../Transactions/index.model';
// import {loadAccounts} from '../../store/accounts/actions';
// import Tabs from '../../components/Tabs';
// import colors from '../../styles/colors';
// import {getDate} from '../../utils/FunctionUtils';

import {
  Container,
  CompHead,
  TxtSaldo,
  TxtDescricao,
  ContainerSaldo,
  Cifra,
  ContentWrapper,
  Footer,
} from './styles';
// import SlideBanners from '../../components/SlideBanners';
// import {loadTransactions} from '../../store/transactions/actions';

export const Dash = ({navigation}) => {
  const {transactions} = TransactionsModel();

  return (
    <Container>
      <CompHead>
        <TxtDescricao>Saldo disponível</TxtDescricao>
        <ContainerSaldo>
          <Cifra>R$</Cifra>
          <TxtSaldo>1</TxtSaldo>
        </ContainerSaldo>
      </CompHead>
      {/* <SlideBanners cards={[{titleHead: 'Últimas Transações', transactions}]} /> */}
      <Tabs navigation={navigation} />
      <ContentWrapper>
        <TransactionsList transactions={transactions} />
      </ContentWrapper>
      <Footer>
        <Button
          label="Ver todas as transações"
          onPress={() => {
            navigation.navigate(pages.transactions);
          }}
        />
      </Footer>
    </Container>
  );
};
