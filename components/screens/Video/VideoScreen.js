import React, { useState } from 'react'
import { View, Text, FlatList, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import Feather from 'react-native-vector-icons/Feather'
import Video from 'react-native-video'
import Animation from 'lottie-react-native'

import { CategoryCard } from '../../basic/Cards'
import { VideoThubWithDetail } from '../../basic/BooksAndVideoCard'

import { styles } from '../style/style'

export default function VideoScreen({ route, navigation }) {
  let categories = [{ name: 'CHM' }, { name: 'CSE' }, { name: 'CVL' }, { name: 'EET' }, { name: 'HSS' }, { name: 'MEL' }, { name: 'MTH' }, { name: 'PHY' }]

  const  VIDEO_QUERY = gql`
  {
    videos{
      name,
      subCode,
      url,
      semester
    }
  }
  `
  const { loading, error, data } = useQuery(VIDEO_QUERY)
  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity style={{ position: 'absolute', zIndex:999, left: 10, top: 10 }} onPress={() => navigation.openDrawer()}>
          <Feather name='menu' size={28} color='black' />
        </TouchableOpacity>
        <Video
          source={require('../../../assets/video/pencil.mp4')}
          style={localStyle.backgroundVideo}
          muted={true}
          repeat={true}
          resizeMode='cover'
          rate={1.0}
          ignoreSilentSwitch='obey'
        />
        <View style={localStyle.topContainer}>
          <View
            style={styles.searchContainer}>

            <Feather
              name={'search'}
              size={18}
              color={"#BAC5C4"}
              style={{ marginRight: 5 }} />

            <TextInput
              style={styles.search}
              placeholder={"search by subject, semester or branch"}
              returnKeyType={'search'}
              onChangeText={text => setSearchText(text)}
              onSubmitEditing={() => navigation.navigate('search', { text: searchText })} />
          </View>
        </View>

        {/* New Arrivals */}
        <View style={localStyle.newArrival}>
          <View
            style={[styles.headerContainer, { marginLeft: 10 }]}>

            <Text style={styles.header}>New Arrivals</Text>

            <TouchableOpacity
              style={styles.viewAllContainer}
              onPress={() => navigation.navigate('all_books')}
            >
              <Text style={styles.link}>View All</Text>
              <Feather name={'chevron-right'} />
            </TouchableOpacity>
          </View>
          {
            data && data.videos ?
              <FlatList data={data.videos} keyExtractor={item => item.name}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <VideoThubWithDetail navigation={navigation} name={item.name} author='unknown writer' url={item.url} subCode={item.subCode}  />
                )}
              /> :
            <View style={{ height: 250, width: 250, justifyContent: 'center', alignItems: 'center' }}>
              <Animation
                style={{
                  width: 100,
                  height: 100,
                }}
                source={require('../../../assets/loader.json')}
                speed={1}
                autoPlay
                loop
                progress={1}
              />
            </View>
          }
        </View>

        {/* Categories */}
        <View style={styles.categories}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Categories</Text>
          </View>
          <FlatList data={categories} keyExtractor={item => item.name}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <CategoryCard name={item.name} navigation={navigation} />
            )}
          />
        </View>
      </View>
    </ScrollView>
  )
}


const localStyle = StyleSheet.create({
  backgroundVideo: {
    height: 250,
    position: "absolute",
    top: 0,
    left: 0,
    alignItems: "stretch",
    bottom: 0,
    right: 0
  },
  topContainer: {
    height: 250
  },
  header: {
    fontSize: 24,
    marginLeft: 20
  },
  thumbImage: {
    width: 50,
    height: 50
  },
  newArrival:{
      paddingLeft: 20,
      paddingTop: 20,
      justifyContent: 'center',
      backgroundColor: '#fff',
      height: 340,
      marginBottom: 15,
      width:'100%'
  },
  card: {
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    paddingVertical: 20,
    marginVertical: 10,
    borderRadius: 10,
    marginHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  description: {
    marginLeft: 10
  },
  name: {
    fontSize: 16,
    textTransform: 'capitalize'
  }
})