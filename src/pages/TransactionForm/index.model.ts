import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {useFormik} from 'formik';
import React from 'react';
import uuid from 'react-native-uuid';
import {Option} from '../../components/Select';
import {transactionType} from '../../database/schemas/TransactionSchema';
import {Account} from '../../models/Accounts';
import {Transaction, TransactionBuilder} from '../../models/transaction';
import {fetchAccounts} from '../../services/accountsService';
import {showAlertError} from '../../services/alertService';
import {
  deleteTransaction,
  saveTransaction,
} from '../../services/transactionsService';
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
  date: Date;
  accountOption: Option;
  categoryOption: Option;
  rawValue: string;
} & Transaction;

type RouterProps = RouteProp<TransactionFormRouteProps, 'props'>;

export function TransactionFormModel() {
  const route = useRoute<RouterProps>();
  const FORM_TYPE = route.params?.formType;
  const INITIAL_FORM_VALUES: FormProps = {
    _id: String(uuid.v4()),
    category: 0,
    value: 0,
    rawValue: '',
    initialValue: 0,
    description: '',
    accountId: '',
    type: !FORM_TYPE
      ? transactionType.TRANSACTION_OUT
      : transactionType.TRANSACTION_IN,
    status: 0,
    day: '',
    month: '',
    year: '',
    date: new Date(),
    accountOption: {value: '', label: ''},
    categoryOption: {value: '', label: ''},
    valueType: 0,
    createdAt: new Date(),
  };
  const navigation = useNavigation();
  const expenseEdit = route.params?.transaction
    ? route.params?.transaction
    : null;

  const formik = useFormik({
    initialValues: INITIAL_FORM_VALUES,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async values => onSubmit(values),
  });

  function getCategories() {
    if (expenseEdit?.type === transactionType.TRANSACTION_IN) {
      return categoriesIncome;
    }
    return categoriesExpense;
  }

  const [accounts, setAccounts] = React.useState<
    {value: string; label: string}[]
  >([]);

  function handleNoAccounts() {
    showAlertError('Você precisa cadastrar uma conta primeiro!');
    navigation.goBack();
  }

  function updateFormValues(values: FormProps) {
    formik.setValues(values);
  }

  function getTransactionAccount(accountsResponse: Account[]) {
    const account = accountsResponse.find(
      item => item._id === expenseEdit?.accountId,
    );
    if (account) {
      updateFormValues({
        ...formik.values,
        accountId: account._id,
        accountOption: {value: account._id, label: account.description},
      });
    }
  }

  async function mapAccounts() {
    const response = await fetchAccounts();
    if (response?.length) {
      getTransactionAccount(response);
      const mappedSelectOptions = response.map(item => {
        return {
          value: item._id,
          label: item.description,
          color: item.color,
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
    if (expenseEdit?._id) {
      updateFormValues({
        ...formik.values,
        _id: expenseEdit._id,
        category: expenseEdit.category,
        value: expenseEdit.value / 100,
        rawValue: (expenseEdit.value / 100).toString(),
        initialValue: expenseEdit.status === 0 ? 0 : expenseEdit.value,
        description: expenseEdit.description,
        accountId: expenseEdit.accountId,

        type: !FORM_TYPE
          ? transactionType.TRANSACTION_OUT
          : transactionType.TRANSACTION_IN,
        status: expenseEdit.status,
        day: expenseEdit.day,
        month: expenseEdit.month,
        year: expenseEdit.year,

        date: new Date(
          `${expenseEdit.year}-${expenseEdit.month}-${
            Number(expenseEdit.day) + 1
          }`,
        ),
        categoryOption: getCategories()[expenseEdit.category],
        valueType: expenseEdit.valueType,
        createdAt: expenseEdit.createdAt,
      });
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
        initialValue: values.initialValue,
      });
      await saveTransaction(transactionToSave);
      navigation.goBack();
    }
  }

  const handleDelete = (transaction: Transaction) => {
    transaction.valueType = 0;
    deleteTransaction(transaction);
    navigation.goBack();
  };

  return {
    formik,
    expenseEdit,
    FORM_TYPE,
    accounts,
    handleDelete,
  };
}
