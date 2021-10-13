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
      allNGOs: [],
      showLoading: true,
    };
  }

  getAllNGOs = async () => {
    db.collection('NGO_Details')
      .get()
      .then((i) => {
        i.docs.map((data) => {
          this.setState({
            allNGOs: [...this.state.allNGOs, data.data()],
            showLoading: false,
          });

          console.log(this.state.allNGOs);
        });
      });
  };

  componentDidMount() {
    this.getAllNGOs();
  }

  render() {
    if (this.state.showLoading) {
      return <ActivityIndicator size={RFValue(50)} color="#000" />;
    } else {
      return (
        <View style={styles.container}>
          <View style={{ flex: 0.25 }}>
            <MyHeader
              title="Voluntary Donation"
              navigation={this.props.navigation}
            />
          </View>
          <FlatList
            data={this.state.allNGOs}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, i }) => {
              return (
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate(
                        'VoluntaryDonationDetails',
                        { details: item }
                      );
                    }}>
                    <ListItem
                      key={i}
                      title={'NGO Name : ' + item.name}
                      subtitle={'NGO Type : ' + item.type}
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
