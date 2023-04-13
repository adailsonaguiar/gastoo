import React from 'react';
import {FlatList} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import Header from '../../components/Header';
import CardTransaction from '../../components/CardTransaction';
import Button from '../../components/Button';
import {Account} from '../../models/Accounts';
import {fetchAccounts} from '../../services/accountsService';
import {useRealm} from '../../store/realm';
import {BottomSheetModal} from '../../components/BottomSheetModal';
import NewAccount from './Components/NewAccount';

import * as S from './styles';
import {accountCategories} from '../../utils/categoriesAccounts';

type AccountPageProps = {
  navigation: any;
};

const Accounts = ({navigation}: AccountPageProps) => {
  const {realm} = useRealm();
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const [accounts, setAccounts] = React.useState<Account[]>([]);
  const [selectedAccount, setSelectedAccount] = React.useState<Account>();

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

  function handleSelectAccount(item: Account) {
    setSelectedAccount(item);
    setIsModalVisible(!isModalVisible);
  }

  return (
    <>
      <Header title="Suas contas" onClose={() => navigation.goBack()} />
      <S.Container>
        <S.Lista>
          <FlatList
            data={accounts}
            renderItem={({item}) => (
              <CardTransaction
                onClickItem={() => handleSelectAccount(item)}
                transactionTitle={item.description}
                value={item.balance}
                date={{day: item.day, month: item.month, year: item.year}}
                lineLeftColor={item.color}
                categoryTransaction={accountCategories[String(item.type)].label || ''}
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
            <NewAccount account={selectedAccount} onFishInteration={() => setIsModalVisible(!isModalVisible)} />
          </BottomSheetModal>

          <Button
            label="Adicionar conta"
            loading={false}
            onPress={() => {
              setSelectedAccount(undefined);
              setIsModalVisible(!isModalVisible);
            }}
          />
        </S.Footer>
      </S.Container>
    </>
  );
};

export default Accounts;
