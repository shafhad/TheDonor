import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import firebase from 'firebase';
import db from '../config';
import MyHeader from '../components/Header';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      allMyRequests: [],
      currentUser: firebase.auth().currentUser.email,
    };
  }

  getAllMyRequests = async () => {
    await db
      .collection('All_Requests')
      .where('ngoID', '==', this.state.currentUser)
      .where('requestStatus', '==', 'Item(s) Requested')
      .onSnapshot((snapshot) => {
        snapshot.docs.map((i) => {
          this.setState({
            allMyRequests: [...this.state.allMyRequests, i.data()],
          });
          console.log(this.state.allMyRequests);
        });
      });
  };

  componentDidMount = async () => {
    this.getAllMyRequests();
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 0.1 }}>
            <MyHeader
              title="My Requests"
              navigation={this.props.navigation}
            />
          </View>
        <FlatList
          data={this.state.allMyRequests}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, i }) => {
            return (
              <View>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('ItemDetails',{requestID:item.requestID})}>
                  <ListItem
                    key={i}
                    title={item.itemName + ' (' + item.quantity + ')'}
                    subtitle={item.requestStatus}
                    bottomDivider
                  />
                </TouchableOpacity>
              </View>
            );
          }}
        />
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
