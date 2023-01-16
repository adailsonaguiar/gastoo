import styled from 'styled-components/native';
import RNDatePicker from 'react-native-modern-datepicker';
import {FontInputStyles, InputWrapperStyles} from '../InputWrapperStyles';

export const Container = styled.View``;

export const PickerWrapper = styled.TouchableOpacity`
  padding-left: 10px;
  justify-content: center;
  ${InputWrapperStyles}
`;

export const CustomDatePicker = styled(RNDatePicker)``;

export const Value = styled.Text`
  ${FontInputStyles}
`;

export const ModalContainer = styled.SafeAreaView`
  flex: 1;
`;
