import * as React from 'react';
import LottieView from 'lottie-react-native';
import Lottie from 'react-native-web-lottie';
import { View, StyleSheet } from 'react-native';

export default class NoInternetLottie extends React.Component {
  render() {
    return (
      <View style={styles.lottie}>
        <Lottie
          source={require('../assets/no-internet.json')}
          autoPlay
          loop
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  lottie: { alignSelf: 'center' },
});
