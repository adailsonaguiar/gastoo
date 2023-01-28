import {transactionType} from '../database/schemas/TransactionSchema';
import {Transaction} from '../models/transaction';
import {categoriesExpense, categoriesIncome} from './categoriesTransactions';

export function setTwoDigits(month: number) {
  return month < 10 ? `0${month}` : `${month}`;
}

export const getDate = () => {
  return new Promise((resolve, _) => {
    const date = new Date();
    const day = setTwoDigits(date.getDate());
    const month = setTwoDigits(date.getMonth() + 1);
    resolve({day: `${day}`, month: `${month}`, year: `${date.getFullYear()}`});
  });
};

export const formatMoney = (value: number) => {
  let amount = Number(value) / 100;
  let decimalCount = 2;
  let decimal = ',';
  let thousands = '.';
  try {
    decimalCount = Math.abs(decimalCount);
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

    const negativeSign = amount < 0 ? '-' : '';

    let i = parseInt((amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))).toString();
    let j = i.length > 3 ? i.length % 3 : 0;

    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : '') +
      i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
      (decimalCount
        ? decimal +
          Math.abs(amount - i)
            .toFixed(decimalCount)
            .slice(2)
        : '')
    );
  } catch (e) {
    console.log(e);
  }
};

export const formatteNumber = (number: string) => {
  if (Number(number) < 10) {
    return `0${number}`;
  }
  return number;
};

export function getCategories(transaction: Transaction) {
  if (transaction.type === transactionType.TRANSACTION_IN) {
    return categoriesIncome;
  }
  return categoriesExpense;
}

export function getTransactionStatus(status: number) {
  const statusList: {[key: number]: string} = {
    0: 'Pendente',
    1: 'Confirmado',
    2: '',
  };
  return statusList[status];
}
