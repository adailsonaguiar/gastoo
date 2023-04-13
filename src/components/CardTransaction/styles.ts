import styled, {css} from 'styled-components/native';
import {TouchableOpacity} from 'react-native';
import colors from '../../styles/colors';
import {fontBold, fontMedium} from '../../styles/fonts';

import {transactionType} from '../../database/schemas/TransactionSchema';

export const Conta = styled(TouchableOpacity)`
  flex-direction: row;
  height: 70px;
  align-items: center;
  padding: 0 24px;
`;

export const WrapperIcon = styled.View`
  margin-right: 10px;
`;

export const ColLeft = styled.View`
  flex-direction: column;
  align-items: flex-start;
`;

export const TitleConta = styled.Text`
  color: ${colors.darkBackground};
  font-size: 16px;
  font-family: ${fontBold};
`;

export const CategoryConta = styled.Text`
  color: ${colors.gray40};
  font-family: ${fontMedium};
  font-size: 14px;
`;

export const ColRight = styled.View`
  flex-direction: column;
  align-items: flex-end;
  flex: 2;
`;

export const Saldo = styled.Text<{type: string}>`
  ${({type}) => css`
    color: ${type === transactionType.TRANSACTION_IN ? colors.supportSuccess : colors.supportDanger};
    font-size: 16px;
    font-family: ${fontBold};
  `}
`;

export const Atualizado = styled.Text`
  color: ${colors.gray40};
  font-family: ${fontMedium};
  font-size: 12px;
`;

export const CircleIconWrapper = styled.View`
  height: 100%;
  align-items: center;
  justify-content: center;
`;

type LineLeftProps = {lineLeftColor?: string};
export const LineLeft = styled.View<LineLeftProps>`
  ${({lineLeftColor}) => css`
    width: 16px;
    height: 16px;
    border-radius: 24px;
    background-color: ${lineLeftColor ? lineLeftColor : '#90909C'};
    margin-right: 10px;
  `}
`;

export const BadgeStatus = styled.View`
  width: 5px;
  height: 5px;
  border-radius: 25px;
  background-color: ${colors.appColor2};
  position: absolute;
  right: 20px;
  top: 5px;
`;
