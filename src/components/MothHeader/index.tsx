import React, {useState, useEffect} from 'react';
import {loadAccounts} from '../../store/accounts/actions';
import {loadTransactions} from '../../store/transactions/actions';
import colors from '../../styles/colors';
import {setTwoDigits} from '../../utils/FunctionUtils';
import months from '../../utils/months';
import {Container, Month, CustomIcon, ButtonMonth} from './styles';

export default function MothHeader() {
  // const dispatch = useDispatch();
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
        <CustomIcon
          name="keyboard-arrow-left"
          color={colors.greenApp}
          size={30}
        />
      </ButtonMonth>
      <Month>{`${months[month] ? months[month] : ''} ${year}`}</Month>
      <ButtonMonth onPress={nextMonth}>
        <CustomIcon
          name="keyboard-arrow-right"
          color={colors.greenApp}
          size={30}
        />
      </ButtonMonth>
    </Container>
  );
}
