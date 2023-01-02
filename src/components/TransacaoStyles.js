import styled from 'styled-components/native';

export const Transacao = styled.View`
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 10px;
  border-bottom-width: 1px;
  border-bottom-color: #f3f3f3;
  padding-left: 10px;
  padding-right: 10px;
`;

export const RowTransacao = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
  border-bottom-color: #5c5151;
`;
export const TitleTransacao = styled.Text`
  font-size: 14px;
  color: #000;
  text-transform: uppercase;
`;
export const DetalhesTransacao = styled.Text`
  font-size: 11px;
  color: #8a8a8a;
`;
export const ValorTransacao = styled.Text`
  color: #eb5454;
  font-weight: bold;
  font-size: 16px;
`;
