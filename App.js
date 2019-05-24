import { createStackNavigator, createAppContainer } from 'react-navigation';
import HeadlinesScreen from './src/screens/HeadlinesScreen';
import NewsSubjectsScreen from './src/screens/NewsSubjectsScreen';


const navigationConfig = {
  initialRouteName: 'Home',
  /* The header config from HomeScreen is now here */
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
}, navigationConfig);

const App = createAppContainer(MainNavigator);

export default App;