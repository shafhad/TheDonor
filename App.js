/*import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
*/

import * as React from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import Welcome from './screens/Welcome';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import NgoTabNavigator from './components/NGOTabNavigator';
import DonorTabNavigator from './components/DonorTabNavigator';
import DonorMyDonations from './screens/DonorMyDonations';
import AppDrawerNavigator from './components/AppDrawer';
import NetInfo from '@react-native-community/netinfo';
//import NoInternetLottie from './components/NoInternetLottie';
import { RFValue } from 'react-native-responsive-fontsize'

export default class App extends React.Component {
  NetInfoSubscribtion = null;

  constructor(props) {
    super(props);
    this.state = {
      isInternetReachable: false,
      showLoading: true
    };
  }

  componentDidMount() {
    this.NetInfoSubscribtion = NetInfo.addEventListener(
      this.handleConnectivityChange
    );

    console.log(this.state.isInternetReachable);
  }

  componentWillUnmount() {
    this.NetInfoSubscribtion && this.NetInfoSubscribtion();
  }

  handleConnectivityChange = (state) => {
    this.setState({
      isInternetReachable: state.isInternetReachable,
      showLoading: false
    });
  };

  render() {
 
      return (
        <View style={styles.container}>
          <AppContainer />
        </View>
      );
    } 
    
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

const SwitchNavigator = createSwitchNavigator({
  screen1: Welcome,
  //screen2: AppDrawerNavigator,
   screen2: NgoTabNavigator,
 screen3: DonorTabNavigator,
 screen4: DonorMyDonations
});

const AppContainer = createAppContainer(SwitchNavigator);
