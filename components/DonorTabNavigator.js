import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Icon } from 'react-native-elements'
import {VoluntaryDonationDetailsStackNavigator} from './VoluntaryDonationDetailsStackNavigator'
import {ExistingRequestDetailsStackNavigator} from './ExistingRequestsDetailsStackNavigator'

// const DonorTabNavigator = createMaterialBottomTabNavigator({
//   ExistingRequests: {
//     screen: ExistingRequestDetailsStackNavigator,
//     navigationOptions: {
//       tabBarIcon: (
//         <Icon name='hand-holding-heart' type='font-awesome-5'/>
//       ),
//       tabBarLabel: 'Existing Requests',
//       shifting:true,
//       tabBarColor:'#256'
//     },
//   },
//   VoluntaryDonations: {
//     screen: VoluntaryDonationDetailsStackNavigator,
//     navigationOptions: {
//       tabBarIcon: ( 
//         <Icon name='gifts' type='font-awesome-5'/>
//       ),
//       tabBarLabel: 'Voluntary Donation',
//       shifting:true,
//       tabBarColor:'#153'
//     },
//   },
// });

const DonorTabNavigator = createMaterialBottomTabNavigator({
  ExistingRequests: {
    screen: ExistingRequestDetailsStackNavigator,
    navigationOptions: {
      tabBarIcon: (
        <Icon name='hand-holding-heart' type='font-awesome-5'/>
      ),
      tabBarLabel: 'Existing Requests',
      shifting:true,
      tabBarColor:'#256'
    },
  },
  VoluntaryDonations: {
    screen: VoluntaryDonationDetailsStackNavigator,
    navigationOptions: {
      tabBarIcon: ( 
        <Icon name='gifts' type='font-awesome-5'/>
      ),
      tabBarLabel: 'Voluntary Donation',
      shifting:true,
      tabBarColor:'#153'
    },
  },
});


export default DonorTabNavigator