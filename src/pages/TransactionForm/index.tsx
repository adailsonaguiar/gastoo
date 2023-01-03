import React from 'react';
import {Alert} from 'react-native';
import {Formik} from 'formik';

import Input from '../../components/Input';
import Select from '../../components/Select';
import {
  getArrayCategoriesIncome,
  getArrayCategoriesExpense,
} from '../../utils/categoriesTransactions';

import colors from '../../styles/colors';
import {Container, Form, ButtonSave, Switch, CustomDatePicker} from './styles';

import Header from '../../components/Header';
import {BtnRemove, ContainerFormFooter} from '../AccountForm/styles';
import {Transaction} from '../../models/transaction';
import InputMask from '../../components/InputMask';
import {TransactionFormModel} from './index.model';

const TransactionForm = () => {
  const {currentTransaction, onSubmit, expenseEdit, accounts, FORM_TYPE} =
    TransactionFormModel();
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
            console.log(transaction);

            // handleDelete(transaction);
          },
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <>
      <Header
        title={handleSceneTitle()}
        lineColor={!FORM_TYPE ? colors.colorDanger : colors.greenApp}
      />
      <Container>
        <Formik
          initialValues={currentTransaction}
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
                onValueChange={obj => setFieldValue('categoryOption', obj)}
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
                options={accounts}
                value={values.accountId}
                onValueChange={selected =>
                  setFieldValue('accountOption', selected)
                }
              />
              <InputMask
                label="Valor"
                type={'money'}
                options={{
                  precision: 2,
                  separator: ',',
                  delimiter: '.',
                  unit: 'R$',
                  suffixUnit: '',
                }}
                onChangeMasked={(maskedValue: string, rawValue: string) => {
                  setFieldValue('value', maskedValue);
                  setFieldValue('rawValue', rawValue);
                }}
                value={values.value.toString()}
                includeRawValueInChangeText={true}
                placeholder="R$ 120,00"
              />
              <Switch
                toggleSwitch={() =>
                  setFieldValue('status', values.status === 0 ? 1 : 0)
                }
                isEnabled={!!values.status}
                labelEnable={!FORM_TYPE ? 'PAGO' : 'RECEBIDO'}
                labelDisable={!FORM_TYPE ? 'NÃO PAGO' : 'NÃO RECEBIDO'}
              />
              {expenseEdit && (
                <ContainerFormFooter>
                  <BtnRemove
                    label="Deletar transação"
                    onPress={() => {
                      askDelection(currentTransaction);
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
