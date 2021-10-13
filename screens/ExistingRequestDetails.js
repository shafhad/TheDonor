import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Linking,
} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import { RFValue } from 'react-native-responsive-fontsize';
import { ListItem, Card, Header, Icon } from 'react-native-elements';
import Communications from 'react-native-communications';
import Hyperlink from 'react-native-hyperlink';
import MyHeader from '../components/Header';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requestID: this.props.navigation.getParam('details')['requestID'],
      details: '',
      showLoading: true,
      ngoDetails: [],
      currentUser: firebase.auth().currentUser.email,
      donorName: '',
      donationAlreadyExist: false,
      myDonations: [],
    };
  }

  getRequestDetails = async () => {
    await db
      .collection('All_Requests')
      .where('requestID', '==', this.state.requestID)
      .get()
      .then((i) => {
        i.docs.map((data) => {
          this.setState({
            details: data.data(),
          });

          this.getNGODetails();

          console.log(this.state.details);
        });
      });
  };

  getNGODetails = async () => {
    await db
      .collection('NGO_Details')
      .where('email', '==', this.state.details.ngoID)
      .get()
      .then((i) => {
        i.docs.map((data) => {
          this.setState({
            ngoDetails: data.data(),
            showLoading: false,
          });
        });
      });
  };

  getMyDonations = async () => {
    var myDonations = [];

    await db
      .collection('All_Donations')
      .where('donorID', '==', this.state.currentUser)
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          var donation = doc.data();
          donation['docID'] = doc.id;

          myDonations.push(donation);
        });

        this.setState({
          myDonations: myDonations,
          showLoading: false,
        });

        this.checkMyDonations();

        console.log(myDonations);
      });
  };

  addDonation = async () => {
    if (!this.state.donationAlreadyExist) {
      await db.collection('All_Donations').add({
        requestID: this.state.requestID,
        donorID: this.state.currentUser,
        itemName: this.state.details.itemName,
        ngoName: this.state.details.ngoName,
        requestState: 'Donor Interested',
      });
    }
  };

  getDonorName = async () => {
    await db
      .collection('Donor_Details')
      .where('email', '==', this.state.currentUser)
      .get()
      .then((snapShot) => {
        snapShot.forEach((i) => {
          var data = i.data();
          this.setState({
            donorName: data.name,
          });
        });
      });
  };

  createNotification = async () => {
    var message =
      this.state.donorName + ' has shown interest in donating the book.';

    await db.collection('Notifications').add({
      requestID: this.state.requestID,
      donorID: this.state.currentUser,
      itemName: this.state.details.itemName,
      targetID: this.state.details.ngoID,
      message: message,
      notificationStatus: 'unread',
      date: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  checkMyDonations = () => {
    for (var i = 0; i < this.state.myDonations.length; i++) {
      console.log('Hi');

      if (this.state.myDonations[i]['requestID'] === this.state.requestID) {
        console.log('Hello');

        this.setState({
          donationAlreadyExist: true,
        });
      }
    }
  };

  componentDidMount = async () => {
    await this.getRequestDetails();
    await this.getDonorName();
    await this.getMyDonations();
  };

  render() {
    if (this.state.showLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size={RFValue(50)} color="#000" />
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <View style={{ flex: 0.1 }}>
            <Header
              leftComponent={
                <Icon
                  name="arrow-left"
                  type="feather"
                  onPress={() => {
                    this.props.navigation.goBack();
                  }}
                />
              }
              centerComponent={{
                text: 'Existing Request Details',
                style: { fontSize: 20, color: '#cecdc5' },
              }}
              backgroundColor="#32867d"
            />
          </View>
          <View style={{ marginTop: '30%' }}>
            <Card title="Request Details">
              <Text>Item Requested : {this.state.details.itemName}</Text>
              <Text>Quantity : {this.state.details.quantity}</Text>
            </Card>
            <Card title="NGO Details">
              <Text>NGO Name : {this.state.ngoDetails.name}</Text>
              <Text>Type : {this.state.ngoDetails.type}</Text>
              <Text>Contact No. : {this.state.ngoDetails.phone}</Text>
              <Text>Email : {this.state.ngoDetails.email}</Text>
              <Text>Address : {this.state.ngoDetails.address}</Text>
              <Hyperlink linkDefault={true}>
                <Text>Website : {this.state.ngoDetails.website}</Text>
              </Hyperlink>
            </Card>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.addDonation();
                this.createNotification();
                this.props.navigation.navigate('MyDonations');
              }}>
              <Text>Donate</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
  },
  button: {
    borderWidth: 2,
    alignItems: 'center',
    width: '40%',
    alignSelf: 'center',
  },
});
