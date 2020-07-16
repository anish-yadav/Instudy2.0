import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, ScrollView, StatusBar, Dimensions } from 'react-native'
import Video from 'react-native-video'
import Orientation from 'react-native-orientation-locker'
import Animation from 'lottie-react-native'
import { VideoListItem } from '../../basic/BooksAndVideoCard'

const { height, width } = Dimensions.get('screen')

export default function VideoDetialScreen({ route, navigation }) {
  const { name, url, subCode } = route.params
  const videoRef = useRef(null)
  const [activeIndex, setActive] = useState(0)
  const [isPaused, pauseVideo] = useState(false)
  const [fullScreen, setFullScreen] = useState(false)
  const [buffering, setBuffering] = useState(true)

  const handleOrientation = (orientation) => {
    orientation === 'LANDSCAPE-LEFT' || orientation === 'LANDSCAPE-RIGHT'
      ? (setFullScreen(s => (true)), StatusBar.setHidden(false))
      : (setFullScreen(s => (false)),
        StatusBar.setHidden(false));
  }
  useEffect(() => {
     Orientation.addOrientationListener(handleOrientation)

    return () => {
      Orientation.removeOrientationListener(handleOrientation)
    }
  }, [])

  const handleFullScreen = () => {
    fullScreen ?
      Orientation.unlockAllOrientations()
      : Orientation.lockToLandscapeLeft()
  }
  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}>
        <Video
          ref={ref => videoRef.current = ref}
          source={{ uri: url[activeIndex] }}
          style={styles.videoPlayer}
          rate={1.0}
          repeat={true}
          controls={true}
          paused={isPaused}
          muted={true}
          onError={(e) => console.log('error occured', e)}
          onBuffer={({ isBuffering }) => setBuffering(isBuffering)}
          resizeMode={'cover'}
          fullscreen={true}
          fullscreenAutorotate={true}
          fullscreenOrientation='portrait'
          ignoreSilentSwitch='obey'
        />
        <Animation
          source={require('../../../assets/animation/loading.json')}
          style={[
            styles.loading,
            {
              width:50,
              height:50,
              opacity: buffering? 1: 0
            }
          ]}
          speed={1}
          autoPlay
          loop
          progress={1}
        />
      </View>
      <Text style={styles.name}>
        {name}
      </Text>
      <ScrollView>
        {
          url.map((u, index) => {
            if (index === activeIndex)
              return <VideoListItem key={index} index={index} name={'Lecture' + index} subCode={subCode} subject={name} active={true} handlePress={pauseVideo} paused={isPaused} />
            return <VideoListItem key={index} index={index} name={'Lecture' + index} subCode={subCode} subject={name} active={false} handlePress={setActive} />
          }

          )
        }
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7fcfa'
  },
  videoPlayer: {
    height: 250
  },
  name: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold'
  },
  loading:{
    position:'absolute',
    top:50,
    right:width/4 - 10
  }
})
