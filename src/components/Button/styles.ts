import styled, {css} from 'styled-components/native';
import {TouchableOpacity} from 'react-native';
import colors from '../../styles/colors';
import {fontBold} from '../../styles/fonts';

type ButtonProps = {
  background?: string;
  color?: string;
};

const Button = styled(TouchableOpacity).attrs({
  activeOpacity: 0.9,
})<ButtonProps>`
  ${({background, color}) => css`
    background: ${background ? background : colors.eletricBlue};
    align-items: center;
    justify-content: center;
    border-radius: 30px;
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
    font-family: ${fontBold};
    font-size: 16px;
  `}
`;

const Loading = styled.ActivityIndicator.attrs({
  size: 'small',
  color: '#fff',
})``;

export {Button, Label, Loading};
