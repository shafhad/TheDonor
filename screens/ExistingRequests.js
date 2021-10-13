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
      allRequests: [],
      showLoading: true,
    };
  }

  getAllRequests = async () => {
    db.collection('All_Requests')
      .where('requestStatus', '==', 'Item(s) Requested')
      .get()
      .then((i) => {
        i.docs.map((data) => {
          this.setState({
            allRequests: [...this.state.allRequests, data.data()],
            showLoading: false,
          });

          console.log(this.state.allRequests);
        });
      });
  };

  componentDidMount() {
    this.getAllRequests();

    console.log(this.state.showLoading);
  }

  render() {
    if (this.state.showLoading) {
      return <ActivityIndicator size={RFValue(50)} color="#000" />;
    } else {
      return (
        <View style={styles.container}>
          <MyHeader
            title="Existing Requests"
            navigation={this.props.navigation}
          />
          <FlatList
            data={this.state.allRequests}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, i }) => {
              return (
                <View>
                  <View style={{ flex: 0.1 }}></View>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('ExistingRequestDetails', {
                        details: item,
                      });
                    }}>
                    <ListItem
                      key={i}
                      title={
                        'Item Requested : ' +
                        item.itemName +
                        ' (' +
                        item.quantity +
                        ')'
                      }
                      subtitle={'Requested By : ' + item.ngoName}
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
