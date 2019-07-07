import { createAppContainer, createStackNavigator } from 'react-navigation';
import { Home } from 'AppContainers';

const AppNavigator = createAppContainer(
  createStackNavigator(
    {
      Home
      // Details: DetailsScreen
    },
    {
      initialRouteName: 'Home'
    }
  )
);

export { AppNavigator };
