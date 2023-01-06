import {css} from 'styled-components';
import styled from 'styled-components/native';

export const Container = styled.ScrollView.attrs({
  horizontal: true,
  overScrollMode: 'never',
})``;

export const Color = styled.TouchableOpacity<{color: string}>`
  ${({color}) => css`
    background-color: ${color ? color : '#fff'};
    width: 25px;
    height: 25px;
    border-radius: 24px;
    margin-right: 5px;
  `}
`;
