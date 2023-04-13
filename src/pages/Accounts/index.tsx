import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import * as S from './styles';
import Header from '../../components/Header';
import CardTransaction from '../../components/CardTransaction';
import {pages} from '../../routes';
import Button from '../../components/Button';
import {Account} from '../../models/Accounts';
import {fetchAccounts} from '../../services/accountsService';
import {useRealm} from '../../store/realm';
import {BottomSheetModal} from '../../components/BottomSheetModal';

type AccountPageProps = {
  navigation: any;
};

const Accounts = ({navigation}: AccountPageProps) => {
  const {realm} = useRealm();
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const [accounts, setAccounts] = React.useState<Account[]>([]);
  async function getAccounts() {
    const response = await fetchAccounts({realm});
    if (response) {
      setAccounts(response);
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      getAccounts();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  return (
    <>
      <Header title="Suas contas" onClose={() => navigation.goBack()} />
      <S.Container>
        <S.Lista>
          <FlatList
            data={accounts}
            renderItem={({item}) => (
              <CardTransaction
                screenNavigate={pages.accountForm}
                routeParameters={{account: item}}
                transactionTitle={item.description}
                value={item.balance}
                date={{day: item.day, month: item.month, year: item.year}}
                lineLeftColor={item.color}
              />
            )}
            keyExtractor={item => item._id.toString()}
          />
        </S.Lista>
        <S.Footer>
          {/* <S.SaldoTotal>
            Total das contas: R$ ${formatMoney(totalValueIn - totalValueOut)}
          </S.SaldoTotal> */}
          {/* <S.BtnNovaConta
            onPress={() => {
              navigation.navigate(pages.accountForm, {});
            }}>
            <S.TxtNovaConta>Adicionar Conta</S.TxtNovaConta>
          </S.BtnNovaConta> */}

          <BottomSheetModal visible={isModalVisible} toggleVisible={() => setIsModalVisible(!isModalVisible)}>
            <Button
              label="Close modal"
              loading={false}
              onPress={() => {
                setIsModalVisible(!isModalVisible);
              }}
            />
          </BottomSheetModal>

          <Button
            label="Open modal"
            loading={false}
            onPress={() => {
              setIsModalVisible(!isModalVisible);
            }}
          />
        </S.Footer>
      </S.Container>
    </>
  );
};

export default Accounts;
