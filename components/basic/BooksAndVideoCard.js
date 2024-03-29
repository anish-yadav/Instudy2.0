import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import { SharedElement } from 'react-navigation-shared-element'
import { getVideoImage } from '../../helpers/subjectImage'

const { width, height } = Dimensions.get('screen')
export default function BooksAndVideoCard() {
  return (
    <View>
      <Text> </Text>
    </View>
  )
}

export const BookThumbWithDetail = ({ navigation, name, author, thumb, url, subCode, semesters, data, variant, id }) => {
  const color = variant && variant == 'light' ? '#1E152A' : '#fff'
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Resource_Detail', { thumb, name, author, url, subCode, semesters, data, id })}>
      <View style={styles.container}>
        <SharedElement id={`${id}`}>
          <Image style={styles.thumbImg} source={{ uri: thumb }} />
        </SharedElement>
        <Text style={styles.secondaryText}>{author} </Text>
        <Text style={[styles.primaryText, { color }]}>{name}</Text>
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
    <TouchableOpacity onPress={() => handlePress(active ? !paused : index)}>
      <View style={[styles.videoList, { backgroundColor: active ? '#ccebe1' : '#fff' }]}>
        <Image style={styles.videoListImg} source={getVideoImage(subCode)} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: width - 150, alignItems: 'center' }}>
          <View style={styles.description}>
            <Text style={[styles.primaryText, { fontSize: 16, color: active ? '#009C69' : '#000' }]}>{name} </Text>
            <Text style={[styles.secondaryText, { color: active ? '#009C69' : '' }]}>{subject}</Text>
          </View>
          <Feather name={active && !paused ? 'pause' : 'play'} size={18} style={{ color: active ? '#009C69' : '#000' }} />
        </View>
      </View>
    </TouchableOpacity>

  )
}
export const BookThumb = ({ navigation, name, author, thumb, url, subCode, semesters, data }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Resource_Detail', { thumb: thumb, name: name, author: author, url: url, subCode, semesters, data })}>
      <View style={[styles.container, styles.thumbContainer]}>
        <Image style={[styles.thumbImg]} source={{ uri: thumb }} />
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
    width: 120,
    marginHorizontal: 10
  },
  secondaryText: {
    color: '#ccc',
    fontSize: 12
  },
  primaryText: {
    color: '#FFF',
    fontSize: 14,
    textTransform: 'capitalize',
    fontFamily: 'SFProText-Semibold'
  },
  thumbImg: {
    height: 150,
    width: 100,
    borderRadius: 10
  },
  thumbContainer: {
    marginVertical: 5,
    width: width / 3 - 30
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
  playButton: {
    position: 'relative',
    top: -140 - 15,
    left: 65 - 15,
    zIndex: 999,
    backgroundColor: 'rgba(255,255,255,1)',
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  videoList: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginVertical: 5,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center'
  },
  videoListImg: {
    width: 70,
    height: 70
  },
  description: {
    marginLeft: 10
  }
})
