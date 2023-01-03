import {StyleSheet} from 'react-native';
import styled, {css} from 'styled-components/native';
import colors from '../../styles/colors';
import {fontMedium} from '../../styles/fonts';
import {InputWrapperStyles} from '../InputWrapperStyles';

export const PickerWrapper = styled.View`
  border-radius: 10px;
  margin-bottom: 10px;
  ${InputWrapperStyles}
`;

export const SelectOption = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px 0;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.gray300};
`;

export const OptionIcon = styled.View<{background: string}>`
  ${({background}) => css`
    background-color: ${background ? background : '#fff'};
    width: 15px;
    height: 15px;
  `}
`;

export const LabelOption = styled.Text`
  color: ${colors.fontLight};
  font-family: ${fontMedium};
  font-size: 16px;
`;

export const FieldWrapper = styled.View`
  padding: 15px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Placeholder = styled.Text<{lineLeft?: boolean}>`
  ${({lineLeft}) => css`
    color: ${colors.fontLight};
    font-family: ${fontMedium};
    font-size: 16px;
    margin-left: ${lineLeft ? '10px' : '0'};
  `}
`;

export const LabelWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const LineLeft = styled.View<{lineLeftColor: string}>`
  ${({lineLeftColor}) => css`
    width: 5px;
    height: 27px;
    background-color: ${lineLeftColor};
  `}
`;

export const Label = styled.Text`
  color: ${colors.fontLight};
  margin-bottom: 6px;
  font-size: 15px;
`;

export const BtnClear = styled.TouchableOpacity`
  width: 20px;
  height: 20px;
  background-color: grey;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;

export const stylesSheet = StyleSheet.create({
  ModalStyle: {
    backgroundColor: colors.backgroundColorPrimary,
    borderRadius: 10,
    color: colors.fontLight,
    padding: 15,
  },
});
