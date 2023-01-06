import React from 'react';
import {mdColors} from '../../utils/colors';
import {Label} from '../Label';
import * as S from './styles';

type ColorsListProps = {
  handleColor: (value: string) => void;
};

export function ColorsList({handleColor}: ColorsListProps) {
  return (
    <>
      <Label>Selecione uma cor</Label>
      <S.Container>
        <S.Carrousel>
          {mdColors.map((color, index) => (
            <S.Color
              key={index + color}
              color={color}
              onPress={() => handleColor(color)}
            />
          ))}
        </S.Carrousel>
      </S.Container>
    </>
  );
}
