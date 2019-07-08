import { createAppContainer, createStackNavigator } from 'react-navigation';
import { Home, Details } from 'AppContainers';

const AppNavigator = createAppContainer(
  createStackNavigator(
    {
      Home,
      Details 
    },
    {
      initialRouteName: 'Home'
    }
  )
);

export { AppNavigator };
