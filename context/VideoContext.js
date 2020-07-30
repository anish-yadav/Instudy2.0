import React, { createContext, useState, useEffect } from 'react'
import { View, StyleSheet, Dimensions, Image, Text, ScrollView } from 'react-native'
import Animated, { Easing } from 'react-native-reanimated'
import Video from 'react-native-video'
import { VideoModal } from './VideoModel'
const INITIAL_STATE = {
    video: null
}
const videos = [
    {
        video: require('../assets/video/1.mp4'),
        title: 'Sending Firebase Data Messages to Expo: iOS',
        thumb: require('../assets/img/pattern/pattern1.png')
    },
    {
        video: require('../assets/video/2.mp4'),
        title: 'Sending Firebase Data Messages to Expo: iOS',
        thumb: require('../assets/img/pattern/pattern0.png')
    },
    {
        video: require('../assets/video/3.mp4'),
        title: 'Sending Firebase Data Messages to Expo: iOS',
        thumb: require('../assets/img/pattern/pattern2.png')
    },
    {
        video: require('../assets/video/4.mp4'),
        title: 'Sending Firebase Data Messages to Expo: iOS',
        thumb: require('../assets/img/pattern/pattern3.png')
    },
    {
        video: require('../assets/video/pencil.mp4'),
        title: 'Sending Firebase Data Messages to Expo: iOS',
        thumb: require('../assets/img/pattern/pattern1.png')
    }
]
const { width, height} = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    video:{
        width,
        height: 250
    },
    videoItem: {
        width,
        marginBottom: 30,
        flexDirection: 'row'
    },
    thumb: {
        height: 100,
        width: width/3
    },
    name:{
        fontSize: 16,
        fontFamily: 'SFProText-Semibold',
        paddingHorizontal: 10
    }
})
export const VideoContext = createContext(INITIAL_STATE)

export const VideoProvider = ({ children }) => {
    const [video, setVideo] = useState(null)
    const animation = new Animated.Value(0)

    const toggleVideo = () => Animated.timing(animation,{
        toValue: 1,
        duration: 300,
        easing: Easing.inOut(Easing.ease)
    }).start()

    const playVideo = (v) => {
        console.log('firing')
        setVideo(v)
        
        
    }
    useEffect(() => {
        console.log('starting to toggle')
        toggleVideo()
    },[video])
    const translateY = animation.interpolate({
            inputRange: [0,1],
            outputRange:[height,0]
        })
    
    
    return (
        <VideoContext.Provider value={{
            video,
            playVideo
        }}>
            <View style={styles.container}>
                <View style={StyleSheet.absoluteFill}>
                    {children}
                </View>
                <Animated.View style={[styles.container,{ transform: [{ translateY }]}]}>
                    {video && <VideoModal {...{ video,setVideo }} />}
                </Animated.View>
            </View>
        </VideoContext.Provider>
    )
}

// const VideoModal = ({ video }) => {
//     return(
//         <View style={[styles.container,{ backgroundColor: '#fff'}]}>
//             <Video source={video} style={styles.video} controls={true}/>
            
//             <ScrollView>
//                 {
//                     videos.map(({ thumb, title, video}, i) => {
//                         return (
//                             <VideoItem key={i} {...{thumb, video, title}} />
//                         )
//                     })
//                 }
//             </ScrollView>
//         </View>
//     )
// }
// const VideoItem = ({ thumb, video, title }) => {
//     return (
//         <View style={styles.videoItem}>
//             <Image style={styles.thumb} source={thumb} />
//             <Text style={styles.name}>{title}</Text>
//         </View>
//     )
// }