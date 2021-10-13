import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Modal,
  KeyboardAvoidingView,
} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import { ListItem, Card, Input, Icon, Header } from 'react-native-elements';
import { RFValue } from 'react-native-responsive-fontsize';
import Hyperlink from 'react-native-hyperlink';
import MyHeader from '../components/Header';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ngoID: this.props.navigation.getParam('details')['email'],
      ngoDetails: [],
      showLoading: true,
      showModal: false,
      itemName: '',
    };
  }

  showModal = () => {
    return (
      <Modal
        visible={this.state.showModal}
        animationType="slide"
        transparent={true}>
        <View style={styles.modal}>
          <KeyboardAvoidingView>
            <Input
              style={{ marginTop: '10%' }}
              label="What are you donating?"
              placeholder="Item Name"
              maxLength={15}
              onChangeText={(txt) => {
                this.setState({
                  itemName: txt,
                });
              }}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                onPress={() => {}}
                style={{ marginHorizontal: 7.5, padding: 15 }}>
                <Icon type="font-awesome" name="check" />
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginHorizontal: 7.5, padding: 15 }}
                onPress={() => {
                  this.setState({
                    showModal: false,
                  });
                }}>
                <Icon type="font-awesome" name="times" />
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
    );
  };

  getNGODetails = async () => {
    await db
      .collection('NGO_Details')
      .where('email', '==', this.state.ngoID)
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

  componentDidMount() {
    this.getNGODetails();
  }

  render() {
    if (this.state.showLoading) {
      return (
        <View>
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
                text: 'NGO Details',
                style: { fontSize: 20, color: '#cecdc5' },
              }}
              backgroundColor="#32867d"
            />
          </View>
          <View>{this.showModal()}</View>
          <View style={{ marginTop: '30%' }}>
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
                this.setState({
                  showModal: true,
                });
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
  modal: {
    backgroundColor: '#ADD8E6',
    borderRadius: 15,
    justifyContent: 'center',
    height: '25%',
    marginTop: '25%',
    width: '80%',
    alignSelf: 'center',
  },
  modalButtons: {
    display: 'flex',
    flexDirection: 'row-reverse',
    alignSelf: 'center',
  },
});
