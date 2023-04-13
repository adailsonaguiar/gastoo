import React from 'react';

import * as S from './styles';
import {Label} from '../../../../components/Label';
import {AccountCategories} from '../../../../utils/categoriesAccounts';

type RadioAccountTypeProp = {
  toggleSwitch: (value: number) => void;
  label?: string;
  type?: number;
};

const RadioAccountType = ({type, toggleSwitch}: RadioAccountTypeProp) => {
  const [buttonActive, setButtonActive] = React.useState(type);

  function toggleButton(button: number) {
    setButtonActive(button);
    toggleSwitch(button);
  }
  return (
    <S.Container>
      <Label>Tipo de conta</Label>
      <S.CustomRadio
        label="Conta corrente"
        onPress={() => toggleButton(AccountCategories.CONTA_CORRENTE)}
        disabled={buttonActive === AccountCategories.CONTA_CORRENTE}
      />
      <S.CustomRadio
        label="Conta de investimentos"
        onPress={() => toggleButton(AccountCategories.CONTA_INVESTIMENTO)}
        disabled={buttonActive === AccountCategories.CONTA_INVESTIMENTO}
      />
    </S.Container>
  );
};

export default RadioAccountType;
