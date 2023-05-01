import React from 'react';
import {Alert} from 'react-native';

import Input from '../../components/Input';
import Select from '../../components/Select';
import {getArrayCategoriesIncome, getArrayCategoriesExpense} from '../../utils/categoriesTransactions';

import {Container, Form, Switch, CustomDatePicker, ButtonSave} from './styles';

import Header from '../../components/Header';
// import {BtnRemove, ContainerFormFooter} from '../AccountForm/styles';
import {Transaction} from '../../models/transaction';
import InputMask from '../../components/InputMask';
import {TransactionFormModel} from './index.model';
import {useNavigation} from '@react-navigation/native';
import {FormContentWrapper} from '../../components/FormContentWrapper';
import {useRealm} from '../../store/realm';
import {BtnRemove, ContainerFormFooter} from '../Accounts/Components/NewAccount/styles';
import {transactionType} from '../../database/schemas/TransactionSchema';

const TransactionForm = () => {
  const {realm} = useRealm();

  const {formik, expenseEdit, accounts, handleDelete, FORM_TYPE, loading} = TransactionFormModel(realm);
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
      <Header title={handleSceneTitle()} style="light" onClose={() => navigation.goBack()} />
      <Container>
        <Form>
          <FormContentWrapper>
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
              value={String(Math.round(formik.values.value * 100))}
              includeRawValueInChangeText={true}
              placeholder="R$ 120,00"
              mainInput
            />
          </FormContentWrapper>
          <FormContentWrapper>
            <Select
              placeholder="Selecione uma categoria"
              headerTitle="Selecione uma categoria"
              label="Categoria"
              transactionsType={!FORM_TYPE ? transactionType.TRANSACTION_OUT : transactionType.TRANSACTION_IN}
              options={!FORM_TYPE ? getArrayCategoriesExpense() : getArrayCategoriesIncome()}
              value={formik.values.categoryOption}
              onValueChange={obj => formik.setFieldValue('categoryOption', obj)}
            />
          </FormContentWrapper>
          <FormContentWrapper>
            <Select
              placeholder="Selecione uma conta"
              headerTitle="Selecione uma conta"
              label="Contas"
              options={accounts}
              value={formik.values.accountOption}
              onValueChange={selected => formik.setFieldValue('accountOption', selected)}
            />
          </FormContentWrapper>
          <FormContentWrapper>
            <CustomDatePicker
              date={formik.values.date}
              setDate={value => {
                if (value) {
                  formik.setFieldValue('date', new Date(value));
                }
              }}
            />
          </FormContentWrapper>
          <FormContentWrapper>
            <Input
              label="Descrição"
              value={formik.values.description}
              onChangeText={text => formik.setFieldValue('description', text)}
              placeholder={!FORM_TYPE ? 'Compras mercadinho' : 'Prestação de serviço'}
            />
          </FormContentWrapper>
          {!expenseEdit?._id && (
            <FormContentWrapper>
              <Switch
                toggleSwitch={value => formik.setFieldValue('recurrence', value ? 1 : 0)}
                isEnabled={!!formik.values.recurrence}
                labelEnable={'Repetir todo mês'}
                labelDisable={'Não repetir'}
              />
            </FormContentWrapper>
          )}
          <FormContentWrapper>
            <Switch
              toggleSwitch={value => formik.setFieldValue('status', value ? 1 : 0)}
              isEnabled={!!formik.values.status}
              labelEnable={!FORM_TYPE ? 'Pago' : 'Recebido'}
              labelDisable={!FORM_TYPE ? 'Não pago' : 'Não recebido'}
            />
          </FormContentWrapper>
          <ContainerFormFooter>
            <ButtonSave label="Salvar" onPress={formik.handleSubmit} loading={loading} />
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
