import React, {useState, useEffect} from 'react';
import months from '../../utils/months';

import ArrowLeft from '../../assets/arrow-rounded-left.png';
import ArrowRight from '../../assets/arrow-rounded-right.png';

import {Container, Month, ButtonMonth} from './styles';
import {Image} from 'react-native';

export default function MothHeader() {
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
      console.log(1);

      // dispatch(loadTransactions({month: 1, year: year + 1}));
    } else {
      setMonth(month + 1);
      // dispatch(loadTransactions({month: month + 2, year: year}));
    }
  };
  const previousMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear(year - 1);
      // dispatch(loadTransactions({month: 12, year: year - 1}));
    } else {
      setMonth(month - 1);
      // dispatch(loadTransactions({month: month, year: year}));
    }
  };

  return (
    <Container>
      <ButtonMonth onPress={previousMonth}>
        <Image source={ArrowLeft} />
      </ButtonMonth>
      <Month>{`${months[month] ? months[month] : ''} ${year}`}</Month>
      <ButtonMonth onPress={nextMonth}>
        <Image source={ArrowRight} />
      </ButtonMonth>
    </Container>
  );
}
