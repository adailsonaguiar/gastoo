/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  CustomPicker,
  OptionTemplateSettings,
  FieldTemplateSettings,
  CustomPickerProps,
} from 'react-native-custom-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

import * as S from './styles';

export type Option = {value: string | number; label: string};

type SelectProps = {
  placeholder: string;
  label: string;
  options: Option[];
  lineLeftColor?: string;
  btnClear?: boolean;
} & CustomPickerProps;

const Select = ({
  placeholder,
  label,
  options = [],
  btnClear = false,
  ...rest
}: SelectProps) => {
  function renderOption(settings: OptionTemplateSettings) {
    const {item, getLabel} = settings;
    return (
      <S.SelectOption>
        <S.LabelOption>{getLabel(item)}</S.LabelOption>
      </S.SelectOption>
    );
  }

  function renderField(settings: FieldTemplateSettings) {
    const {selectedItem, defaultText, getLabel, clear} = settings;

    return (
      <S.FieldWrapper>
        {!selectedItem && <S.Placeholder>{defaultText}</S.Placeholder>}
        {selectedItem ? (
          <>
            <S.LabelWrapper>
              <S.Placeholder>{getLabel(selectedItem)}</S.Placeholder>
            </S.LabelWrapper>
            {btnClear && (
              <S.BtnClear onPress={clear}>
                <Icon name="close" color="#fff" size={13} />
              </S.BtnClear>
            )}
          </>
        ) : null}
      </S.FieldWrapper>
    );
  }

  return (
    <>
      <S.Label>{label}</S.Label>
      <S.PickerWrapper>
        <CustomPicker
          placeholder={placeholder}
          options={options}
          modalAnimationType="slide"
          modalStyle={S.stylesSheet.ModalStyle}
          optionTemplate={renderOption}
          getLabel={item => item.label}
          fieldTemplate={renderField}
          style={{
            height: 66,
            justifyContent: 'center',
          }}
          {...rest}
        />
      </S.PickerWrapper>
    </>
  );
};

export default Select;
