import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import { ListItem } from 'react-native-elements';
import { RFValue } from 'react-native-responsive-fontsize';
import MyHeader from '../components/Header';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myDonations: [],
      currentUser: firebase.auth().currentUser.email,
      showLoading: true,
    };
  }

  getMyDonations = async () => {
    await db
      .collection('All_Donations')
      .where('donorID', '==', this.state.currentUser)
      .onSnapshot((snapshot) => {
        var myDonations = [];
        snapshot.docs.map((doc) => {
          var donation = doc.data();
          donation['docID'] = doc.id;

          myDonations.push(donation);
        });

        this.setState({
          myDonations: myDonations,
          showLoading: false,
        });

        console.log(myDonations);
      });
  };

  componentDidMount() {
    this.getMyDonations();
  }

  sendItem = async (item) => {
    if (item.requestState === 'Item Sent') {
      await db
        .collection('All_Donations')
        .doc(item.docID)
        .update({ requestState: 'Donor Interested' });
      // var requestState = 'Donor Interested';
      // this.updateNotification(item, requestState);
    } else {
      await db
        .collection('All_Donations')
        .doc(item.docID)
        .update({ requestState: 'Item Sent' });
      // var requestState1 = 'Item Sent';
      // this.updateNotification(item, requestState1);
    }
  };

  render() {
    if (this.state.showLoading) {
      return <ActivityIndicator size={RFValue(50)} color="#000" />;
    } else {
      return (
        <View style={styles.container}>
          <MyHeader title="My Donations" navigation={this.props.navigation} />
          <FlatList
            data={this.state.myDonations}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, i }) => {
              return (
                <View>
                  <ListItem
                    title={'Donation : ' + item.itemName}
                    subtitle={'Donated to : ' + item.ngoName}
                    rightElement={
                      <TouchableOpacity
                        style={[
                          styles.button,
                          {
                            backgroundColor:
                              item.requestState === 'Item Sent'
                                ? 'green'
                                : '#32867d',
                          },
                        ]}
                        onPress={() => {
                          this.sendItem(item);
                        }}>
                        <Text>
                          {item.requestState === 'Donor Interested'
                            ? 'Send Item'
                            : 'Item Sent'}
                        </Text>
                      </TouchableOpacity>
                    }
                    bottomDivider
                  />
                </View>
              );
            }}
          />
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
  button: {
    width: 100,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#32867d',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    elevation: 16,
  },
});
