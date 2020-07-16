import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, ScrollView, ImageBackground } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { NunitoSans_600SemiBold, OpenSans_600SemiBold, useFonts } from '@expo-google-fonts/dev'
import AnimatedLoader from 'react-native-animated-loader'
import RNFetchBlob from 'rn-fetch-blob'

const { width, height } = Dimensions.get('screen')
export default function BookDetailScreen({ route, navigation }) {
  const [fontsLoaded] = useFonts({
    NunitoSans_600SemiBold,
    OpenSans_600SemiBold
  })
  const { name, author, url, thumb, subCode, semesters } = route.params



  const startDownload = async () => {
    console.log('Download started')
    let dir = RNFetchBlob.fs.dirs
    RNFetchBlob.config({
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        mime: 'application/pdf',
        description: 'Downloading the file heya'
      },
      fileCache: true,
      path: dir.DownloadDir + `${name.split(' ').join('-')}.pdf`
    }).fetch('GET', url).then(res => {
      console.log('file saved to', res)
    })

  }


  const buttonStyle = () => {
    return {
      backgroundColor: '#ccebe1',
      width: (percent / 100) * (width - 40),
      position: 'absolute',
      top: -15,
      left: -((width - 60) / 2 - 40),
      height: 50,
      borderRadius: 10
    }
  }
  if (!fontsLoaded)
    return (
      <AnimatedLoader
        visible={!fontsLoaded}
        overlayColor="rgba(255,255,255,0.75)"
        source={require('../../../assets/loader.json')}
        animationStyle={styles.lottie}
        speed={1}
      />
    )
  return (
    <ScrollView>
      <View style={styles.container}>
        
        <View style={styles.bookImage}>
        
          <Image style={[styles.bookImage,{ padding:10}]} source={{ uri: thumb }} />
        </View>
        
        <View style={styles.description}>
          <TouchableOpacity>
            <MaterialCommunityIcons name='heart' size={24} color='#e91e63'/>
          </TouchableOpacity>
          <View style={styles.subCodeConatiner}>
            <Text style={styles.subCodeText}>{subCode}</Text>
          </View>
          <Text style={styles.secondaryText}>{author} </Text>
          <Text style={styles.primaryText}>{name}</Text>
          <View style={{ alignItems: 'flex-start', width: width - 20, paddingVertical: 40, paddingHorizontal: 10 }}>
            <Text style={styles.secondaryText}>About Book</Text>
            <Text style={styles.secondaryText, { color: 'black' }}>Semester : {semesters.join(', ')}</Text>
            <Text style={styles.secondaryText, { color: 'black' }}>Subject Code : {subCode}</Text>
            <Text style={styles.secondaryText, { color: 'black' }}>Author : {author}</Text>
            <Text style={styles.secondaryText, { color: 'black' }}>Book Name : {name}</Text>
            <Text style={styles.secondaryText, { color: 'black' }}>Description : Not availabel right now</Text>

          </View>
          <TouchableOpacity style={[styles.downloadButton]} onPress={() => startDownload()}>
            <Text style={styles.downloadText}>Download Book Now </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor:'#f7fcfa',
    paddingTop:10,
  },
  bookImage: {
    width: 150,
    height: 220,
    zIndex: 2,
    borderRadius: 10,
    backgroundColor: "#009C69",
    overflow:'hidden',
    alignItems:'flex-end'
  },
  description: {
    backgroundColor: "#fff",
    width: width - 20,
    marginHorizontal: 20,
    alignItems: 'center',
    position: 'relative',
    top: -150,
    paddingTop: 170,
    paddingBottom: 30,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  secondaryText: {
    color: '#ccc',
    fontSize: 14
  },
  primaryText: {
    color: '#222222',
    fontSize: 20,
    textTransform: 'capitalize',
    fontFamily: 'OpenSans_600SemiBold'
  },
  subCodeConatiner: {
    backgroundColor: '#ccebe1',
    paddingHorizontal: 5,
    paddingVertical: 4,
    borderRadius: 4
  },
  subCodeText: {
    color: '#009C69'
  },
  downloadButton: {
    backgroundColor: '#009C69',
    width: width - 40,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10
  },
  downloadText: {
    color: '#fff',
    fontSize: 16
  }
})
