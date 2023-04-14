import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';

import Carousel from 'react-native-reanimated-carousel';
import CardHead from '../CardHead';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {formatMoney} from '../../../../utils/FunctionUtils';
import colors from '../../../../styles/colors';
import IconFa from 'react-native-vector-icons/FontAwesome';
import {pages} from '../../../../routes';
import {useNavigation} from '@react-navigation/native';

const styles = StyleSheet.create({
  carousel: {
    width: '100%',
    marginLeft: 24,
  },
});

const width = Dimensions.get('window').width;

type CarouselHeaderProps = {showValues: boolean; monthBalance: number; economybalance: number};
type Nav = {
  navigate: (value: string) => void;
};

const CarouselHeader: React.FC<CarouselHeaderProps> = ({showValues, economybalance, monthBalance}) => {
  const dataValues = [
    {
      label: 'Saldo atual',
      value: monthBalance,
      color: colors.eletricBlue,
      icon: <IconFa name="dollar" size={24} color={'#fff'} />,
    },
    {
      label: 'Economia do mês',
      value: economybalance,
      color: colors.supportSuccess,
      icon: <IconFa name="line-chart" size={24} color={'#fff'} />,
    },
  ];

  const navigation = useNavigation<Nav>();

  return (
    <GestureHandlerRootView>
      <Carousel
        width={width - 35}
        height={110}
        data={dataValues}
        style={styles.carousel}
        renderItem={({item}) => (
          <CardHead
            labelOfValue={item.label}
            value={formatMoney(item.value) || ''}
            showValue={showValues}
            color={item.color}
            icon={item.icon}
            handleClickItem={() => {
              navigation.navigate(pages.config);
            }}
          />
        )}
      />
    </GestureHandlerRootView>
  );
};

export default CarouselHeader;
