import React from 'react';
import {Formik} from 'formik';

import Input from '../../components/Input';
import Header from '../../components/Header';
import {Container, Form, BtnRemove, ContainerFormFooter, ButtonSave} from './styles';
import {AccountFormViewModel} from './index.model';
import {ColorsList} from '../../components/ColorsList';
import {useNavigation} from '@react-navigation/native';
import {FormContentWrapper} from '../../components/FormContentWrapper';
import {useRealm} from '../../store/realm';
import Select from '../../components/Select';
import {getAccountCategoriesList} from '../../utils/categoriesAccounts';

export default function AccountForm() {
  const {realm} = useRealm();

  const {loading, currentAccount, askDelection, onSubmit} = AccountFormViewModel(realm);
  const navigation = useNavigation();

  return (
    <Container>
      <Header
        title={currentAccount._id ? 'Atualizar conta' : 'Nova conta'}
        onClose={() => navigation.goBack()}
        style="light"
      />
      <Formik initialValues={currentAccount} onSubmit={values => onSubmit(values)}>
        {({setFieldValue, handleSubmit, values}) => (
          <Form>
            <FormContentWrapper>
              <Input
                label="Descrição"
                value={values.description}
                onChangeText={text => {
                  setFieldValue('description', text);
                }}
                lineLeftColor={values.color}
              />
            </FormContentWrapper>
            <FormContentWrapper>
              <Select
                placeholder="Selecione o tipo de conta"
                label="Tipo de conta"
                options={getAccountCategoriesList()}
                value={values.accountType}
                onValueChange={obj => {
                  setFieldValue('accountType', obj);
                  setFieldValue('type', obj.value);
                }}
              />
            </FormContentWrapper>
            <FormContentWrapper>
              <ColorsList handleColor={color => setFieldValue('color', color)} />
            </FormContentWrapper>
            <ContainerFormFooter>
              <ButtonSave label="Salvar" onPress={handleSubmit} loading={loading} />
              {currentAccount._id && <BtnRemove onPress={() => askDelection(currentAccount)} label="Deletar conta" />}
            </ContainerFormFooter>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
