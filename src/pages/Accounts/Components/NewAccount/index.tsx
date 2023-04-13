import React from 'react';
import {Formik} from 'formik';

import {AccountFormViewModel} from './index.model';
import {useRealm} from '../../../../store/realm';

import Header from '../../../../components/Header';
import {FormContentWrapper} from '../../../../components/FormContentWrapper';
import Input from '../../../../components/Input';
import {ColorsList} from '../../../../components/ColorsList';

import {BtnRemove, ContainerFormFooter, ButtonSave, Form} from './styles';
import {Account} from '../../../../models/Accounts';
import RadioAccountType from '../RadioAccountType';

type NewAccountProps = {
  account?: Account;
  onFishInteration: () => void;
};

export default function NewAccount({account, onFishInteration}: NewAccountProps) {
  const {realm} = useRealm();

  const {loading, currentAccount, askDelection, onSubmit} = AccountFormViewModel(realm, onFishInteration, account);

  return (
    <>
      <Header title={currentAccount._id ? 'Atualizar conta' : 'Nova conta'} style="light" padding={1} />
      <Formik initialValues={currentAccount} onSubmit={values => onSubmit(values)}>
        {({setFieldValue, handleSubmit, values}) => (
          <Form>
            <FormContentWrapper>
              <Input
                label="Nome da conta"
                value={values.description}
                onChangeText={text => {
                  setFieldValue('description', text);
                }}
                lineLeftColor={values.color}
              />
            </FormContentWrapper>
            <FormContentWrapper>
              {/* <Select
                placeholder="Selecione o tipo de conta"
                label="Tipo de conta"
                options={getAccountCategoriesList()}
                value={values.accountType}
                onValueChange={obj => {
                  setFieldValue('accountType', obj);
                  setFieldValue('type', obj.value);
                }}
              /> */}
              <RadioAccountType type={values.type} toggleSwitch={obj => setFieldValue('type', obj)} />
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
    </>
  );
}
