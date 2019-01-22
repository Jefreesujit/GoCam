import React, { Component } from 'react'
import { View, TouchableOpacity, StyleSheet, PermissionsAndroid } from 'react-native'

class Inputs extends Component {

  async componentDidMount() {
    // await this.requestLocationPermission()
    this.getDeviceAccess();
  }

  getDeviceAccess () {
    let permission = PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.CAMERA,
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    ], {
    'title': 'GoCam Camera Permission',
    'message': 'GoCam needs access to your camera ' +
                'so you can take awesome pictures.'
    });

    permission.then((results) => {
      console.log(results);
      alert(results);
    });
  }

   render() {
      return (
         <View style = {styles.container}>
            <View style={styles.camContainer}>
            </View>
            <View style={styles.actionContainer}>
              <TouchableOpacity
                style = {styles.camButton}
                onPress={this.getDeviceAccess}>
              </TouchableOpacity>
            </View>
         </View>
      )
   }
}
export default Inputs

const styles = StyleSheet.create({
   container: {
      paddingTop: 23
   },
   camContainer: {
     height: '100%',
     width: '100%',
     backgroundColor: 'black'
   },
   actionContainer: {
     position: 'absolute',
     left: 0,
     bottom: 0,
     width: '100%',
     display: 'flex',
     height: 100,
     backgroundColor: 'gray',
     justifyContent: 'center',
     alignItems: 'center'
   },
   input: {
      margin: 15,
      height: 40,
      borderColor: '#7a42f4',
      borderWidth: 1
   },
   submitButton: {
      backgroundColor: '#7a42f4',
      opacity: 0.3,
      padding: 10,
      margin: 15,
      height: 40,
   },
   submitButtonText:{
      color: 'white'
   },
   camButton: {
      width: 75,
      height: 75,
      borderRadius: 40,
      backgroundColor: 'white',
      borderColor: 'red',
      borderWidth: 1
   }
})