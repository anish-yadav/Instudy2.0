import React, { useEffect } from 'react'
import { View, StyleSheet, Dimensions, Image, Text, ScrollView, BackHandler } from 'react-native'
import Animated, { Easing } from 'react-native-reanimated'
import Video from 'react-native-video'
import { PanGestureHandler, State } from 'react-native-gesture-handler'

const {
    add,
    multiply,
    neq,
    spring,
    cond,
    eq,
    event,
    lessThan,
    greaterThan,
    and,
    call,
    set,
    clockRunning,
    startClock,
    stopClock,
    Clock,
    Value,
    concat,
    interpolate,
    Extrapolate,
} = Animated;
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
const minHeight = 64;
const midBound = height - 64 * 3 - 64;
const upperBound = midBound + minHeight ;
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


function runSpring(clock, value, dest) {
    const state = {
        finished: new Value(0),
        velocity: new Value(0),
        position: new Value(0),
        time: new Value(0),
    }

    const config = {
        damping: 20,
        mass: 1,
        stiffness: 100,
        overshootClamping: false,
        restSpeedThreshold: 1,
        restDisplacementThreshold: 0.5,
        toValue: new Value(0),
    }

    return [
        cond(clockRunning(clock), 0, [
            set(state.finished, 0),
            set(state.velocity, 0),
            set(state.position, value),
            set(config.toValue, dest),
            startClock(clock),
        ]),
        spring(clock, state, config),
        cond(state.finished, stopClock(clock)),
        state.position,
    ];
}


export const VideoModal = ({ video, setVideo }) => {
    const AVideo = Animated.createAnimatedComponent(Video)
    const translationY = new Animated.Value(0)
    const velocityY = new Animated.Value(0)
    const state = new Animated.Value(State.UNDETERMINED)

    let clockY = new Clock(0);
    let offsetY = new Animated.Value(0)
    let translateY = new Animated.Value(0)

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
    const handlebackPress = () => {
        setVideo(null)
        return true
    }





    const finalTranslateY = add(translationY, multiply(0.2, velocityY));
    const translationThreshold = height / 3;
    const snapPoint = cond(
        lessThan(finalTranslateY, translationThreshold),
        0,
        upperBound
    );
    // TODO: handle case where the user drags the card again before the spring animation finished
    translateY = cond(
        eq(state, State.END),
        [
            set(translationY, runSpring(clockY, add(offsetY, translationY), snapPoint)),
            set(offsetY, translationY),
            translationY,
        ],
        [
            cond(eq(state, State.BEGAN), stopClock(clockY)),
            add(offsetY, translationY)
        ]
    );

    const opacity = interpolate(translateY, {
        inputRange: [0, upperBound - 200],
        outputRange: [1, 0],
        extrapolate: Extrapolate.CLAMP
    })
    const videoWidth = interpolate(translateY, {
        inputRange: [0, midBound, upperBound],
        outputRange: [width, width, 64 * 2],
        extrapolate: Extrapolate.CLAMP
    })
    const videoHeight = interpolate(translateY, {
        inputRange: [0, midBound, upperBound],
        outputRange: [200, 200, 64 * 2],
        extrapolate: Extrapolate.CLAMP
    })
    const showControls = interpolate(translateY, {
        inputRange: [0, midBound],
        outputRange: [1, 0],
        extrapolate: Extrapolate.CLAMP
    })
    const modalHeight = interpolate(translateY, {
        inputRange: [0, midBound],
        outputRange: [height, 64 * 2],
        extrapolate: Extrapolate.CLAMP
    })
    const bottom = interpolate(translateY, {
        inputRange: [0, midBound],
        outputRange: [0, 70],
        extrapolate: Extrapolate.CLAMP
    })
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handlebackPress)

        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handlebackPress)
        }
    }, [])
    return (
        <>
            <Animated.View style={[styles.container, {
                backgroundColor: 'red',
                maxHeight: modalHeight,
                overflow: 'hidden',
                transform: [
                    {
                        translateY: translateY
                    }
                ],
                marginBottom: bottom
            }]}>
                <PanGestureHandler
                    onHandlerStateChange={onGestureEvent}
                    onGestureEvent={onGestureEvent}
                    activeOffsetY={[-700, 10]}
                >
                    <AVideo source={video} style={[styles.video, { width: videoWidth, height: videoHeight }]} controls={showControls ? true : false} muted={false} resizeMode='cover' />
                    
                </PanGestureHandler>

                <Animated.ScrollView style={{ opacity }}>
                    {
                        videos.map(({ thumb, title, video }, i) => {
                            return (
                                <VideoItem key={i} {...{ thumb, video, title }} />
                            )
                        })
                    }
                </Animated.ScrollView>
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