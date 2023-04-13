/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import months, {monthsAbbreviated} from '../../utils/months';

import {
  Container,
  ButtonPrevMonth,
  ButtonNextMonth,
  ButtonMonthIconPrev,
  ButtonMonthIconNext,
  MonthCenter,
} from './styles';
import {useFocusEffect} from '@react-navigation/native';

type MothHeaderProps = {
  onChangeMonth: (props: {month: number; year: number}) => void;
};

export default function MothHeader({onChangeMonth}: MothHeaderProps) {
  const currentDate = new Date();
  const [date, setDate] = React.useState({month: currentDate.getMonth(), year: currentDate.getFullYear()});

  useFocusEffect(
    React.useCallback(() => {
      console.log('useCallback', date);

      onChangeMonth({month: date.month + 1, year: date.year});
    }, [date]),
  );

  const nextMonth = () => {
    if (date.month === 11) {
      setDate({month: 0, year: date.year + 1});
    } else {
      setDate({month: date.month + 1, year: date.year});
    }
  };
  const previousMonth = () => {
    if (date.month === 0) {
      setDate({month: 11, year: date.year - 1});
    } else {
      setDate({month: date.month - 1, year: date.year});
    }
  };

  const handleDateDisplay = (props: {month: number; year: number}) => {
    const currentYear = new Date().getFullYear();
    if (props.year === currentYear) {
      return `${months[props.month] ? months[props.month] : ''}`;
    }
    if (props.year < currentYear) {
      return `${monthsAbbreviated[props.month] ? monthsAbbreviated[props.month] : ''}/${props.year}`;
    }
    return `${months[props.month] ? months[props.month] : ''} ${props.year}`;
  };

  return (
    <Container>
      <ButtonPrevMonth onPress={previousMonth}>
        <ButtonMonthIconPrev name="arrow-back-ios" size={20} color="#fff" />
      </ButtonPrevMonth>
      <MonthCenter>{handleDateDisplay(date)}</MonthCenter>
      <ButtonNextMonth onPress={nextMonth}>
        <ButtonMonthIconNext name="arrow-forward-ios" size={20} color="#fff" />
      </ButtonNextMonth>
    </Container>
  );
}
