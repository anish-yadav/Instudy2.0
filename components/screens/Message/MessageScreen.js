import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import TabBar from '../../navigation/TabBar/TabBar'
export default function MessageScreen() {
  return (
    <View style={styles.container}>
      <Text>Demo</Text>
      <TabBar />
    </View>
  )
}


const styles = StyleSheet.create({
  container:{
    flex:1 ,
    backgroundColor: '#009C69',
    justifyContent: "flex-end"
  }
})