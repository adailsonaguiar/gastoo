import React from 'react';
import {Formik} from 'formik';

import Input from '../../components/Input';
import Header from '../../components/Header';
import {
  Container,
  Form,
  BtnRemove,
  ContainerFormFooter,
  ButtonSave,
} from './styles';
import {AccountFormViewModel} from './index.model';

export default function AccountForm() {
  const {loading, currentAccount, askDelection, onSubmit} =
    AccountFormViewModel();

  return (
    <Container>
      <Header title={currentAccount._id ? 'Atualizar conta' : 'Nova conta'} />
      <Formik
        initialValues={currentAccount}
        onSubmit={values => onSubmit(values)}>
        {({setFieldValue, handleSubmit, values}) => (
          <Form>
            <Input
              label="Descrição"
              value={values.description}
              onChangeText={text => {
                setFieldValue('description', text);
              }}
            />
            <ButtonSave
              label="Salvar"
              onPress={handleSubmit}
              loading={loading}
            />
            {currentAccount._id && (
              <ContainerFormFooter>
                <BtnRemove
                  onPress={() => askDelection(currentAccount)}
                  label="Deletar conta"
                />
              </ContainerFormFooter>
            )}
          </Form>
        )}
      </Formik>
    </Container>
  );
}
