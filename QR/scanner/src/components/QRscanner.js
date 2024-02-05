import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
const { hasPermission, requestPermission } = useCameraPermission()

const QRscanner = () => {
  return (
    <View>
      <Text>QRscanner</Text>
    </View>
  )
}

export default QRscanner

const styles = StyleSheet.create({})