import * as React from 'react'
import { createStackNavigator } from 'react-navigation-stack';
import ExistingRequest from '../screens/ExistingRequests';
import ExistingRequestDetails from '../screens/ExistingRequestDetails';

const ExistingRequestDetailsStackNavigator = createStackNavigator(
  {
    ExistingRequest: {
      screen: ExistingRequest,
      navigationOptions:{headerShown:false}
    },
    ExistingRequestDetails: {
      screen: ExistingRequestDetails,
      navigationOptions:{headerShown:false}
    },
  },
  { initialRouteName: 'ExistingRequest' }
);

export {ExistingRequestDetailsStackNavigator}