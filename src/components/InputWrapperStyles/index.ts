import {css} from 'styled-components';
import colors from '../../styles/colors';
import {fontMedium} from '../../styles/fonts';

export const FontInputStyles = css`
  color: ${colors.fontLight};
  font-size: 16px;
  font-family: ${fontMedium};
`;

export const InputWrapperStyles = css`
  border-width: 2px;
  border-color: ${colors.gray20};
  border-radius: 10px;
  height: 66px;
  background-color: ${colors.gray10};
  margin-top: 8px;
  ${FontInputStyles}
`;
