import React, {ReactNode} from 'react';
import * as S from './styles';
import MonthHeader from '../MothHeader';
import {Image} from 'react-native';

import closeIcon from '../../assets/close.png';

type HeaderProps = {
  title: string;
  navigation: any;
  lineColor?: string;
  showMonthHeader?: boolean;
  children?: ReactNode;
};

const Header = ({
  title,
  navigation,
  lineColor,
  showMonthHeader = false,
  children,
}: HeaderProps) => {
  return (
    <>
      {showMonthHeader && <MonthHeader />}
      <S.HeaderForm>
        <S.RowWrapper>
          <S.TxtHeaderForm>{title}</S.TxtHeaderForm>
          {navigation && (
            <S.BtnFechar
              onPress={async () => {
                navigation.goBack();
              }}>
              <Image source={closeIcon} />
            </S.BtnFechar>
          )}
        </S.RowWrapper>
        <S.Line lineColor={lineColor} />
        {children && <S.Subtitle>{children}</S.Subtitle>}
      </S.HeaderForm>
    </>
  );
};

export default Header;
