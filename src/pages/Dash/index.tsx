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

import EyeIcon from '../../assets/eye-open.png';
import EyeIconClose from '../../assets/eye-close.png';
import {getData, storeData} from '../../services/asyncStorageService';

export const Dash = ({navigation}) => {
  const {transactions, totalsMonth} = TransactionsModel();
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

  React.useEffect(() => {
    handleShowValuesStorageData();
  }, []);

  return (
    <S.Container>
      <S.HaederLogo>
        <S.SeeMoreBtn onPress={() => navigation.navigate(pages.config)}>
          <S.Logo source={AppLogo} />
        </S.SeeMoreBtn>
      </S.HaederLogo>
      <S.CompHead>
        <S.IncomeCardsWrapper>
          <S.IncomeCard color={colors.appColor2}>
            <S.Label>Receitas</S.Label>
            {showMoney ? (
              <S.IncomeCardValue>
                {formatMoney(totalsMonth.totalIncome)}
              </S.IncomeCardValue>
            ) : (
              <S.WrapperMoneyHidden />
            )}
          </S.IncomeCard>
          <S.IncomeCard>
            <S.Label>Despesas</S.Label>
            {showMoney ? (
              <S.IncomeCardValue>
                {formatMoney(totalsMonth.totalExpense)}
              </S.IncomeCardValue>
            ) : (
              <S.WrapperMoneyHidden />
            )}
          </S.IncomeCard>
        </S.IncomeCardsWrapper>
        <S.TxtDescricao>Saldo disponível</S.TxtDescricao>
        <S.ContainerSaldo>
          <S.Cifra>R$</S.Cifra>
          {showMoney ? (
            <S.TxtSaldo>
              {formatMoney(totalsMonth.totalIncome - totalsMonth.totalExpense)}
            </S.TxtSaldo>
          ) : (
            <S.WrapperMoneyHidden />
          )}
          <S.EyeBtn onPress={toggleShowValuesStorageData}>
            {showMoney ? (
              <S.eyeIcon source={EyeIcon} />
            ) : (
              <S.eyeIcon source={EyeIconClose} />
            )}
          </S.EyeBtn>
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
      {/* <S.Footer>
        <Button
          label="Ver todas as transações"
          onPress={() => {
            navigation.navigate(pages.transactions);
          }}
        />
      </S.Footer> */}
    </S.Container>
  );
};
