import * as React from 'react';
import { View } from 'react-native';
import db from '../config';
import firebase from 'firebase';
import { Header, Icon, Badge } from 'react-native-elements';

export default class MyHeader extends React.Component {
  constructor() {
    super();
    this.state = {
      allNotifications: [],
      currentUser: firebase.auth().currentUser.email,
    };
  }

  componentDidMount() {
    // this.getUnreadNotifications();
  }

  getUnreadNotifications = async () => {
    await db
      .collection('Notifications')
      .where('notificationStatus', '==', 'unread')
      .where('targetID', '==', this.state.currentUser)
      .onSnapshot((snapshot) => {
        var allNotifications = [];
        snapshot.docs.map((doc) => {
          var notification = doc.data();

          allNotifications.push(notification);

          console.log('forBadge', allNotifications);
        });

        this.setState({
          allNotifications: allNotifications,
        });

        console.log(this.state.allNotifications);
      });
  };

  BadgeWithIcon = () => {
    return (
      <View>
        <Icon
          type="font-awesome"
          name="bell"
          onPress={() => {
            // this.props.navigation.navigate('Notifications');
          }}
        />
        <Badge
          value={this.state.allNotifications.length}
          containerStyle={{ position: 'absolute', top: -4, right: -4 }}
        />
      </View>
    );
  };

  render() {
    return (
      <View>
        <Header
          centerComponent={{
            text: this.props.title,
            style: {
              fontSize: 20,
              color: '#cecdc5',
              //fontFamily: 'Times New Roman, Times, serif',
            },
          }}
          leftComponent={
            <Icon
              type="font-awesome"
              name="bars"
              onPress={() => {
                this.props.navigation.toggleDrawer()
              }}
            />
          }
          rightComponent={<this.BadgeWithIcon {...this.props} />}
          backgroundColor="#32867d"
        />
      </View>
    );
  }
}
