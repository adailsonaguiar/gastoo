import styled from 'styled-components/native';
import Button from '../../components/Button';
import colors from '../../styles/colors';
import {fontMedium} from '../../styles/fonts';

export const Container = styled.View`
  flex: 1;
  background: ${colors.backgroundColorPrimary};
`;

export const Form = styled.ScrollView`
  flex: 1;
  padding-left: 20px;
  padding-right: 20px;
`;

export const InputContainer = styled.View`
  justify-content: center;
  margin-bottom: 20px;
  border-bottom-width: 1px;
  border-bottom-color: #383642;
  height: 45px;
  margin-left: 30px;
  margin-right: 30px;
`;

export const ContainerFormFooter = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  margin-bottom: 5px;
`;

export const BtnRemove = styled(Button)`
  background-color: ${colors.backgroundColorPrimary};
  border: 1.5px ${colors.colorDanger};
  color: ${colors.colorDanger};
`;

export const ButtonSave = styled(Button)`
  margin-top: 10px;
`;
