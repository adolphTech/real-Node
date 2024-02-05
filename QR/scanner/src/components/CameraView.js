import { Camera, CameraType, BarCodeScanner } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import axios from 'axios';
import moment from 'moment';
import * as Application from 'expo-application';

export default function CameraView() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [processing, setProcessing] = useState(false);


  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  const handleBarCodeScanned = async ({ type, data }) => {
    setProcessing(true);

    const user = { name: 'Adolph Odhiambo', class: "Computer Science", year: "4", date: Date.now() };
    const serverUrl = "https://8c35-41-80-119-12.ngrok-free.app/generateQR";
    try {
      // Send a POST request to the server
      const response = await axios.post(serverUrl, user);
      if (response.status === 201) {
        setScanned(true);
        console.log(response.data.name);
        // The request was successful
        alert(`${response.data.name} you attended ${response.data.class} on ${moment(response.data.date).format("DD/MM/YYYY")} see yuh !`);
      } else {
        alert("Failed to record data to the server!");
      }
    } catch (error) {
      // The request failed
      console.error('There was an error!', error);
    }

    setProcessing(false);
  };

  return (
    <View style={styles.container}>
      <Camera 
        style={styles.camera} 
        type={type} 
        onBarCodeScanned={scanned || processing ? undefined : handleBarCodeScanned}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </Camera>
      {processing && <ActivityIndicator size="large" color="#00ff00" />}
      {scanned && !processing && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  camera: {
    width: '80%',
    height: '50%',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    padding: 20,
    justifyContent: 'space-between',
  },
  button: {
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});