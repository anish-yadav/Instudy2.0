import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('screen')

export const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: '#f7fcfa'
  },
  bgImage: {
      width: "100%",
      height: 250,
      alignItems:'center'
  },
  center: {
      justifyContent: 'center',
      alignItems: 'center'
  },
  searchContainer: {
      alignItems: 'center',
      flexDirection: 'row',
      width: "90%",
      paddingHorizontal: 10,
      paddingVertical: 0,
      borderRadius: 20,
      backgroundColor: '#fafafa',
      marginTop: 90
  },
  search: {
      fontSize: 16
  },
  newArrival: {
      // marginLeft: 20,
      paddingLeft: 20,
      paddingTop: 20,
      justifyContent: 'center',
      backgroundColor: '#fff',
      height: 340,
      // borderBottomLeftRadius: 20,
      // borderTopLeftRadius: 20,
      // position: 'relative',
      // top: -70,
      marginBottom: 15,
      minWidth: width
  },
  categories: {
      paddingTop: 20,
      justifyContent: 'center',
      height: 340,
      // borderBottomLeftRadius: 20,
      // borderTopLeftRadius: 20,
      // position: 'relative',
      // top: -70,
      marginBottom: 15
  },
  link: {
      fontSize: 12,
      color: "#1B0A78"
  },
  header: {
      fontSize: 24
  },
  headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginLeft: 40,
      marginRight: 10,
      marginBottom: 20
  },
  viewAllContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
  },
  uploadButton: {
      backgroundColor: '#ccebe1',
      height: 70,
      width: 70,
      borderRadius: 35,
      position: 'absolute',
      bottom: 10,
      right: 10,
      justifyContent: 'center',
      alignItems: 'center'
  },
  lottie: {
      width: 100,
      height: 100
  },
})
