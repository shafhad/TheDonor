import * as React from 'react'
import { createStackNavigator } from 'react-navigation-stack';
import MyRequests from '../screens/ngoMyRequests';
import ItemDetails from '../screens/ngoItemDetails';

export const StackNavigator = createStackNavigator(
  {
    MyRequests: {
      screen: MyRequests,
      navigationOptions:{headerShown:false}
    },
    ItemDetails: {
      screen: ItemDetails,
      navigationOptions:{headerShown:true}
    },
  },
  { initialRouteName: 'MyRequests' }
);
