import React from 'react';
import FeatherIcon from 'react-native-vector-icons/Feather';

import * as S from './styles';

type CardHeadProps = {
  value: string;
  showValue: boolean;
  labelOfValue: string;
  color: string;
  icon: React.ReactNode;
  handleClickItem: () => void;
  hideValues: () => void;
};

const CardHead: React.FC<CardHeadProps> = ({
  labelOfValue,
  hideValues,
  handleClickItem,
  showValue,
  value,
  color,
  icon,
}) => {
  return (
    <S.CompHead color={color} onPress={handleClickItem}>
      <>
        <S.Section>
          <S.LabelWrapper>
            <S.TxtDescricao>{labelOfValue}</S.TxtDescricao>
            <S.EyeBtn onPress={hideValues}>
              {showValue ? (
                <FeatherIcon name="eye" size={20} color="#fff" />
              ) : (
                <FeatherIcon name="eye-off" size={20} color="#fff" />
              )}
            </S.EyeBtn>
          </S.LabelWrapper>
          <S.ContainerSaldo>
            {showValue ? <S.TxtSaldo>R$ {value}</S.TxtSaldo> : <S.WrapperMoneyHidden />}
          </S.ContainerSaldo>
        </S.Section>
        <S.Section>
          <S.IconWrapper>{icon}</S.IconWrapper>
        </S.Section>
      </>
    </S.CompHead>
  );
};

export default CardHead;
