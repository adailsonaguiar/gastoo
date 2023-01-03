import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import React from 'react';
import uuid from 'react-native-uuid';
import {Option} from '../../components/Select';
import {transactionType} from '../../database/schemas/TransactionSchema';
import {Transaction, TransactionBuilder} from '../../models/transaction';
import {fetchAccounts} from '../../services/accountsService';
import {showAlertError} from '../../services/alertService';
import {saveTransaction} from '../../services/transactionsService';
import {
  categoriesExpense,
  categoriesIncome,
} from '../../utils/categoriesTransactions';

type TransactionFormRouteProps = {
  props: {
    formType: string;
    transaction?: Transaction;
  };
};

type FormProps = {
  initialValue: number;
  date: Date;
  accountOption: Option;
  categoryOption: Option;
  rawValue: string;
} & Transaction;

type RouterProps = RouteProp<TransactionFormRouteProps, 'props'>;

export function TransactionFormModel() {
  const navigation = useNavigation();
  const route = useRoute<RouterProps>();
  const FORM_TYPE = route.params?.formType;
  const expenseEdit = route.params?.transaction
    ? route.params?.transaction
    : null;

  function getCategories() {
    if (expenseEdit?.type === transactionType.TRANSACTION_IN) {
      return categoriesIncome;
    }
    return categoriesExpense;
  }

  const currentTransaction: FormProps = {
    _id: expenseEdit ? expenseEdit._id : String(uuid.v4()),
    category: expenseEdit ? getCategories()[expenseEdit.category].value : 0,
    value: expenseEdit ? expenseEdit.value / 100 : 0,
    rawValue: String(expenseEdit ? expenseEdit.value / 100 : 0),
    initialValue: expenseEdit ? expenseEdit.value / 100 : 0,
    description: expenseEdit ? expenseEdit.description : '',
    accountId: expenseEdit ? expenseEdit.accountId : '',
    type: !FORM_TYPE
      ? transactionType.TRANSACTION_OUT
      : transactionType.TRANSACTION_IN,
    status: expenseEdit ? expenseEdit.status : 0,
    day: expenseEdit ? expenseEdit.day : '',
    month: expenseEdit ? expenseEdit.month : '',
    year: expenseEdit ? expenseEdit.year : '',
    date: new Date(),
    accountOption: {value: '', label: ''},
    categoryOption: {value: '', label: ''},
    valueType: expenseEdit ? expenseEdit.valueType : 0,
    createdAt: expenseEdit ? expenseEdit.createdAt : new Date(),
  };

  const [accounts, setAccounts] = React.useState<
    {value: string; label: string}[]
  >([]);

  function handleNoAccounts() {
    showAlertError('Você precisa cadastrar uma conta primeiro!');
    navigation.goBack();
  }

  async function mapAccounts() {
    const response = await fetchAccounts();
    if (response?.length) {
      const mappedSelectOptions = response.map(item => {
        return {
          value: item._id,
          label: item.description,
        };
      });
      setAccounts(mappedSelectOptions);
    } else {
      handleNoAccounts();
    }
  }

  React.useEffect(() => {
    if (!accounts.length) {
      mapAccounts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accounts.length]);

  function validateForm(values: FormProps) {
    if (!values.description.length) {
      showAlertError('Digite uma descrição');
      return false;
    }
    if (!values.categoryOption.value) {
      showAlertError('Selecione uma categoria');
      return false;
    }
    if (!values.accountOption.value) {
      showAlertError('Selecione uma conta');
      return false;
    }
    return true;
  }

  function handleValueType(type: string, transactionValue: number) {
    if (type === transactionType.TRANSACTION_OUT) {
      return -transactionValue;
    }
    if (type === transactionType.TRANSACTION_IN) {
      return +transactionValue;
    }
    return 0;
  }

  async function onSubmit(values: FormProps) {
    const convertedValue = Number(values.rawValue) * 100;
    let valueType = 0;
    if (values.status) {
      valueType = handleValueType(values.type, convertedValue);
    }
    if (validateForm(values)) {
      const transactionToSave = TransactionBuilder({
        accountId: values.accountOption.value.toString(),
        category: values.categoryOption.value,
        day: String(values.date.getDate()),
        month: String(values.date.getMonth() + 1),
        year: String(values.date.getFullYear()),
        description: values.description,
        _id: values._id,
        status: values.status,
        type: values.type,
        value: convertedValue,
        valueType: valueType,
        createdAt: values.createdAt,
      });

      saveTransaction(transactionToSave);
      navigation.goBack();
    }
  }

  // const handleDelete = (transaction: Transaction) => {
  //   // dispatch(deleteTransaction(transaction));
  //   navigation.goBack();
  // };

  return {onSubmit, currentTransaction, expenseEdit, FORM_TYPE, accounts};
}
