/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image} from 'react-native';
import {
  CustomPicker,
  OptionTemplateSettings,
  FieldTemplateSettings,
  CustomPickerProps,
  CustomPickerActions,
} from 'react-native-custom-picker';
import {Label} from '../Label';

import ArrowRightIcon from '../../assets/chevron-right.png';
import * as S from './styles';
import Header, {SelectModalHeader} from '../Header';

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
        <Image source={ArrowRightIcon} />
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
            {btnClear && <S.BtnClear onPress={clear} />}
            <Image source={ArrowRightIcon} />
          </>
        ) : null}
      </S.FieldWrapper>
    );
  }

  function renderHeader(settings: CustomPickerActions) {
    return (
      <SelectModalHeader title={'Selecione'} onClose={() => settings.close()} />
    );
  }

  return (
    <>
      <Label>{label}</Label>
      <S.PickerWrapper>
        <CustomPicker
          placeholder={placeholder}
          options={options}
          modalAnimationType="slide"
          modalStyle={S.stylesSheet.ModalStyle}
          headerTemplate={renderHeader}
          backdropStyle={S.stylesSheet.Backdrop}
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
