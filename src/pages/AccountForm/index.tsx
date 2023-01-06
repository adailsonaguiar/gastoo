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
import {ColorsList} from '../../components/ColorsList';
import {useNavigation} from '@react-navigation/native';

export default function AccountForm() {
  const {loading, currentAccount, askDelection, onSubmit} =
    AccountFormViewModel();
  const navigation = useNavigation();

  return (
    <Container>
      <Header
        title={currentAccount._id ? 'Atualizar conta' : 'Nova conta'}
        onClose={() => navigation.goBack()}
      />
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
              lineLeftColor={values.color}
            />
            <ColorsList handleColor={color => setFieldValue('color', color)} />
            <ContainerFormFooter>
              <ButtonSave
                label="Salvar"
                onPress={handleSubmit}
                loading={loading}
              />
              {currentAccount._id && (
                <BtnRemove
                  onPress={() => askDelection(currentAccount)}
                  label="Deletar conta"
                />
              )}
            </ContainerFormFooter>
          </Form>
        )}
      </Formik>
    </Container>
  );
}
