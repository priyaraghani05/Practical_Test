/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import { StackNavigation } from './src/navigator';
import { persistor, store } from './src/reducer';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';



function App(): React.JSX.Element {

  return (
    <Provider store={store}>
    <PersistGate persistor={persistor}>
    <StackNavigation />
    </PersistGate>
</Provider>
 
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
