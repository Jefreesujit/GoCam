import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, PermissionsAndroid, CameraRoll } from 'react-native'
import { RNCamera, FaceDetector } from 'react-native-camera';

class Inputs extends Component {
  constructor() {
    super();
    this.state = {};
    this.camera = {};
    this.takePicture = this.takePicture.bind(this);
  }

  async componentDidMount() {
    // await this.requestLocationPermission()
    this.getDeviceAccess();
  }

  async takePicture () {
    const options = { quality: 0.5, base64: true };
    const data = await this.camera.takePictureAsync(options);
    const savedPath = await CameraRoll.saveToCameraRoll(data.uri);
    this.setState({ curImg: data.uri });
    alert(data.uri+" newpath "+savedPath);
  };

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
      //alert(results);
    });
  }

   render() {
      return (
         <View style = {styles.container}>
            <RNCamera
              ref={ref => { this.camera = ref; }}
              style={styles.camContainer}
            />
            <View style={styles.actionContainer}>
              <TouchableOpacity
                style = {styles.camButton}
                onPress={this.takePicture}>
              </TouchableOpacity>
            </View>
         </View>
      )
   }
}
export default Inputs

const styles = StyleSheet.create({
   container: {
      paddingTop: 0,
      height: '100%'
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
     backgroundColor: '#333',
     justifyContent: 'center',
     alignItems: 'center',
     zIndex: 99,
     opacity: 0.7
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
      borderColor: 'gray',
      borderWidth: 1,
      zIndex: 999
   }
})