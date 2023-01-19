import styled, {css} from 'styled-components/native';
import {TouchableOpacity} from 'react-native';
import colors from '../../styles/colors';
import {fontMedium} from '../../styles/fonts';

type ButtonProps = {
  background?: string;
  color?: string;
};

const Button = styled(TouchableOpacity).attrs({
  activeOpacity: 0.9,
})<ButtonProps>`
  ${({background, color}) => css`
    background: ${background ? background : colors.appColor};
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    height: 57px;
    width: 100%;

    ${Label} {
      color: ${color};
    }
  `}
`;

const Label = styled.Text<ButtonProps>`
  ${({color}) => css`
    color: ${color ? color : colors.backgroundColorPrimary};
    font-family: ${fontMedium};
    font-size: 18px;
  `}
`;

const Loading = styled.ActivityIndicator.attrs({
  size: 'small',
  color: '#fff',
})``;

export {Button, Label, Loading};
