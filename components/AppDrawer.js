import * as React from 'react'
import { createDrawerNavigator } from 'react-navigation-drawer';
import customSideBarMenu from '../screens/customSideBarMenu';
// import Settings from '../screens/Settings'
import DonorTabNavigator from './DonorTabNavigator'
import MyDonations from '../screens/DonorMyDonations'
// import Notifications from '../screens/Notification'
import {Icon} from 'react-native-elements'

const DonorAppDrawerNavigator = createDrawerNavigator(
  {
    Home: {
      screen: DonorTabNavigator,
      navigationOptions:{
        drawerIcon:<Icon name='home' type='font-awesome-5'/>
      }
    },
    // Settings: {
    //   screen: Settings,
    //   navigationOptions:{
    //     drawerIcon:<Icon name='settings' type='fontawesome5'/>
    //   }
    // },
    MyDonations:{
      screen: MyDonations,
      navigationOptions:{
        drawerIcon:<Icon name='gift' type='font-awesome'/>,
        drawerLabel:'My Donatiions'
      }
    },
    // Notifications:{
    //   screen: Notifications,
    //   navigationOptions:{
    //     drawerIcon:<Icon name='bell' type='font-awesome'/>
    //   }
    // },
  },
  { contentComponent: customSideBarMenu },
  { initialRouteName: 'Home' },
);

export default DonorAppDrawerNavigator