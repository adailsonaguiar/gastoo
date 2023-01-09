import React from 'react';
import {Alert} from 'react-native';

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
import {useNavigation} from '@react-navigation/native';

const TransactionForm = () => {
  const {formik, expenseEdit, accounts, handleDelete, FORM_TYPE} =
    TransactionFormModel();
  const navigation = useNavigation();
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
            handleDelete(transaction);
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
        onClose={() => navigation.goBack()}
      />
      <Container>
        <Form>
          <InputMask
            label="Valor"
            type={'money'}
            autoFocus
            options={{
              precision: 2,
              separator: ',',
              delimiter: '.',
              unit: 'R$',
              suffixUnit: '',
            }}
            onChangeMasked={(maskedValue: string, rawValue: string) => {
              formik.setFieldValue('value', maskedValue);
              formik.setFieldValue('rawValue', rawValue);
            }}
            value={String(formik.values.value * 100)}
            includeRawValueInChangeText={true}
            placeholder="R$ 120,00"
            mainInput
          />

          <Select
            placeholder="Selecione uma categoria"
            label="Categoria"
            options={
              !FORM_TYPE
                ? getArrayCategoriesExpense()
                : getArrayCategoriesIncome()
            }
            value={formik.values.categoryOption}
            onValueChange={obj => formik.setFieldValue('categoryOption', obj)}
          />

          <Select
            placeholder="Selecione uma conta"
            label="Contas"
            options={accounts}
            value={formik.values.accountOption}
            onValueChange={selected =>
              formik.setFieldValue('accountOption', selected)
            }
          />
          <CustomDatePicker
            date={formik.values.date}
            setDate={value => {
              if (value) {
                formik.setFieldValue('date', new Date(value));
              }
            }}
          />
          <Input
            label="Descrição"
            value={formik.values.description}
            onChangeText={text => formik.setFieldValue('description', text)}
            placeholder={
              !FORM_TYPE ? 'Compras mercadinho' : 'Prestação de serviço'
            }
          />

          <Switch
            toggleSwitch={value =>
              formik.setFieldValue('status', value ? 1 : 0)
            }
            isEnabled={!!formik.values.status}
            labelEnable={!FORM_TYPE ? 'PAGO' : 'RECEBIDO'}
            labelDisable={!FORM_TYPE ? 'NÃO PAGO' : 'NÃO RECEBIDO'}
          />
          <ContainerFormFooter>
            <ButtonSave label="Salvar" onPress={formik.handleSubmit} />
            {expenseEdit && (
              <BtnRemove
                label="Deletar transação"
                onPress={() => {
                  askDelection(formik.values);
                }}
              />
            )}
          </ContainerFormFooter>
        </Form>
      </Container>
    </>
  );
};

export default TransactionForm;
