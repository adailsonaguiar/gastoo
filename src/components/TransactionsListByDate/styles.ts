import styled from 'styled-components/native';
import {fontBold} from '../../styles/fonts';
import colors from '../../styles/colors';

export const List = styled.ScrollView``;

export const WrapperDate = styled.View`
  padding: 0 24px;
`;

export const Date = styled.Text`
  font-size: 18px;
  font-family: ${fontBold};
  color: ${colors.darkBlue};
  line-height: 24px;
`;
export const DateSection = styled.View`
  border-bottom-color: ${colors.gray10};
  border-bottom-width: 1px;
  padding: 10px 0;
`;
