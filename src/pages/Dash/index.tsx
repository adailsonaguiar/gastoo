import React, {useEffect} from 'react';
import Tabs from '../../components/Tabs';
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
} from './styles';
// import SlideBanners from '../../components/SlideBanners';
// import {loadTransactions} from '../../store/transactions/actions';

export const Dash = ({navigation}) => {
  // const dispatch = useDispatch();
  // const transactions = useSelector((state) => state.transactions.list);
  // const totalValueAccounts = useSelector(
  //   (state) => state.accounts.totalValueAccounts,
  // );

  useEffect(() => {
    // getDate().then((date) =>
    //   dispatch(
    //     loadTransactions({month: Number(date.month), year: Number(date.year)}),
    //   ),
    // );
    // dispatch(loadAccounts());
  }, []);

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
    </Container>
  );
};
