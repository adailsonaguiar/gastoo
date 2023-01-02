import React from 'react';
import FlashMessage from 'react-native-flash-message';
import {StatusBar} from 'react-native';
import Routes from './routes';
import 'react-native-gesture-handler';
import styled from 'styled-components/native';

const Cotainer = styled.SafeAreaView`
  flex: 1;
`;

const App = () => {
  // const isDarkMode = useColorScheme() === 'dark';
  return (
    <Cotainer>
      <StatusBar
        animated={true}
        barStyle="dark-content"
        // showHideTransition={statusBarTransition}
        // hidden={hidden}
      />
      <Routes />
      <FlashMessage />
    </Cotainer>
  );
};

export default App;
