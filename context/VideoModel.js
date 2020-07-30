import React from 'react'
import { View, StyleSheet, Dimensions, Image, Text, ScrollView } from 'react-native'
import Animated, { Easing } from 'react-native-reanimated'
import Video from 'react-native-video'
import { PanGestureHandler, State } from 'react-native-gesture-handler'
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
const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    video: {
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
        width: width / 3
    },
    name: {
        fontSize: 16,
        fontFamily: 'SFProText-Semibold',
        paddingHorizontal: 10
    }
})
export const VideoModal = ({ video }) => {
    const AVideo = Animated.createAnimatedComponent(Video)
    const translationY = new Animated.Value(0)
    const velocityY = new Animated.Value(0)
    const state = new Animated.Value(State.UNDETERMINED)

    
    const onGestureEvent = Animated.event([
        {
            nativeEvent: {
                translationY,
                velocityY,
                state
            }
        }
    ], {
        useNativeDriver: true,
    })
    return (
        <>
            <Animated.View style={[styles.container, { backgroundColor: '#fff', transform: [{ translateY: translationY}] }]}>
                <PanGestureHandler
                    onHandlerStateChange={onGestureEvent}
                    onGestureEvent={onGestureEvent}
                >
                <AVideo source={video} style={styles.video} controls={true} />
                </PanGestureHandler>

                <ScrollView>
                    {
                        videos.map(({ thumb, title, video }, i) => {
                            return (
                                <VideoItem key={i} {...{ thumb, video, title }} />
                            )
                        })
                    }
                </ScrollView>
            </Animated.View>
        </>
    )
}
const VideoItem = ({ thumb, video, title }) => {
    return (
        <View style={styles.videoItem}>
            <Image style={styles.thumb} source={thumb} />
            <Text style={styles.name}>{title}</Text>
        </View>
    )
}