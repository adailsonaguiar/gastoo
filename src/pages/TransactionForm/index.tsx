import React, {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import {Formik} from 'formik';
import {RouteProp} from '@react-navigation/native';
import Input from '../../components/Input';
import Select from '../../components/Select';
import {
  categoriesExpense,
  categoriesIncome,
  getArrayCategoriesIncome,
  getArrayCategoriesExpense,
} from '../../utils/categoriesTransactions';

import colors from '../../styles/colors';
import {Container, Form, ButtonSave, Switch, CustomDatePicker} from './styles';

import {transactionType} from '../../database/schemas/TransactionSchema';
import Header from '../../components/Header';
import {showAlertError} from '../../services/alertService';
import {BtnRemove, ContainerFormFooter} from '../AccountForm/styles';
import {Transaction} from '../../models/transaction';

type TransactionFormRouteProps = {
  props: {
    formType: string;
    transaction?: Transaction;
  };
};

type FormProps = {
  initialValue: number;
  date: Date;
} & Transaction;

type TransactionFormProps = {
  navigation: any;
  route: RouteProp<TransactionFormRouteProps, 'props'>;
};

const TransactionForm = ({navigation, route}: TransactionFormProps) => {
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

  // function dateExpense() {
  //   return expenseEdit
  //     ? new Date(
  //         `${expenseEdit.year}-${formatteNumber(
  //           expenseEdit.month,
  //         )}-${formatteNumber(expenseEdit.day + 1)}T00:00:00.000Z`,
  //       )
  //     : new Date();
  // }

  const INITIAL_VALUES: FormProps = {
    id: expenseEdit ? expenseEdit.id : '',
    category: expenseEdit ? getCategories()[expenseEdit.category].value : 0,
    value: expenseEdit ? expenseEdit.value / 100 : 0,
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
  };

  // const dispatch = useDispatch();
  // const accountsSaved = useSelector(state => state.accounts.accounts);
  // const loading = useSelector(state => state.transactions.loading);
  const [arraySelect, setArraySelect] = useState([]);
  // const refs = {};

  useEffect(() => {
    // if (!accountsSaved.length) {
    //   showAlertError('Você precisa cadastrar uma conta primeiro!');
    //   navigation.navigate(pages.accountForm);
    // } else if (expenseEdit) {
    //   const accountFiltered = accountsSaved.filter(item => {
    //     if (expenseEdit) {
    //       if (item.id === expenseEdit.accountId) {
    //         return item;
    //       }
    //     }
    //   });
    //   INITIAL_VALUES.account = accountFiltered
    //     ? accounts[accountFiltered[0].account]
    //     : {};
    // }
    // const accountIndetify = accountsSaved.map(account => ({
    //   ...standardAccounts[account.account],
    //   id: account.id,
    //   label: `${account.description} | ${
    //     standardAccounts[account.account].label
    //   }`,
    // }));
    // setArraySelect(accountIndetify);
  }, []);

  function validateForm(values: FormProps) {
    if (!values.description.length) {
      showAlertError('Digite uma descrição');
      return false;
    }
    if (!values.category) {
      showAlertError('Selecione uma categoria');
      return false;
    }
    if (values.accountId === null) {
      showAlertError('Selecione uma conta');
      return false;
    }
    return true;
  }

  async function onSubmit(values: FormProps) {
    if (validateForm(values)) {
      if (!expenseEdit) {
        // const idMaxAccount = await getId(SCHEMAS.TRANSACTION);
        // values.id = idMaxAccount;
      }
      // if (typeof values.value === 'string') {
      //   values.value = refs.value.getRawValue();
      // }
      values.value = values.value * 100;
      values.status = values.status ? 1 : 0;
      // values.category = values.category;
      // const account = values.account.value;
      // values.day = String(values.date.getDate());
      // values.month = String(values.date.getMonth() + 1);
      // values.year = String(values.date.getFullYear());

      // dispatch(saveTransactions({...values, account}));
    }
  }

  function handleSceneTitle() {
    if (expenseEdit) {
      return 'Editar';
    }
    if (!FORM_TYPE) {
      return 'Nova despesa';
    }
    return 'Nova receita';
  }

  const askDelection = async (transaction: Transaction) => {
    Alert.alert(
      'Atenção',
      'Deseja realmente deletar essa transação?',
      [
        {
          text: 'Cancelar',
          onPress: () => {},
        },
        {
          text: 'Sim',
          onPress: () => {
            // handleDelete(transaction);
          },
        },
      ],
      {cancelable: false},
    );
  };

  // const handleDelete = (transaction: Transaction) => {
  //   // dispatch(deleteTransaction(transaction));
  //   navigation.goBack();
  // };

  return (
    <>
      <Header
        title={handleSceneTitle()}
        lineColor={!FORM_TYPE ? colors.colorDanger : colors.greenApp}
        navigation={navigation}
      />
      <Container>
        <Formik
          initialValues={INITIAL_VALUES}
          onSubmit={values => onSubmit(values)}>
          {({setFieldValue, handleSubmit, values}) => (
            <Form>
              <Input
                label="Descrição"
                value={values.description}
                onChangeText={text => setFieldValue('description', text)}
                placeholder={
                  !FORM_TYPE ? 'Compras mercadinho' : 'Prestação de seriço'
                }
              />
              <Select
                placeholder="Selecione uma categoria"
                label="Categoria"
                options={
                  !FORM_TYPE
                    ? getArrayCategoriesExpense()
                    : getArrayCategoriesIncome()
                }
                value={values.category}
                onValueChange={obj => setFieldValue('category', obj)}
              />
              <CustomDatePicker
                date={values.date}
                setDate={value => {
                  if (value) {
                    setFieldValue('date', new Date(value));
                  }
                }}
              />
              <Select
                placeholder="Selecione uma conta"
                label="Contas"
                options={arraySelect}
                value={values.accountId}
                onValueChange={selected =>
                  setFieldValue('accountId', selected.id)
                }
              />
              <Input
                label="Valor"
                type={'money'}
                options={{
                  precision: 2,
                  separator: ',',
                  delimiter: '.',
                  unit: 'R$',
                  suffixUnit: '',
                }}
                onChangeText={maskedText => {
                  setFieldValue('value', maskedText);
                }}
                value={values.value.toString()}
                // ref={ref => (refs.value = ref)}
                placeholder="R$ 120,00"
              />
              <Switch
                toggleSwitch={() => setFieldValue('status', !values.status)}
                isEnabled={!!values.status}
                labelEnable={!FORM_TYPE ? 'PAGO' : 'RECEBIDO'}
                labelDisable={!FORM_TYPE ? 'NÃO PAGO' : 'NÃO RECEBIDO'}
              />
              {expenseEdit && (
                <ContainerFormFooter>
                  <BtnRemove
                    label="Deletar transação"
                    onPress={() => {
                      askDelection(INITIAL_VALUES);
                    }}
                  />
                </ContainerFormFooter>
              )}
              <ButtonSave label="Salvar" onPress={handleSubmit} />
            </Form>
          )}
        </Formik>
      </Container>
    </>
  );
};

export default TransactionForm;
