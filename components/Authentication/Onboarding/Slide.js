import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native'
import Animated from 'react-native-reanimated'

const { width, height } = Dimensions.get('window')
export const SLIDE_HEIGHT = 0.61* height
export const BORDER_RADIUS = 75
const styles = StyleSheet.create({
    container:{
        flex:1,
        height: SLIDE_HEIGHT,
        width,
        overflow: 'hidden'
    },
    textContainer:{
        justifyContent:'center',
        alignItems:'center',
    },
    hero:{
        fontSize: 70,
        color:'#FFFFFF',
        fontFamily: 'SFProText-Bold'
    },
    pictureContainer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center'
    },
    picture:{
        width: 377,
        height: 278
    }
})

export default function Slide({ title, right, picture }) {
    return (
        <View style={styles.container}>
            <View style={styles.pictureContainer}>
                <Image source={picture} style={[styles.picture,{ marginLeft: right? -50: 50}]} />
            </View>
            <View 
                style={[ 
                    styles.textContainer,
                    {  transform: [
                        { translateX : right ? width/2- 25 : -width/2 +25},
                        { translateY : SLIDE_HEIGHT/2 - 50},
                        { rotate: right ? '90deg': '-90deg'}
                    ]}
                     ]}>
                <Text style={styles.hero}> { title }</Text>
            </View>
        </View>
    )
}
