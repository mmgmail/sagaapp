import { createAppContainer, createStackNavigator } from 'react-navigation';
import { Home, Details } from 'AppContainers';

const AppNavigator = createAppContainer(
  createStackNavigator(
    {
      Home: {
        screen: Home,
        navigationOptions: {
          title: 'News List'
        }
      },
      Details: {
        screen: Details,
        navigationOptions: {
          title: 'Detailed News'
        }
      }
    },
    {
      initialRouteName: 'Home'
    }
  )
);

export { AppNavigator };
