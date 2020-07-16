import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'
import { getVideoImage } from '../../helpers/subjectImage'

const { width,height } = Dimensions.get('screen')
export default function BooksAndVideoCard() {
  return (
    <View>
      <Text> </Text>
    </View>
  )
}

export const BookThumbWithDetail = ({ navigation, name, author, thumb, url, subCode,semesters }) => {
  return (
    <TouchableOpacity onPress={()=> navigation.navigate('detail',{thumb:thumb,name:name,author:author,url:url,subCode, semesters})}>
      <View style={styles.container}>
        <Image style={styles.thumbImg} source={{ uri: thumb }} />
        <Text style={styles.secondaryText}>{author}</Text>
        <Text style={styles.primaryText}>{name}</Text>
      </View>
    </TouchableOpacity>
  )
}

export const VideoThubWithDetail = ({ navigation, name, author, subCode, url }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('video_detail', { name, url, subCode })}>
      <View style={styles.container}>
        <Image style={[styles.thumbImg]} source={getVideoImage(subCode)} />
        <Text style={styles.secondaryText}>{author}</Text>
        <Text style={styles.primaryText}>{name}</Text>
        <View style={styles.playButton}>
        <Feather name='play' size={18} />
        </View>
      </View>
    </TouchableOpacity>
  )
}

export const VideoListItem = ({ name, subCode, subject, handlePress, active, index, paused }) => {
  return (
    <TouchableOpacity onPress={() => handlePress(active?!paused:index)}>
      <View style={[styles.videoList,{backgroundColor: active? '#ccebe1':'#fff'}]}>
      <Image style={styles.videoListImg} source={getVideoImage(subCode)} />
      <View style={{ flexDirection: 'row', justifyContent:'space-between',width:width-150, alignItems:'center'}}>
      <View style={styles.description}>
      <Text style={[styles.primaryText, { fontSize: 16, color: active?'#009C69':'#000'}]}>{ name } </Text>
      <Text style={[styles.secondaryText,{ color: active?'#009C69':''}]}>{subject}</Text>
      </View>
      <Feather name={active && !paused? 'pause':'play'} size={18} style={{color: active?'#009C69':'#000'}}/>
      </View>
    </View>
    </TouchableOpacity>
    
  )
}
export const BookThumb = ({ navigation, name, author, thumb, url, subCode,semesters }) => {
  return (
    <TouchableOpacity onPress={()=> navigation.navigate('detail',{thumb:thumb,name:name,author:author,url:url,subCode, semesters})}>
      <View style={[styles.container,styles.thumbContainer]}>
        <Image style={[styles.thumbImg,{ width: 100, height: 150}]} source={{ uri: thumb }}/>
      </View>
    </TouchableOpacity>
  )
}

export const CategoryCard = ({ name }) => {
  return (
    <View style={styles.categoryCard}>
      <Feather name='settings' color='#1B0A78' size={18} />
      <Text style={[styles.primaryText, { color: '#1B0A78' }]}>{name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 150
  },
  secondaryText: {
    color: '#ccc',
    fontSize: 12
  },
  primaryText: {
    color: '#222222',
    fontSize: 14,
    textTransform:'capitalize'
  },
  thumbImg: {
    height: 200,
    width: 130,
    borderRadius: 10
  },
  thumbContainer:{
    marginVertical:5,
    width:120
  },
  categoryCard: {
    width: 150,
    height: 150,
    marginLeft: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  playButton:{
    position:'relative',
    top: -140 - 15,
    left:65 - 15,
    zIndex:999,
    backgroundColor:'rgba(255,255,255,1)',
    width:30,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:15,
  },
  videoList:{
    flexDirection:'row',
    backgroundColor:'#fff',
    marginVertical:5,
    paddingHorizontal:20,
    paddingVertical:20,
    marginHorizontal:10,
    borderRadius:10,
    alignItems:'center'
  },
  videoListImg:{
    width:70,
    height:70
  },
  description:{
    marginLeft:10
  }
})
