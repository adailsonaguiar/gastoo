import React, {useState, useEffect} from 'react';
import {Image} from 'react-native';
import months from '../../utils/months';

import ArrowLeft from '../../assets/arrow-rounded-left.png';
import ArrowRight from '../../assets/arrow-rounded-right.png';

import {Container, Month, ButtonMonth} from './styles';

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
    return `${months[props.month] ? months[props.month] : ''} ${props.year}`;
  };

  return (
    <Container>
      <ButtonMonth onPress={previousMonth}>
        <Image source={ArrowLeft} />
      </ButtonMonth>
      <Month>{handleDateDisplay({month, year})}</Month>
      <ButtonMonth onPress={nextMonth}>
        <Image source={ArrowRight} />
      </ButtonMonth>
    </Container>
  );
}
