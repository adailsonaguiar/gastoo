/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import months, {monthsAbbreviated} from '../../utils/months';

import ArrowLeft from '../../assets/chevron-left-black.png';
import ArrowRight from '../../assets/chevron-right-black.png';

import {
  Container,
  Month,
  ButtonPrevMonth,
  ButtonNextMonth,
  ButtonMonthIconPrev,
  ButtonMonthIconNext,
  MonthCenter,
} from './styles';

type MothHeaderProps = {
  onChangeMonth: (props: {month: number; year: number}) => void;
};

export default function MothHeader({onChangeMonth}: MothHeaderProps) {
  const currentDate = new Date();
  const [date, setDate] = React.useState({month: currentDate.getMonth(), year: currentDate.getFullYear()});

  React.useEffect(() => {
    onChangeMonth({month: date.month + 1, year: date.year});
  }, [date]);

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

  const showPreviousMonth = (props: {month: number; year: number}) => {
    const currentYear = new Date().getFullYear();
    let yearToShow = 0;
    let monthToShow = '';
    if (date.month === 0) {
      yearToShow = props.year - 1;
      monthToShow = monthsAbbreviated[11] ? monthsAbbreviated[11] : '';
    } else {
      yearToShow = props.year;
      monthToShow = monthsAbbreviated[props.month - 1] ? monthsAbbreviated[props.month - 1] : '';
    }
    if (yearToShow === currentYear) {
      return `${monthToShow}`;
    }
    return `${monthToShow}/${yearToShow}`;
  };

  const showNextMonth = (props: {month: number; year: number}) => {
    const currentYear = new Date().getFullYear();
    let yearToShow = 0;
    let monthToShow = '';
    if (date.month === 11) {
      monthToShow = monthsAbbreviated[0];
      yearToShow = props.year + 1;
    } else {
      monthToShow = monthsAbbreviated[props.month + 1] ? monthsAbbreviated[props.month + 1] : '';
      yearToShow = props.year;
    }
    if (yearToShow === currentYear) {
      return `${monthToShow}`;
    }
    return `${monthToShow}/${yearToShow}`;
  };

  return (
    <Container>
      <ButtonPrevMonth onPress={previousMonth} style={{opacity: 0.5}}>
        <ButtonMonthIconPrev source={ArrowLeft} />
        <Month>{showPreviousMonth(date)}</Month>
      </ButtonPrevMonth>
      <MonthCenter>{handleDateDisplay(date)}</MonthCenter>
      <ButtonNextMonth onPress={nextMonth} style={{opacity: 0.5}}>
        <Month>{showNextMonth(date)}</Month>
        <ButtonMonthIconNext source={ArrowRight} />
      </ButtonNextMonth>
    </Container>
  );
}
