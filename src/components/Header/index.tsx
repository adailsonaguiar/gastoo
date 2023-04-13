import React from 'react';
import * as S from './styles';
import MonthHeader from '../MothHeader';

import closeIcon from '../../assets/ArrowLeft-white.png';

import FeatherIcon from 'react-native-vector-icons/Feather';
import colors from '../../styles/colors';

type HeaderProps = {
  title: string;
  onClose?: () => void;
  onChangeMonth?: (props: {month: number; year: number}) => void;
  padding?: number;
  style?: 'dark' | 'light';
  children?: React.ReactNode;
};

const Header = ({title, onClose, onChangeMonth, style, padding}: HeaderProps) => {
  return (
    <>
      <S.HeaderForm style={style} padding={padding}>
        <S.RowWrapper>
          <S.SpaceWrapper align="flex-start">
            {onClose && (
              <S.HeaderBtn
                onPress={async () => {
                  if (onClose) {
                    onClose();
                  }
                }}>
                <FeatherIcon name="arrow-left" size={23} color={style === 'dark' ? '#fff' : colors.darkBlue} />
              </S.HeaderBtn>
            )}
          </S.SpaceWrapper>
          <S.SpaceWrapper flex={2} align="center">
            <S.TxtHeaderForm style={style}>{title}</S.TxtHeaderForm>
          </S.SpaceWrapper>
          <S.SpaceWrapper align="flex-end">
            {/* <S.HeaderBtn
              onPress={async () => {
                if (onClose) {
                  onClose();
                }
              }}>
              <S.HeaderBtnIcon source={funnelSimpleIcon} />
            </S.HeaderBtn> */}
          </S.SpaceWrapper>
        </S.RowWrapper>
        {onChangeMonth && <MonthHeader onChangeMonth={onChangeMonth} />}
      </S.HeaderForm>
    </>
  );
};

export const SelectModalHeader = ({title, onClose, children, style}: HeaderProps) => {
  return (
    <>
      <S.HeaderSelect>
        <S.RowWrapper>
          <S.TxtHeaderForm style={style}>{title}</S.TxtHeaderForm>
          {onClose && (
            <S.HeaderBtn
              onPress={async () => {
                if (onClose) {
                  onClose();
                }
              }}>
              <S.HeaderBtnIcon source={closeIcon} />
            </S.HeaderBtn>
          )}
          {children && <S.Subtitle>{children}</S.Subtitle>}
        </S.RowWrapper>
      </S.HeaderSelect>
    </>
  );
};

export default Header;
