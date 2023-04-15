import React from 'react';
import {useFocusEffect} from '@react-navigation/native';

import {SelectModalHeader} from '../../components/Header';
import Tabs from '../../components/Tabs';
import {TransactionsList} from '../../components/TransactionsList';
import {pages} from '../../routes';
import {TransactionsModel} from '../Transactions/index.model';

import * as S from './styles';
import {formatMoney} from '../../utils/FunctionUtils';

import {getData, storeData} from '../../services/asyncStorageService';
import {useRealm} from '../../store/realm';
import CarouselHeader from './Components/CarouselHeader';

type DashProps = {
  navigation: any;
};

export const Dash = ({navigation}: DashProps) => {
  const {realm} = useRealm();

  const {transactions, totalsMonth, totalAccounts, getTransactions, getAccounts, accounts} = TransactionsModel({realm});
  const [showMoney, setShowMoney] = React.useState(true);

  async function handleShowValuesStorageData() {
    const value = await getData('_show_money_values');
    setShowMoney(value === 'true');
  }

  async function toggleShowValuesStorageData() {
    storeData({
      key: '_show_money_values',
      value: showMoney ? 'false' : 'true',
    });
    setShowMoney(!showMoney);
  }

  useFocusEffect(
    React.useCallback(() => {
      if (!transactions.length && realm) {
        getTransactions({month: new Date().getMonth() + 1, year: new Date().getFullYear()});
        handleShowValuesStorageData();
        getAccounts();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [realm]),
  );

  return (
    <S.Container>
      <S.CustomWrapper padding={0}>
        <CarouselHeader
          showValues={showMoney}
          economybalance={totalAccounts.totalCurrent - totalsMonth.totalExpenseNotPaid}
          monthBalance={totalsMonth.totalIncome - totalsMonth.totalExpense}
          hideValues={toggleShowValuesStorageData}
        />
        {/* <S.HaederLogo> */}
        {/* <S.SeeMoreBtn onPress={() => navigation.navigate(pages.config)}> */}
        {/* <S.SeeMoreBtn onPress={() => {}}> */}
        {/* <S.Logo source={AppLogo} /> */}
        {/* </S.SeeMoreBtn> */}
        {/* </S.HaederLogo> */}
        {/* <S.CompHead>
          <S.LabelWrapper>
            <S.TxtDescricao>Saldo do mês</S.TxtDescricao>
            <S.EyeBtn onPress={toggleShowValuesStorageData}>
              {showMoney ? (
                <FeatherIcon name="eye" size={23} color="#fff" />
              ) : (
                <FeatherIcon name="eye-off" size={23} color="#fff" />
              )}
            </S.EyeBtn>
          </S.LabelWrapper>
          <S.ContainerSaldo>
            {showMoney ? (
              <S.TxtSaldo>R$ {formatMoney(totalsMonth.totalIncome - totalsMonth.totalExpense)}</S.TxtSaldo>
            ) : (
              <S.WrapperMoneyHidden />
            )}
          </S.ContainerSaldo>
        </S.CompHead> */}
      </S.CustomWrapper>
      <S.CustomWrapper>
        <Tabs navigation={navigation} />
      </S.CustomWrapper>
      <S.CustomWrapper>
        <S.IncomeCardsWrapper>
          <S.IncomeCard>
            <S.Label>Receitas totais</S.Label>
            {showMoney ? (
              <S.IncomeCardValue colorSuccess>R$ {formatMoney(totalsMonth.totalIncome)}</S.IncomeCardValue>
            ) : (
              <S.WrapperMoneyHidden />
            )}
          </S.IncomeCard>
          <S.IncomeCard alignRight>
            <S.Label>Despesas totais</S.Label>
            {showMoney ? (
              <S.IncomeCardValue>-R$ {formatMoney(totalsMonth.totalExpense)}</S.IncomeCardValue>
            ) : (
              <S.WrapperMoneyHidden />
            )}
          </S.IncomeCard>
        </S.IncomeCardsWrapper>
      </S.CustomWrapper>
      <S.CustomWrapper background="#fff" marginBottom={'0'}>
        <S.HeaderWrapper>
          <SelectModalHeader title="Transações" style="light">
            <S.SeeMoreBtn
              onPress={() => {
                navigation.navigate(pages.transactions);
              }}>
              <S.SeeMore>Ver todas</S.SeeMore>
            </S.SeeMoreBtn>
          </SelectModalHeader>
        </S.HeaderWrapper>
      </S.CustomWrapper>
      <S.CustomWrapperWithoutMargin background="#fff">
        <TransactionsList transactions={transactions} accounts={accounts} />
      </S.CustomWrapperWithoutMargin>
    </S.Container>
  );
};
