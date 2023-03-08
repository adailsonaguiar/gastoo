import React, {useState} from 'react';
import {format} from 'date-fns';

import * as S from './styles';
import {Modal} from 'react-native';
import colors from '../../styles/colors';
import Header from '../Header';
import {fontMedium, fontRegular} from '../../styles/fonts';
import {Label} from '../Label';

type DatePickerProps = {
  date: Date;
  setDate: (value: Date) => void;
};

const DatePicker = ({date, setDate, ...rest}: DatePickerProps) => {
  const [show, setShow] = useState(false);

  function toogleShow() {
    setShow(!show);
  }

  function onChange(selectedDate: string) {
    setShow(false);
    const convertedCharDate = selectedDate.replace('/', '-').replace('/', '-');
    setDate(new Date(convertedCharDate + 'T12:00:00.000Z'));
  }

  return (
    <S.Container {...rest}>
      <Label>Data</Label>
      <S.PickerWrapper onPress={() => toogleShow()}>
        <S.Value>{format(date, 'dd/MM/yyyy')}</S.Value>
        <Modal animationType="slide" visible={show} onRequestClose={() => setShow(false)}>
          <S.ModalContainer>
            <Header title="Selecione uma data" lineColor={colors.appColor} onClose={() => setShow(false)} />
            <S.CustomDatePicker
              mode="calendar"
              selected={format(date, 'yyyy-MM-dd')}
              options={{
                textHeaderColor: colors.fontLight,
                textDefaultColor: colors.fontLight,
                mainColor: colors.appColor,
                textSecondaryColor: colors.gray400,
                defaultFont: fontRegular,
                headerFont: fontMedium,
              }}
              onDateChange={value => {
                onChange(value);
              }}
              current={format(date, 'yyyy-MM-dd')}
            />
          </S.ModalContainer>
        </Modal>
      </S.PickerWrapper>
    </S.Container>
  );
};

export default DatePicker;
