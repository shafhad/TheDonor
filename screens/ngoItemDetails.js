import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Card } from 'react-native-elements';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/Header';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: firebase.auth().currentUser.email,
      requestID: this.props.navigation.getParam('requestID'),
      requestDetails: '',
    };
  }

  componentDidMount() {
    this.getItemDetails();

    console.log(this.state.requestDetails);
  }

  getItemDetails = async () => {
    db.collection('All_Requests')
      .where('ngoID', '==', this.state.currentUser)
      .where('requestID', '==', this.state.requestID)
      .get()
      .then((i) => {
        i.docs.map((data) => {
          this.setState({
            requestDetails: data.data(),
          });

          console.log(this.state.requestDetails);
        });
      });
  };

  render() {
    var item = this.state.requestDetails;

    if (!this.state.requestDetails) {
      return <Text>Loading...</Text>;
    } else {
      return (
        <View style={styles.container}>
          <View style={{ flex: 0.1 }}>
            <MyHeader title="Item Details" navigation={this.props.navigation} />
          </View>
          <Card>
            <Text>Requested Item : {this.state.requestDetails.itemName}</Text>
            <Text>Item Quantity : {this.state.requestDetails.quantity}</Text>
            <Text>
              Request Status : {this.state.requestDetails.requestStatus}
            </Text>
            <View>
              <Text>{'Date: ' + item.date.toDate()}</Text>
            </View>
          </Card>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
