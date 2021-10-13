import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/Header';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      itemName: '',
      reason: '',
      quantity: '',
      currentUser: firebase.auth().currentUser.email,
      ngoName: '',
    };
  }

  getNGOName = async () => {
    await db
      .collection('NGO_Details')
      .where('email', '==', this.state.currentUser)
      .get()
      .then((i) => {
        i.docs.map((data) => {
          this.setState({
            ngoName: data.data().name,
          });

          console.log(this.state.ngoName);
        });
      });
  };

  componentDidMount() {
    this.getNGOName();
  }

  addRequest = async () => {
    await db.collection('All_Requests').add({
      itemName: this.state.itemName,
      reason: this.state.reason,
      quantity: this.state.quantity,
      ngoID: this.state.currentUser,
      requestID: Math.random().toString(32).substring(2),
      requestStatus: 'Item(s) Requested',
      date: firebase.firestore.Timestamp.now().toDate(),
      ngoName: this.state.ngoName,
    });

    Alert.alert('Request Added Successfully');

    this.props.navigation.navigate('MyRequests');
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 0.1 }}>
          <MyHeader title="Request" navigation={this.props.navigation} />
        </View>
        <TextInput
          placeholder="Item Name"
          onChangeText={(txt) => {
            this.setState({
              itemName: txt,
            });
          }}
          style={styles.textInput}
        />
        <TextInput
          placeholder="Why do you want this item?"
          onChangeText={(txt) => {
            this.setState({
              reason: txt,
            });
          }}
          style={styles.textInput}
        />
        <TextInput
          placeholder="Item Quantity"
          onChangeText={(txt) => {
            this.setState({
              quantity: txt,
            });
          }}
          style={styles.textInput}
          keyboardType="number-pad"
        />
        <TouchableOpacity
          onPress={() => {
            this.addRequest();
          }}>
          <Text>Request</Text>
        </TouchableOpacity>
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
