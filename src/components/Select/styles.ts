import {StyleSheet} from 'react-native';
import styled, {css} from 'styled-components/native';
import colors from '../../styles/colors';
import {fontMedium, fontRegular} from '../../styles/fonts';
import {FontInputStyles, InputWrapperStyles, SelectWrapperStyles} from '../InputWrapperStyles';

export const PickerWrapper = styled.View`
  border-radius: 10px;
  ${SelectWrapperStyles}
`;

export const SelectOption = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  padding-right: 5px;
  border-bottom-width: 0.6px;
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
  padding-right: 15px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Placeholder = styled.Text<{lineLeft?: boolean}>`
  ${({lineLeft}) => css`
    margin-left: ${lineLeft ? '10px' : '0'};
    ${FontInputStyles}
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
    margin-right: 10px;
    background-color: ${lineLeftColor};
  `}
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
    color: colors.fontLight,
    flex: 1,
  },
  Backdrop: {
    backgroundColor: colors.backgroundColorPrimary,
  },
});

export const ChevRightIcon = styled.Image`
  width: 17px;
  height: 17px;
`;
