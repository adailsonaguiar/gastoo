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
  border-color: ${colors.gray300};
  border-radius: 10px;
  height: 66px;
  ${FontInputStyles}
`;

export const SelectWrapperStyles = css`
  border-bottom-width: 1px;
  border-bottom-color: ${colors.gray300};
  border-radius: 0;
  height: 66px;
  ${FontInputStyles}
`;
