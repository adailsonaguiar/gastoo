import React from 'react';

import * as S from './styles';

type SwitchContainerProp = {
  toggleSwitch: (value: boolean) => void;
  labelEnable: string;
  labelDisable: string;
  label?: string;
  isEnabled: boolean;
};

const SwitchContainer = ({
  isEnabled,
  toggleSwitch,
  labelEnable,
  labelDisable,
}: SwitchContainerProp) => {
  const [buttonActive, setButtonActive] = React.useState(isEnabled);

  React.useEffect(() => {
    setButtonActive(isEnabled);
  }, [isEnabled]);

  function toggleButton(button: number) {
    setButtonActive(!!button);
    toggleSwitch(!!button);
  }
  return (
    <S.Container>
      <S.Option onPress={() => toggleButton(1)} isEnabled={buttonActive}>
        <S.TitleLabel isEnabled={buttonActive}>{labelEnable}</S.TitleLabel>
      </S.Option>
      <S.Option
        onPress={() => toggleButton(0)}
        isEnabled={buttonActive === false}>
        <S.TitleLabel isEnabled={buttonActive === false}>
          {labelDisable}
        </S.TitleLabel>
      </S.Option>
    </S.Container>
  );
};

export default SwitchContainer;
