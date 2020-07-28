import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, Dimensions, FlatList } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import { TextStyle, BookThumbWithDetail } from '../../basic'
import { TextInput, ScrollView } from 'react-native-gesture-handler'
import { useQuery } from '@apollo/client'
import { BOOKS_QUERY } from '../../../helpers/query'
import Animation from 'lottie-react-native'
import { useScrollHandler } from 'react-native-redash'
import Animated, { interpolate } from 'react-native-reanimated'

const { width, height } = Dimensions.get('window')
const HEADER_HEIGHT = 70
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    backgorundImage: {
        ...StyleSheet.absoluteFillObject,
        width,
        height
    },
    header: {
        position: 'absolute',
        width,
        height: HEADER_HEIGHT,
        justifyContent: 'center',
        paddingLeft: 20,
        opacity: 100,
        zIndex: 100,
        top: 0
    },
    fixedContainer: {
        marginTop: 90,
        alignItems: 'center'
    },
    hero: {
        fontSize: 44,
        fontFamily: 'SFProText-Semibold'
    },
    inputContainer: {
        borderRadius: 25,
        marginTop: 30,
        paddingHorizontal: 30,
        fontSize: 16,
        backgroundColor: 'rgba(0,0,0,0.3)',
        width: width * 0.81,
        color: '#fff'
    },
    circle: {
        height: 50,
        width: 50,
        borderRadius: 50,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container2: {
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 15
    },
    topFixed: {
        height: 0.61 * height,
        overflow: 'hidden',
    },
    scrollView: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        marginTop: 70,
    },
    line: {
        height: 10,
        width: 50,
        backgroundColor: '#000',
        borderRadius: 25,
        marginTop: height * 0.61 - 100,
        left: width / 2 - 25,
        marginBottom: 10
    },
    scrollConatiner1: {
        backgroundColor: '#1E152A',
        borderTopLeftRadius: 75,
        borderTopRightRadius: 75,
        padding: 10,
        alignItems: 'center',
        paddingTop: 30,
    },
    scrollConatiner2: {
        backgroundColor: '#1E152A',
        alignItems: 'center',
    },
    headings: {
        fontSize: 24,
        color: '#fff',
        fontFamily: 'SFProText-Semibold'
    },
    flatlist: {
        minHeight: 200,
        paddingHorizontal: 20,
        paddingVertical: 20,
        marginHorizontal: 10
    }
})
const Resource = ({ route, navigation }) => {

    const { loading, error, data } = useQuery(BOOKS_QUERY)
    const [books, setBooks] = useState([])

    const { scrollHandler, y } = useScrollHandler()
    const zIndex = interpolate(y, {
        inputRange: [0, 1, 2, 3, 5, 6, 7, 8].map((i) => i * 50),
        outputRange: [0, 1, 2, 3, 5, 6, 7, 8].map((i) => i < 3 ? 1 : 0)
    })
    //const opacity = new Animated.Value(1)
    const opacity = interpolate(y, {
        inputRange: [0, 1, 2, 3, 5, 6, 7, 8].map((i) => i * 50),
        outputRange: [0, 1, 2, 3, 5, 6, 7, 8].map((i) => ((10 - i) / 10) * 1)
    })
    console.log('y is', y)
    useEffect(() => {
        if (data && data.books)
            setBooks(data.books)
    }, [data])
    return (
        <View style={styles.container}>
            <Image style={styles.backgorundImage} source={require('../../../assets/img/pattern/pattern3.png')} />
            {/* header */}
            <View style={styles.header}>
                <Feather name='align-center' size={24} style={[TextStyle.heading, { color: 'white' }]} color='white' />
            </View>
            <Animated.View style={[styles.topFixed, { ...StyleSheet.absoluteFillObject, zIndex, opacity }]}>

                <View style={styles.fixedContainer}>
                    <Text style={styles.hero}>Browse</Text>
                    <Text style={[TextStyle.description, { fontSize: 14 }]}>Find the subject that suits your interest </Text>
                    <TextInput style={styles.inputContainer} placeholder='Enter keywords' placeholderTextColor='#fff' />
                    <View style={{ flexDirection: 'row' }}>
                        <View style={[styles.container2]}>
                            <View style={styles.circle}>
                                <Feather name='trending-up' color='#fff' />
                            </View>
                            <Text style={[{ fontSize: 12 }]}>Popular</Text>
                        </View>
                        <View style={[styles.container2]}>
                            <View style={styles.circle}>
                                <Feather name='trending-up' color='#fff' />
                            </View>
                            <Text style={[{ fontSize: 12 }]}>Popular</Text>
                        </View>
                        <View style={[styles.container2]}>
                            <View style={styles.circle}>
                                <Feather name='trending-up' color='#fff' />
                            </View>
                            <Text style={[{ fontSize: 12 }]}>Popular</Text>
                        </View>
                        <View style={[styles.container2]}>
                            <View style={styles.circle}>
                                <Feather name='trending-up' color='#fff' />
                            </View>
                            <Text style={[{ fontSize: 12 }]}>Popular</Text>
                        </View>
                    </View>

                </View>
            </Animated.View>

            <Animated.ScrollView
                style={styles.scrollView}
                scrollEventThrottle={300}
                {...scrollHandler}
            >
                <View style={styles.line} />

                <PopularContainer books={books} navigation={navigation} />
                <Popular1Container books={books} navigation={navigation} />
                <Popular1Container books={books} navigation={navigation} />
            </Animated.ScrollView>
        </View>
    )
}

const PopularContainer = ({ books, navigation }) => {

    return (
        <View style={[styles.scrollConatiner1]}>
            <Text style={styles.headings}>Popular this week</Text>
            <FlatList
                data={books}
                style={styles.flatlist}
                horizontal
                renderItem={({ item }) => (
                    <BookThumbWithDetail key={item.name} {...item} navigation={navigation} />
                )}
                ListEmptyComponent={() => (
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Animation
                            style={{ height: 100, width: 100 }}
                            source={require('../../../assets/loader.json')}
                            progress={1}
                            autoPlay={true}
                            speed={1}
                            loop
                        />
                    </View>
                )} />
        </View>
    )
}


const Popular1Container = ({ books, navigation }) => {

    return (
        <View style={[styles.scrollConatiner2]}>
            <Text style={styles.headings}>Popular this week</Text>
            <FlatList
                data={books}
                style={styles.flatlist}
                horizontal
                renderItem={({ item }) => (
                    <BookThumbWithDetail key={item.name} {...item} navigation={navigation} />
                )}
                ListEmptyComponent={() => (
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Animation
                            style={{ height: 100, width: 100 }}
                            source={require('../../../assets/loader.json')}
                            progress={1}
                            autoPlay={true}
                            speed={1}
                            loop
                        />
                    </View>
                )} />
        </View>
    )
}
export default Resource
