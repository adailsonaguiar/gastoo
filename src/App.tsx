/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import FlashMessage from 'react-native-flash-message';
import {LogBox, StatusBar} from 'react-native';
import Routes from './routes';
import 'react-native-gesture-handler';
import styled from 'styled-components/native';
import {useRealm} from './store/realm';
import {getRealm} from './database/realm';
import colors from './styles/colors';

const Cotainer = styled.SafeAreaView`
  flex: 1;
`;

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
  'Node of type rule not supported as an inline style',
  'Warning: componentWillReceiveProps has been renamed, and is not recommended for use',
]);

const App = () => {
  const {realm, setRealm} = useRealm();
  async function handleRealm() {
    if (!realm) {
      setRealm(await getRealm());
    }
  }
  React.useEffect(() => {
    handleRealm();
  }, []);
  return (
    <Cotainer>
      <StatusBar barStyle="light-content" backgroundColor={colors.darkBlue} />
      <Routes />
      <FlashMessage />
    </Cotainer>
  );
};

export default App;
