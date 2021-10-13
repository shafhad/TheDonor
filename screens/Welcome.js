import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import { Input, Icon } from 'react-native-elements';
import { RFValue } from 'react-native-responsive-fontsize';

export default class Welcome extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      pwd: '',
      ngoSignUpModalShow: false,
      donorSignUpModalShow: false,
      ngoName: '',
      ngoEmail: '',
      ngoPhone: '',
      ngoAddress: '',
      ngoType: '',
      ngoPassword: '',
      ngoConfirmpwd: '',
      ngoWebsite: '',
      donorName: '',
      donorEmail: '',
      donorPhone: '',
      donorCity: '',
      donorPassword: '',
      donorConfirmpwd: '',
      hidden: true,
      showLoading: true,
    };
  }
/*
  componentDidMount = async () => {
    await firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        var isDonor = '';
        var dbref = await db
          .collection('Donor_Details')
          .where('email', '==', user.email)
          .get();

          this.setState({showLoading:false})
        console.log('lenght', dbref.docs.length);
        if (dbref.docs.length === 0) {
          isDonor = 0;
          console.log("I'm again in if");
        } else {
          isDonor = 1;
          console.log("I'm in else");
        }
        console.log('in Auth value of isDonor after query execution', isDonor);
        if (isDonor === '') {
          this.props.navigation.navigate('screen1');
        }
        if (isDonor === 1) {
          this.props.navigation.navigate('screen3');
        }
        if (isDonor === 0) {
          this.props.navigation.navigate('screen2');
        }
      } else {
        this.props.navigation.navigate('screen1');
        this.setState({showLoading:false})
      }
    });
  };
*/
  toggle = () => {
    this.setState({
      hidden: !this.state.hidden,
    });
  };
/*
  login = async (email, pwd) => {
    var isDonor = 0;

    await firebase
      .auth()
      .signInWithEmailAndPassword(email, pwd)
      .then(() => {
        Alert.alert('Login Successful');
        
        db.collection('Donor_Details')
          .where('email', '==', email)
          .get()
          .then(async (snapShot) => {
            await snapShot.docs.map((doc) => {
              console.log("I'm here");
              isDonor = 1;
              console.log(
                'in login value of isDonor after query execution',
                isDonor
              );
              if (isDonor !== 0) {
                this.props.navigation.navigate('screen3');
              } else {
                this.props.navigation.navigate('screen2');
              }
            });
          });
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };
*/

login = (email, pwd) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, pwd)
    .then(() => {
      this.props.navigation.navigate("screen3");
    })
    .catch(error => {
      var errorCode = error.code;
      var errorMessage = error.message;
      return Alert.alert(errorMessage);
    });
};
  showNGOSignUpModal = () => {
    return (
      <Modal
        visible={this.state.ngoSignUpModalShow}
        animationType="slide"
        transparent={true}>
        <View>
          <ScrollView style={styles.modal}>
            <KeyboardAvoidingView>
              <Text style={styles.modalHeader}>NGO Registration</Text>
              <Input
                placeholder="NGO Name"
                label="NGO Name *"
                onChangeText={(txt) => {
                  this.setState({
                    ngoName: txt,
                  });
                }}
                leftIcon={{ type: 'font-awesome-5', name: 'hands-helping' }}
                style={styles.modalTextInput}
              />
              <Input
                placeholder="Email"
                label="Email *"
                onChangeText={(txt) => {
                  this.setState({
                    ngoEmail: txt,
                  });
                }}
                keyboardType="email"
                leftIcon={{ type: 'font-awesome-5', name: 'envelope' }}
              />
              <Input
                placeholder="Phone no."
                label="Phone no. *"
                onChangeText={(txt) => {
                  this.setState({
                    ngoPhone: txt,
                  });
                }}
                keyboardType="phone-pad"
                maxLength={10}
                leftIcon={{ type: 'font-awesome-5', name: 'phone' }}
              />
              <Input
                placeholder="Address"
                label="Address *"
                onChangeText={(txt) => {
                  this.setState({
                    ngoAddress: txt,
                  });
                }}
                leftIcon={{ type: 'font-awesome-5', name: 'map-marker-alt' }}
              />
              <Input
                placeholder="Who do you support"
                label="NGO Type *"
                onChangeText={(txt) => {
                  this.setState({
                    ngoType: txt,
                  });
                }}
                leftIcon={{ type: 'font-awesome-5', name: 'users' }}
              />
              <Input
                placeholder="Website"
                label="Website *"
                onChangeText={(txt) => {
                  this.setState({
                    ngoWebsite: txt,
                  });
                }}
                leftIcon={{ type: 'font-awesome-5', name: 'external-link-alt' }}
              />
              <Input
                placeholder="Password"
                label="Password *"
                onChangeText={(txt) => {
                  this.setState({
                    ngoPassword: txt,
                  });
                }}
                secureTextEntry={this.state.hidden}
                leftIcon={{ type: 'font-awesome-5', name: 'key' }}
                rightIcon={
                  <Icon
                    name={this.state.hidden ? 'eye-slash' : 'eye'}
                    type="font-awesome-5"
                    onPress={() => {
                      this.toggle();
                    }}
                    size={20}
                    color="grey"
                  />
                }
              />
              <Input
                placeholder="Confirm Password"
                label="Confirm Password *"
                onChangeText={(txt) => {
                  this.setState({
                    ngoConfirmpwd: txt,
                  });
                }}
                secureTextEntry={this.state.hidden}
                leftIcon={{ type: 'font-awesome-5', name: 'check' }}
                rightIcon={
                  <Icon
                    name={this.state.hidden ? 'eye-slash' : 'eye'}
                    type="font-awesome-5"
                    onPress={() => {
                      this.toggle();
                    }}
                    size={20}
                    color="grey"
                  />
                }
              />
              <TouchableOpacity
                onPress={() => {
                  this.ngoSignUp();
                }}>
                <Text>Register</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ ngoSignUpModalShow: false });
                }}>
                <Text>Cancel</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </Modal>
    );
  };

  showDonorSignUpModal = () => {
    return (
      <Modal
        visible={this.state.donorSignUpModalShow}
        animationType="slide"
        transparent={true}>
        <View>
          <ScrollView>
            <KeyboardAvoidingView>
              <Text>Donor Registration</Text>
              <Input
                placeholder="Your Name"
                label="Your Name *"
                onChangeText={(txt) => {
                  this.setState({
                    donorName: txt,
                  });
                }}
                leftIcon={{ type: 'font-awesome-5', name: 'user' }}
              />
              <Input
                placeholder="Email"
                label="Email *"
                onChangeText={(txt) => {
                  this.setState({
                    donorEmail: txt,
                  });
                }}
                keyboardType="email"
                leftIcon={{ type: 'font-awesome-5', name: 'envelope' }}
              />
              <Input
                placeholder="Phone no."
                label="Phone no. *"
                onChangeText={(txt) => {
                  this.setState({
                    donorPhone: txt,
                  });
                }}
                keyboardType="phone-pad"
                maxLength={10}
                leftIcon={{ type: 'font-awesome-5', name: 'phone' }}
              />
              <Input
                placeholder="City"
                label="City *"
                onChangeText={(txt) => {
                  this.setState({
                    donorCity: txt,
                  });
                }}
                leftIcon={{ type: 'font-awesome-5', name: 'city' }}
              />
              <Input
                placeholder="Password"
                label="Password *"
                onChangeText={(txt) => {
                  this.setState({
                    donorPassword: txt,
                  });
                }}
                secureTextEntry={this.state.hidden}
                leftIcon={{ type: 'font-awesome-5', name: 'key' }}
                rightIcon={
                  <Icon
                    name={this.state.hidden ? 'eye-slash' : 'eye'}
                    type="font-awesome-5"
                    onPress={() => {
                      this.toggle();
                    }}
                    size={20}
                    color="grey"
                  />
                }
              />
              <Input
                placeholder="Confirm Password"
                label="Confirm Password *"
                onChangeText={(txt) => {
                  this.setState({
                    donorConfirmpwd: txt,
                  });
                }}
                secureTextEntry={this.state.hidden}
                leftIcon={{ type: 'font-awesome-5', name: 'check' }}
                rightIcon={
                  <Icon
                    name={this.state.hidden ? 'eye-slash' : 'eye'}
                    type="font-awesome-5"
                    onPress={() => {
                      this.toggle();
                    }}
                    size={20}
                    color="grey"
                  />
                }
              />
              <TouchableOpacity
                onPress={() => {
                  this.donorSignUp();
                }}>
                <Text>Register</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  this.setState({ donorSignUpModalShow: false });
                }}>
                <Text>Cancel</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </Modal>
    );
  };

  ngoSignUp = () => {
    this.state.ngoEmail.trim();

    if (
      (this.state.ngoPassword === this.state.ngoConfirmpwd &&
        this.state.ngoPassword != '') ||
      this.state.ngoConfirmpwd != ''
    ) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(
          this.state.ngoEmail,
          this.state.ngoPassword
        )
        .then(() => {
          db.collection('NGO_Details').add({
            name: this.state.ngoName,
            email: this.state.ngoEmail,
            phone: this.state.ngoPhone,
            address: this.state.ngoAddress,
            type: this.state.ngoType,
            website: this.state.ngoWebsite,
          });
          Alert.alert('Registration Successful', '', [
            {
              text: 'Ok',
              onPress: () => {
                this.setState({
                  ngoSignUpModalShow: false,
                });
              },
            },
          ]);

          this.props.navigation.navigate('screen2');
        })
        .catch((error) => {
          Alert.alert(error.message);
        });
    } else if (
      this.state.ngoName === '' ||
      this.state.ngoEmail === '' ||
      this.state.ngoPhone === '' ||
      this.state.ngoAddress === '' ||
      this.state.ngoType === '' ||
      this.state.ngoWebsite === '' ||
      this.state.ngoPassword === '' ||
      this.state.ngoConfirmpwd === ''
    ) {
      Alert.alert('Please enter all the required details.');
    } else {
      Alert.alert('Password and Confirm Password do not match');
    }
  };

  donorSignUp = () => {
    this.state.donorEmail.trim();

    if (
      (this.state.donorPassword === this.state.donorConfirmpwd &&
        this.state.donorPassword != '') ||
      this.state.donorConfirmpwd != ''
    ) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(
          this.state.donorEmail,
          this.state.donorPassword
        )
        .then(() => {
          db.collection('Donor_Details').add({
            name: this.state.donorName,
            email: this.state.donorEmail,
            phone: this.state.donorPhone,
            address: this.state.donorCity,
          });
          Alert.alert('Registration Successful', '', [
            {
              text: 'Ok',
              onPress: () => {
                this.setState({
                  donorSignUpModalShow: false,
                });
              },
            },
          ]);
        })
        .catch((error) => {
          Alert.alert(error.message);
        });
    } else if (
      this.state.donorName === '' ||
      this.state.donorEmail === '' ||
      this.state.donorPhone === '' ||
      this.state.donorCity === '' ||
      this.state.donorPassword === '' ||
      this.state.donorConfirmpwd === ''
    ) {
      Alert.alert('Please enter all the required details.');
    } else {
      Alert.alert('Password and Confirm Password do not match');
    }
  };

  render() {
    // if (this.state.showLoading) {
    //   return <ActivityIndicator size={RFValue(50)} color="#000" />;
    // } else {
      return (
        <ScrollView style={styles.container}>
          <View>{this.showNGOSignUpModal()}</View>
          <View>{this.showDonorSignUpModal()}</View>
          <Input
            onChangeText={(txt) => {
              this.setState({
                email: txt,
              });
            }}
            placeholder="yourname@example.com"
            value={this.state.email}
            leftIcon={{ name: 'user', type: 'font-awesome-5' }}
            keyboardType="email"
          />
          <Input
            onChangeText={(txt) => {
              this.setState({
                pwd: txt,
              });
            }}
            placeholder="Password"
            value={this.state.pwd}
            secureTextEntry={this.state.hidden}
            leftIcon={{ type: 'font-awesome-5', name: 'key' }}
            rightIcon={
              <Icon
                name={this.state.hidden ? 'eye-slash' : 'eye'}
                type="font-awesome-5"
                onPress={() => {
                  this.toggle();
                }}
                size={20}
                color="grey"
              />
            }
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.login(this.state.email, this.state.pwd);
            }}>
            <Text>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.setState({
                ngoSignUpModalShow: true,
              });
            }}>
            <Text>NGO Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.setState({
                donorSignUpModalShow: true,
              });
            }}>
            <Text>Donor Sign Up</Text>
          </TouchableOpacity>
        </ScrollView>
      );
    }
  // }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcf4a3',
  },
  modal: {
    backgroundColor: 'white',
    width: '90%',
    alignSelf: 'center',
    borderRadius: RFValue(25),
    height: '80%',
  },
  modalHeader: {
    textAlign: 'center',
  },
});
