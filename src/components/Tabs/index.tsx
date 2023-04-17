import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {TabItem, TitleCard, IconArea} from './styles';
import {pages} from '../../routes';
import Icon from 'react-native-vector-icons/Feather';
import IconFt from 'react-native-vector-icons/FontAwesome';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import Carousel from 'react-native-reanimated-carousel';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  carousel: {
    width: '100%',
  },
});

type TabsProps = {navigation: any};

const Tabs = ({navigation}: TabsProps) => {
  const [cardsData, setCardsData] = React.useState([
    {
      label: 'Despesa',
      page: () => navigation.navigate(pages.transactionForm),
      icon: <Icon name="arrow-down-left" size={23} color="#fff" />,
    },
    {
      label: 'Receita',
      page: () => navigation.navigate(pages.transactionForm, {formType: true}),
      icon: <Icon name="arrow-up-right" size={23} color="#fff" />,
    },
    {
      label: 'Contas',
      page: () => navigation.navigate(pages.accounts),
      icon: <IconFt name="bank" size={15} color="#fff" />,
    },
  ]);

  React.useEffect(() => {
    setCardsData([
      ...cardsData,
      {
        label: 'Configurações',
        page: () => navigation.navigate(pages.config),
        icon: <Icon name="settings" size={15} color="#fff" />,
      },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <GestureHandlerRootView>
      <Carousel
        width={width / 3}
        height={110}
        data={cardsData}
        style={styles.carousel}
        renderItem={({item}) => (
          <TabItem onPress={item.page}>
            <IconArea>{item.icon}</IconArea>
            <TitleCard>{item.label}</TitleCard>
          </TabItem>
        )}
      />
      {/* <TabsContainer>
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
    </TabsContainer>*/}
    </GestureHandlerRootView>
  );
};

export default Tabs;
