import React from 'react';
import {StyleSheet} from 'react-native';
import {TabsContainer, TabItem, TitleCard, IconArea, ImageIcon} from './styles';
import despesaIcon from '../../assets/cardIcons/despesa.png';
import receitaIcon from '../../assets/cardIcons/receita.png';
import contasIcon from '../../assets/cardIcons/contas.png';
import {pages} from '../../routes';

const styles = StyleSheet.create({
  tab: {
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
});

const Tabs = ({navigation}) => (
  <TabsContainer>
    <TabItem style={styles.tab} onPress={() => navigation.navigate(pages.transactionForm)}>
      <IconArea>
        <ImageIcon source={despesaIcon} />
      </IconArea>
      <TitleCard>Despesa</TitleCard>
    </TabItem>
    <TabItem style={styles.tab} onPress={() => navigation.navigate(pages.transactionForm, {formType: true})}>
      <IconArea>
        <ImageIcon source={receitaIcon} />
      </IconArea>
      <TitleCard>Receita</TitleCard>
    </TabItem>
    <TabItem style={styles.tab} onPress={() => navigation.navigate(pages.accounts)}>
      <IconArea>
        <ImageIcon source={contasIcon} />
      </IconArea>
      <TitleCard>Contas</TitleCard>
    </TabItem>
  </TabsContainer>
);

export default Tabs;
