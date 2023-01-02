import styled, {css} from 'styled-components/native';
import {TouchableOpacity} from 'react-native';
import colors from '../../styles/colors';
import {fontMedium} from '../../styles/fonts';

type ButtonProps = {
  background?: string;
  color?: string;
};

const Button = styled(TouchableOpacity)<ButtonProps>`
  ${({background, color}) => css`
    background: ${background ? background : colors.greenApp};
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

const Label = styled.Text`
  color: ${colors.fontLight};
  /* font-family: ${fontMedium}; */
  font-size: 18px;
`;

export {Button, Label};
