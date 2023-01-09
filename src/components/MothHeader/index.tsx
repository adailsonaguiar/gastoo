import React, {useState, useEffect} from 'react';
import months, {monthsAbbreviated} from '../../utils/months';

import ArrowLeft from '../../assets/chevron-left-black.png';
import ArrowRight from '../../assets/chevron-right-black.png';

import {
  Container,
  Month,
  ButtonMonth,
  ButtonMonthIcon,
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
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);

  useEffect(() => {
    getDate();
  }, []);

  const getDate = () => {
    const date = new Date();
    setMonth(date.getMonth());
    setYear(date.getFullYear());
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear(year + 1);
      onChangeMonth({month: 1, year: year + 1});
    } else {
      setMonth(month + 1);
      onChangeMonth({month: month + 2, year: year});
    }
  };
  const previousMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
      onChangeMonth({month: 12, year: year - 1});
    } else {
      setMonth(month - 1);
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
    return `${monthToShow}/${year}`;
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
