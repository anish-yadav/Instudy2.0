import React, { useContext } from 'react'
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native'
import { ScrollView, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { VideoContext } from '../../../context/VideoContext'

const { height, width } = Dimensions.get('window')
const VideoStack = () => {

    const { playVideo } = useContext(VideoContext)
    const videos = [
        {
            video: require('../../../assets/video/1.mp4'),
            title: 'Sending Firebase Data Messages to Expo: iOS',
            thumb: require('../../../assets/img/pattern/pattern1.png')
        },
        {
            video: require('../../../assets/video/2.mp4'),
            title: 'Sending Firebase Data Messages to Expo: iOS',
            thumb: require('../../../assets/img/pattern/pattern0.png')
        },
        {
            video: require('../../../assets/video/3.mp4'),
            title: 'Sending Firebase Data Messages to Expo: iOS',
            thumb: require('../../../assets/img/pattern/pattern2.png')
        },
        {
            video: require('../../../assets/video/4.mp4'),
            title: 'Sending Firebase Data Messages to Expo: iOS',
            thumb: require('../../../assets/img/pattern/pattern3.png')
        },
        {
            video: require('../../../assets/video/pencil.mp4'),
            title: 'Sending Firebase Data Messages to Expo: iOS',
            thumb: require('../../../assets/img/pattern/pattern1.png')
        }
    ]
    return (
        <View style={styles.container}>
            <ScrollView>
                {videos.map(({ thumb, title, video }, i) => {
                    return (
                        <VideoItem key={i} {...{ thumb, title, video, playVideo }} />
                    )
                })}
            </ScrollView>
        </View>
    )
}

const VideoItem = ({ thumb, video, title, playVideo }) => {
    return (
        <TouchableWithoutFeedback onPress={() => playVideo(video)}>
            <View style={styles.videoItem}>
                <Image style={styles.thumb} source={thumb} />
                <Text style={styles.name}>{title}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    videoItem: {
        width,
        marginBottom: 30
    },
    thumb: {
        height: 200,
        width
    },
    name: {
        fontSize: 20,
        fontFamily: 'SFProText-Semibold',
        paddingHorizontal: 10
    }
})

export default VideoStack
