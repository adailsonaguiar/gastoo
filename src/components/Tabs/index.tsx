import React from 'react';
import {TabsContainer, TabItem, TitleCard, IconArea, ImageIcon} from './styles';
import despesaIcon from '../../assets/cardIcons/despesa.png';
import receitaIcon from '../../assets/cardIcons/receita.png';
import transacoesIcon from '../../assets/cardIcons/transacoes.png';
import contasIcon from '../../assets/cardIcons/contas.png';
import {pages} from '../../routes';

const Tabs = ({navigation}) => (
  <TabsContainer showsHorizontalScrollIndicator={false}>
    <TabItem onPress={() => navigation.navigate(pages.transactionForm)}>
      <IconArea>
        <ImageIcon source={despesaIcon} />
      </IconArea>
      <TitleCard>Despesa</TitleCard>
    </TabItem>
    <TabItem onPress={() => navigation.navigate(pages.transactions)}>
      <IconArea>
        <ImageIcon source={transacoesIcon} />
      </IconArea>
      <TitleCard>Transações</TitleCard>
    </TabItem>
    <TabItem
      onPress={() =>
        navigation.navigate(pages.transactionForm, {formType: true})
      }>
      <IconArea>
        <ImageIcon source={receitaIcon} />
      </IconArea>
      <TitleCard>Receita</TitleCard>
    </TabItem>
    <TabItem onPress={() => navigation.navigate(pages.accounts)}>
      <IconArea>
        <ImageIcon source={contasIcon} />
      </IconArea>
      <TitleCard>Contas</TitleCard>
    </TabItem>
  </TabsContainer>
);

export default Tabs;
