import styled from 'styled-components/native';

export const Container = styled.Modal.attrs({
  transparent: true,
})``;

export const LoadingWrapper = styled.View`
  background-color: rgba(0, 0, 0, 0.25);
  flex: 1;
  align-items: center;
  justify-content: center;
`;
