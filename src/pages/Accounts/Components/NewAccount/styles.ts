import styled from 'styled-components/native';
import colors from '../../../../styles/colors';
import Button from '../../../../components/Button';

export const Form = styled.ScrollView`
  padding: 0 24px;
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
  margin-top: 10px;
  padding-bottom: 20px;
`;

export const BtnRemove = styled(Button).attrs({
  color: colors.colorDanger,
})`
  background-color: ${colors.backgroundColorSecondary};
  border: 1px ${colors.colorDanger};
  margin-top: 10px;
`;

export const ButtonSave = styled(Button)`
  margin-top: 10px;
`;
