import styled, {css} from 'styled-components/native';
import colors from '../../styles/colors';
import {fontMedium} from '../../styles/fonts';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;

type TitleLabelProps = {
  isEnabled: boolean;
};

export const TitleLabel = styled.Text<TitleLabelProps>`
  ${({isEnabled}) => css`
    font-family: ${fontMedium};
    color: ${isEnabled ? colors.fontLight100 : colors.fontLight};
  `}
`;

export const Option = styled.TouchableOpacity<TitleLabelProps>`
  ${({isEnabled}) => css`
    background-color: ${isEnabled ? colors.eletricBlue : colors.backgroundColorPrimary}
    border-radius: 24px;
    padding: 7px 20px;
    margin-right: 7px;
    border-width: 2px;
    border-color: ${isEnabled ? colors.eletricBlue : colors.gray300}
  `}
`;
