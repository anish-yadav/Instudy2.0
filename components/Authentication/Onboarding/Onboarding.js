import React, { useRef } from 'react'
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native'
import { useScrollHandler, interpolateColor } from 'react-native-redash'
import Animated, { multiply } from 'react-native-reanimated'
import Slide from './Slide'
import SubSlide from './SubSlide'

const { width, height } = Dimensions.get('window')

const slides = [
    {
        title: 'Relaxed',
        subTitle: 'Stay Relaxed',
        description: 'Get every important updates and notes right in your hand',
        color: '#45CB85',
        picture: require('../../../assets/Authentication/Onboarding/1.png')
    },
    {
        title: 'Lecture',
        subTitle: 'Missed a lecture ?',
        description: 'We have video lecture from our top faculty members',
        color: '#DCABDF',
        picture: require('../../../assets/Authentication/Onboarding/2.png')
    },
    {
        title: 'Bunk',
        subTitle: 'Attendance problem ?',
        description: 'Set goals in each subject and let us do the calculations',
        color: '#A3E7FC',
        picture: require('../../../assets/Authentication/Onboarding/3.png')
    },
    {
        title: 'Awesome',
        subTitle: 'Feel\'s Good',
        description: 'Set goals in each subject and let us do the calculations',
        color: '#1982C4',
        picture: require('../../../assets/Authentication/Onboarding/4.png')
    },
    
]
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    slider: {
        height: 0.61 * height,
        borderBottomRightRadius: 75,
        backgroundColor: 'red'
    },
    footer: {
        flex: 1
    },
    footerContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 75,
        width: width * slides.length,
        flexDirection: 'row'
    }
})

const Onboarding = ({ route, navigation }) => {
    const scroll = useRef(null)
    const { scrollHandler, x } = useScrollHandler()
    const backgroundColor = interpolateColor(x, {
        inputRange: slides.map((_, i) => i * width),
        outputRange: slides.map(s => s.color)
    })
    return (
        <View style={styles.container}>
            <Animated.View style={[styles.slider, { backgroundColor }]}>
                <Animated.ScrollView
                    ref={scroll}
                    horizontal
                    snapToInterval={width}
                    decelerationRate='fast'
                    showsHorizontalScrollIndicator={false}
                    {...scrollHandler}
                >
                    {slides.map(({ title, picture }, index) => (
                        <Slide key={index} right={index % 2 != 0} {...{ title, picture }} />
                    ))}
                </Animated.ScrollView>
            </Animated.View>

            <View style={styles.footer}>
                <Animated.View style={{ ...StyleSheet.absoluteFill, backgroundColor }}></Animated.View>
                <Animated.View style={[styles.footerContainer, { transform: [{ translateX: multiply(x, -1) }] }]}>
                    {
                        slides.map(({ subTitle, description }, i) => {
                            const last = i == 3
                            return <SubSlide
                                key={i}
                                {...{ subTitle, description, last }}
                                onPress={() => {
                                    if (!last) {
                                        scroll.current?.getNode().scrollTo({ x: width * (i + 1), animated: true })
                                    } else {
                                        navigation.navigate('Login')
                                    }
                                }} />
                        })
                    }
                </Animated.View>
            </View>
        </View>
    )
}

export default Onboarding