import React from 'react';
import {StyleSheet} from 'react-native';
import {TabsContainer, TabItem, TitleCard, IconArea} from './styles';
import {pages} from '../../routes';
import Icon from 'react-native-vector-icons/Feather';
import IconFt from 'react-native-vector-icons/FontAwesome';

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

type TabsProps = {navigation: any};

const Tabs = ({navigation}: TabsProps) => (
  <TabsContainer>
    <TabItem style={styles.tab} onPress={() => navigation.navigate(pages.transactionForm)}>
      <IconArea>
        <Icon name="arrow-down-left" size={23} color="#fff" />
      </IconArea>
      <TitleCard>Despesa</TitleCard>
    </TabItem>
    <TabItem style={styles.tab} onPress={() => navigation.navigate(pages.transactionForm, {formType: true})}>
      <IconArea>
        <Icon name="arrow-up-right" size={23} color="#fff" />
      </IconArea>
      <TitleCard>Receita</TitleCard>
    </TabItem>
    <TabItem style={styles.tab} onPress={() => navigation.navigate(pages.accounts)}>
      <IconArea>
        <IconFt name="bank" size={15} color="#fff" />
      </IconArea>
      <TitleCard>Contas</TitleCard>
    </TabItem>
  </TabsContainer>
);

export default Tabs;
