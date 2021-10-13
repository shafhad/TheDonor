import * as React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import firebase from 'firebase';
import db from '../config';
import { Icon } from 'react-native-elements'

export default class SideBarMenu extends React.Component {
  constructor(props){
    super(props)
    this.state={
      image:'#',
      userId:firebase.auth().currentUser.email,
      userName:''
    }
  }

  componentDidMount(){
    this.getUserName()
  }

  getUserName=async()=>{
    db.collection('Users').where('email','==',this.state.userId).get()
    .then((snapshot)=>{
      snapshot.forEach((i)=>{
        var data =i.data()

        this.setState({
          userName:data.firstName + ' ' + data.lastName
        })
      })  
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.drawerItemsContainer}>
          <DrawerItems {...this.props} />
        </View>
        <View style={styles.logOutContainer}>
          <TouchableOpacity style={styles.logOutButton} onPress={() => {
            this.props.navigation.navigate('screen1')
            firebase.auth().signOut()
          }}>
            <Icon name='sign-out-alt' type='font-awesome-5'/>
            <Text style={{paddingLeft:'5%',fontWeight:"bold"}} >Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerItemsContainer:{
    flex:0.8,
  },
  logOutButton:{
    flex:1,
    flexDirection:'row',
    marginLeft:'5%'
  }
});
