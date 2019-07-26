import { createStackNavigator, createAppContainer } from 'react-navigation';
import React, { Component } from 'react';
import HeadlinesScreen from './src/screens/HeadlinesScreen';
import NewsSubjectsScreen from './src/screens/NewsSubjectsScreen';
import HeadlineDetailScreen from './src/screens/HeadlineDetailScreen';
import { StatusBar } from 'react-native';
import BookmarksScreen from './src/screens/BookmarksScreen';


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
  Bookmarks: { screen: BookmarksScreen },
  HeadlineDetail: {
    screen: HeadlineDetailScreen
  },
}, navigationConfig);

StatusBar.setBarStyle('light-content', true);

const App = createAppContainer(MainNavigator);

export default App;