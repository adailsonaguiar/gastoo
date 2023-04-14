import React from 'react';
import {View} from 'react-native';

// import { Container } from './styles';

type CarouselDotsProps = {
  index: number;
  isRotate?: boolean;
};
const CarouselDots: React.FC<CarouselDotsProps> = ({index, isRotate}) => {
  const width = 10;

  return (
    <View
      style={{
        backgroundColor: 'white',
        width,
        height: width,
        borderRadius: 50,
        overflow: 'hidden',
        transform: [
          {
            rotateZ: isRotate ? '90deg' : '0deg',
          },
        ],
      }}
    />
  );
};

export default CarouselDots;
