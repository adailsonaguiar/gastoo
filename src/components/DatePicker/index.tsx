import React, {useState} from 'react';
import {format} from 'date-fns';

import * as S from './styles';
import {Modal} from 'react-native';
import colors from '../../styles/colors';

type DatePickerProps = {
  date: Date;
  setDate: (value: Date) => void;
};

const DatePicker = ({date, setDate, ...rest}: DatePickerProps) => {
  const [show, setShow] = useState(false);

  function toogleShow() {
    console.log(show);
    setShow(!show);
  }

  function onChange(selectedDate: string) {
    setShow(false);
    console.log(selectedDate.toString(), new Date(selectedDate));

    // setDate(new Date(selectedDate));
  }

  return (
    <S.Container {...rest}>
      <S.Label>Data</S.Label>
      <S.PickerWrapper onPress={() => toogleShow()}>
        <S.Value>{format(date, 'dd/MM/yyyy')}</S.Value>
        <Modal
          animationType="slide"
          visible={show}
          onRequestClose={() => setShow(false)}>
          <S.ModalContainer>
            <S.CustomDatePicker
              mode="calendar"
              options={{
                textHeaderColor: colors.fontLight,
                textDefaultColor: colors.fontLight,
                // selectedTextColor: colors.greenApp,
                mainColor: colors.greenApp,
                textSecondaryColor: colors.gray400,
              }}
              onDateChange={value => {
                onChange(value);
              }}
            />
          </S.ModalContainer>
        </Modal>
      </S.PickerWrapper>
    </S.Container>
  );
};

export default DatePicker;
