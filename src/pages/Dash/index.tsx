import React from 'react';
import {SelectModalHeader} from '../../components/Header';
import Tabs from '../../components/Tabs';
import {TransactionsList} from '../../components/TransactionsList';
import {pages} from '../../routes';
import colors from '../../styles/colors';
import {TransactionsModel} from '../Transactions/index.model';
// import {loadAccounts} from '../../store/accounts/actions';
// import Tabs from '../../components/Tabs';
// import colors from '../../styles/colors';
// import {getDate} from '../../utils/FunctionUtils';
import AppLogo from '../../assets/logo-gastoo.png';

import * as S from './styles';
import {formatMoney} from '../../utils/FunctionUtils';
// import SlideBanners from '../../components/SlideBanners';
// import {loadTransactions} from '../../store/transactions/actions';

export const Dash = ({navigation}) => {
  const {transactions, totalsMonth} = TransactionsModel();

  return (
    <S.Container>
      <S.HaederLogo>
        <S.Logo source={AppLogo} />
      </S.HaederLogo>
      <S.CompHead>
        <S.IncomeCardsWrapper>
          <S.IncomeCard color={colors.appColor2}>
            <S.Label>Receitas</S.Label>
            <S.IncomeCardValue>
              {formatMoney(totalsMonth.totalIncome)}
            </S.IncomeCardValue>
          </S.IncomeCard>
          <S.IncomeCard>
            <S.Label>Despesas</S.Label>
            <S.IncomeCardValue>
              {formatMoney(totalsMonth.totalExpense)}
            </S.IncomeCardValue>
          </S.IncomeCard>
        </S.IncomeCardsWrapper>
        <S.TxtDescricao>Saldo disponível</S.TxtDescricao>
        <S.ContainerSaldo>
          <S.Cifra>R$</S.Cifra>
          <S.TxtSaldo>
            {formatMoney(totalsMonth.totalIncome - totalsMonth.totalExpense)}
          </S.TxtSaldo>
        </S.ContainerSaldo>
      </S.CompHead>
      <Tabs navigation={navigation} />
      <S.ContentWrapper>
        <S.ContainerBorderPage>
          <SelectModalHeader title="Transações">
            <S.SeeMoreBtn
              onPress={() => {
                navigation.navigate(pages.transactions);
              }}>
              <S.SeeMore>Veja mais</S.SeeMore>
            </S.SeeMoreBtn>
          </SelectModalHeader>
        </S.ContainerBorderPage>
        <TransactionsList transactions={transactions} />
      </S.ContentWrapper>
      <S.Footer>
        {/* <Button
          label="Ver todas as transações"
          onPress={() => {
            navigation.navigate(pages.transactions);
          }}
        /> */}
      </S.Footer>
    </S.Container>
  );
};
