import { createStackNavigator, createAppContainer } from 'react-navigation';
import React, { Component } from 'react';
import HeadlinesScreen from './src/screens/HeadlinesScreen';
import NewsSubjectsScreen from './src/screens/NewsSubjectsScreen';
import HeadlineDetailScreen from './src/screens/HeadlineDetailScreen';
import { Text } from 'react-native';


const navigationConfig = {
  initialRouteName: 'Home',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#2196F3',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
}

const MainNavigator = createStackNavigator({
  Home: { screen: NewsSubjectsScreen },
  Headlines: { screen: HeadlinesScreen },
  HeadlineDetail: {
    screen: HeadlineDetailScreen,
    // navigationOptions: {
    //   headerBackTitle: 'asd',
    //   headerBackImage: <Text>geri</Text>,
    // }
  },
}, navigationConfig);

const App = createAppContainer(MainNavigator);

export default App;