import styled, {css} from 'styled-components/native';
import colors from '../../styles/colors';
import {fontMedium} from '../../styles/fonts';
import {InputWrapperStyles} from '../InputWrapperStyles';

export const Container = styled.TouchableOpacity`
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  ${InputWrapperStyles}
`;

export const CustomSwitch = styled.Switch`
  border-radius: 4px;
  padding-left: 10px;
  background-color: ${colors.backgroundColorPrimary};
`;

type TitleLabelProps = {
  isEnabled: boolean;
};

export const TitleLabel = styled.Text<TitleLabelProps>`
  ${({isEnabled}) => css`
    font-family: ${fontMedium};
    color: ${isEnabled ? colors.greenApp : colors.colorDanger};
  `}
`;
