import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import main from './screens/main';
import chat from './screens/chat';

const AppNavigator = createStackNavigator({
  main: { screen: main },
  chat: { screen: chat }
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
