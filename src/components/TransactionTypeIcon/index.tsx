import React from 'react';
import IconMc from 'react-native-vector-icons/Ionicons';
import {transactionType} from '../../database/schemas/TransactionSchema';
import colors from '../../styles/colors';

type ExpenseIconType = {
  categoryCode: number;
  type: string;
};
const ExpenseIcon: React.FC<ExpenseIconType> = ({categoryCode, type}) => {
  const iconProps = {
    color: colors.gray50,
    size: 20,
  };
  if (type === transactionType.TRANSACTION_OUT) {
    switch (categoryCode) {
      case 1:
        return <IconMc {...iconProps} name="restaurant-outline" />;
      case 2:
        return <IconMc {...iconProps} name="car-sport-outline" />;
      case 3:
        return <IconMc {...iconProps} name="build-outline" />;
      case 5:
        return <IconMc {...iconProps} name="shirt-outline" />;
      case 6:
        return <IconMc {...iconProps} name="ios-cart-outline" />;
      case 7:
        return <IconMc {...iconProps} name="fitness-outline" />;
      case 8:
        return <IconMc {...iconProps} name="ios-bookmark-outline" />;
      case 10:
        return <IconMc {...iconProps} name="wallet-outline" />;
      default:
        return <IconMc {...iconProps} name="wallet-outline" />;
    }
  }
  return <IconMc {...iconProps} name="wallet-outline" />;
};

export default ExpenseIcon;
