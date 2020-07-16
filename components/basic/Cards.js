import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'

import { getSubjectImage } from '../../helpers/subjectImage'

export default function Cards() {
  return (
    <View>
      <Text></Text>
    </View>
  )
}

export const CategoryCard = ({ name, navigation  }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('search',{text: name})}>
      <Image style={styles.image} source={getSubjectImage(name)} />
      <Text style={styles.subCode}>{name}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card:{
    width:150,
    height:150,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#fff',
    marginHorizontal:7,
    borderRadius:10
  },
  image:{
    width:80,
    height:80
  },
  subCode:{
    fontSize:20
  }
})