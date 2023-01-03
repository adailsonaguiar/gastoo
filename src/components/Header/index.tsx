import React, {ReactNode} from 'react';
import {useNavigation} from '@react-navigation/native';
import * as S from './styles';
import MonthHeader from '../MothHeader';
import {Image} from 'react-native';

import closeIcon from '../../assets/close.png';

type HeaderProps = {
  title: string;
  lineColor?: string;
  showMonthHeader?: boolean;
  children?: ReactNode;
  onClose?: () => void;
};

const Header = ({
  title,
  lineColor,
  showMonthHeader = false,
  children,
  onClose,
}: HeaderProps) => {
  const navigation = useNavigation();
  return (
    <>
      {showMonthHeader && <MonthHeader />}
      <S.HeaderForm>
        <S.RowWrapper>
          <S.TxtHeaderForm>{title}</S.TxtHeaderForm>
          <S.BtnFechar
            onPress={async () => {
              if (onClose) {
                onClose();
              } else {
                navigation.goBack();
              }
            }}>
            <Image source={closeIcon} />
          </S.BtnFechar>
        </S.RowWrapper>
        <S.Line lineColor={lineColor} />
        {children && <S.Subtitle>{children}</S.Subtitle>}
      </S.HeaderForm>
    </>
  );
};

export default Header;
