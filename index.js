/**
 * @format
 */

// import {AppRegistry} from 'react-native';
// import App from './src/App';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);

import * as React from 'react';
import { AppRegistry } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { name as appName } from './app.json';
import App from './src/App';
import { store } from './src/redux/store';


const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    accent: 'yellow',
  },
};
export default function Main()
{
  return (

    <PaperProvider theme={theme}>
      <Provider store={store} >
        <App />
      </Provider >
    </PaperProvider >
  );
}

AppRegistry.registerComponent(appName, () => Main);