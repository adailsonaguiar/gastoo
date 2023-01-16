import React, {useEffect} from 'react';
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
import {useDate} from '../../store/date';

type MothHeaderProps = {
  onChangeMonth: (props: {month: number; year: number}) => void;
};

export default function MothHeader({onChangeMonth}: MothHeaderProps) {
  const {month, year, setMonthYear} = useDate(state => state);

  useEffect(() => {
    getDate();
  }, []);

  const getDate = () => {
    const date = new Date();
    setMonthYear(date.getMonth(), date.getFullYear());
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonthYear(0, year + 1);
      onChangeMonth({month: 1, year: year + 1});
    } else {
      setMonthYear(month + 1, year);
      onChangeMonth({month: month + 2, year: year});
    }
  };
  const previousMonth = () => {
    if (month === 0) {
      setMonthYear(11, year - 1);
      onChangeMonth({month: 12, year: year - 1});
    } else {
      setMonthYear(month - 1, year);
      onChangeMonth({month: month, year: year});
    }
  };

  const handleDateDisplay = (props: {month: number; year: number}) => {
    const currentYear = new Date().getFullYear();
    if (props.year === currentYear) {
      return `${months[props.month] ? months[props.month] : ''}`;
    }
    if (props.year < currentYear) {
      return `${
        monthsAbbreviated[props.month] ? monthsAbbreviated[props.month] : ''
      }/${props.year}`;
    }
    return `${months[props.month] ? months[props.month] : ''} ${props.year}`;
  };

  const showPreviousMonth = (props: {month: number; year: number}) => {
    const currentYear = new Date().getFullYear();
    let yearToShow = 0;
    let monthToShow = '';
    if (month === 0) {
      yearToShow = props.year - 1;
      monthToShow = monthsAbbreviated[11] ? monthsAbbreviated[11] : '';
    } else {
      yearToShow = props.year;
      monthToShow = monthsAbbreviated[props.month - 1]
        ? monthsAbbreviated[props.month - 1]
        : '';
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
    if (month === 11) {
      monthToShow = monthsAbbreviated[0];
      yearToShow = props.year + 1;
    } else {
      monthToShow = monthsAbbreviated[props.month + 1]
        ? monthsAbbreviated[props.month + 1]
        : '';
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
        <Month>{showPreviousMonth({month, year})}</Month>
      </ButtonPrevMonth>
      <MonthCenter>{handleDateDisplay({month, year})}</MonthCenter>
      <ButtonNextMonth onPress={nextMonth} style={{opacity: 0.5}}>
        <Month>{showNextMonth({month, year})}</Month>
        <ButtonMonthIconNext source={ArrowRight} />
      </ButtonNextMonth>
    </Container>
  );
}
