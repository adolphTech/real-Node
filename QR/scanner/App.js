import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// import QRscanner from './src/components/QRscanner';
// import QRscanner from './src/components/QRscanner'; 
import CameraView from './src/components/CameraView';


export default function App() {
  return (
    <>
      {/* <QRscanner /> */}
      <CameraView />
    
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
