import { createBottomTabNavigator } from 'react-navigation-tabs';
import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import Request from '../screens/ngoRequest';
import { StackNavigator } from './ItemDetailsStackNavigator';

const NGOTabNavigator = createBottomTabNavigator({
  Request: {
    screen: Request,
    navigationOptions: {
      tabBarIcon: (
        <Image
          source={require('../assets/request_icon.png')}
          style={{ width: 30, height: 30 }}
        />
      ),
      tabBarLabel: 'Request Form',
    },
  },
  MyRequests: {
    screen: StackNavigator,
    navigationOptions: {
      tabBarIcon: <Icon name="list-alt" type="font-awesome-5" />,
      tabBarLabel: 'My Requests',
    },
  },
});

export default NGOTabNavigator;
