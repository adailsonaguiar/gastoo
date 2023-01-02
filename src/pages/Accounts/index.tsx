import React from 'react';
import {FlatList} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import * as S from './styles';
import Header from '../../components/Header';
import CardTransaction from '../../components/CardTransaction';
import {pages} from '../../routes';
import Button from '../../components/Button';
import {getRealm, loadData} from '../../database/realm';
import {SCHEMAS} from '../../database/schemas';
import {Account} from '../../models/Accounts';

type AccountPageProps = {
  navigation: any;
};

const Accounts = ({navigation}: AccountPageProps) => {
  const [accounts, setAccounts] = React.useState<Account[]>([]);
  async function fetchAccounts() {
    const realm = await getRealm();
    const response = await loadData({schema: SCHEMAS.ACCOUNT, realm});
    if (response) {
      setAccounts(response as Account[]);
    }
    realm.close();
  }

  useFocusEffect(
    React.useCallback(() => {
      fetchAccounts();
    }, []),
  );

  return (
    <>
      <Header title="Suas contas" navigation={navigation} />
      <S.Container>
        <S.Lista>
          <FlatList
            data={accounts}
            renderItem={({item}) => (
              <CardTransaction
                navigation={navigation}
                screenNavigate={pages.accountForm}
                routeParameters={{account: item}}
                transactionTitle={item.description}
                value={item.balance}
                date={{day: item.day, month: item.month, year: item.year}}
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
          <Button
            label="Adicionar Conta"
            loading={false}
            onPress={() => {
              navigation.navigate(pages.accountForm, {});
            }}
          />
        </S.Footer>
      </S.Container>
    </>
  );
};

export default Accounts;
