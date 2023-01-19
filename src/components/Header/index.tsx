import React, {ReactNode} from 'react';
import {useNavigation} from '@react-navigation/native';
import * as S from './styles';
import MonthHeader from '../MothHeader';

import closeIcon from '../../assets/close-icon.png';

type HeaderProps = {
  title: string;
  lineColor?: string;
  children?: ReactNode;
  onClose?: () => void;
  onChangeMonth?: (props: {month: number; year: number}) => void;
  padding?: boolean;
};

const Header = ({
  title,
  lineColor,
  children,
  onClose,
  onChangeMonth,
}: HeaderProps) => {
  return (
    <>
      {onChangeMonth && <MonthHeader onChangeMonth={onChangeMonth} />}
      <S.HeaderForm>
        <S.RowWrapper>
          <S.TxtHeaderForm>{title}</S.TxtHeaderForm>
          {onClose && (
            <S.BtnFechar
              onPress={async () => {
                if (onClose) {
                  onClose();
                }
              }}>
              <S.CloseIcon source={closeIcon} />
            </S.BtnFechar>
          )}
          {children && <S.Subtitle>{children}</S.Subtitle>}
        </S.RowWrapper>
        <S.Line lineColor={lineColor} />
      </S.HeaderForm>
    </>
  );
};

export const SelectModalHeader = ({
  title,
  lineColor,
  children,
  onClose,
  onChangeMonth,
}: HeaderProps) => {
  const navigation = useNavigation();
  return (
    <>
      {onChangeMonth && <MonthHeader onChangeMonth={onChangeMonth} />}
      <S.HeaderSelect>
        <S.RowWrapper>
          <S.TxtHeaderForm>{title}</S.TxtHeaderForm>
          {onClose && (
            <S.BtnFechar
              onPress={async () => {
                if (onClose) {
                  onClose();
                } else {
                  navigation.goBack();
                }
              }}>
              <S.CloseIcon source={closeIcon} />
            </S.BtnFechar>
          )}
          {children && <S.Subtitle>{children}</S.Subtitle>}
        </S.RowWrapper>
        <S.Line lineColor={lineColor} />
      </S.HeaderSelect>
    </>
  );
};

export default Header;
