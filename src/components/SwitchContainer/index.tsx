import React from 'react';
import colors from '../../styles/colors';

import * as S from './styles';

type SwitchContainerProp = {
  toggleSwitch: () => void;
  isEnabled: boolean;
  labelEnable: string;
  labelDisable: string;
};

const SwitchContainer = ({
  toggleSwitch,
  isEnabled,
  labelEnable,
  labelDisable,
  ...rest
}: SwitchContainerProp) => {
  return (
    <S.Container {...rest} onPress={toggleSwitch}>
      <S.TitleLabel isEnabled={isEnabled}>
        {isEnabled ? labelEnable : labelDisable}
      </S.TitleLabel>
      <S.CustomSwitch
        trackColor={{false: '#767577', true: '#767577'}}
        thumbColor={isEnabled ? colors.greenApp : colors.colorDanger}
        // ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </S.Container>
  );
};

export default SwitchContainer;
