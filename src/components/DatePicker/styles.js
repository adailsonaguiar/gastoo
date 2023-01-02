import styled from 'styled-components/native';
import RNDatePicker from 'react-native-modern-datepicker';

import colors from '../../styles/colors';
import {fontMedium} from '../../styles/fonts';
import {InputWrapperStyles} from '../InputWrapperStyles';

export const Container = styled.View`
  margin-bottom: 10px;
`;

export const PickerWrapper = styled.TouchableOpacity`
  padding-left: 10px;
  justify-content: center;
  ${InputWrapperStyles}
`;

export const CustomDatePicker = styled(RNDatePicker)`
  z-index: 100;
`;

export const Label = styled.Text`
  color: ${colors.fontLight};
  margin-bottom: 6px;
  font-size: 15px;
`;

export const Value = styled.Text`
  color: ${colors.fontLight};
  font-family: ${fontMedium};
  font-size: 16px;
`;

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
