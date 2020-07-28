import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'


const styles = StyleSheet.create({
    button:{
        width:245,
        marginTop:40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25
    },
    buttonText: {
        fontFamily: 'SFProText-Regular',
        fontSize:16,
        paddingVertical:10
    }
})
const Button = ({ text, variant, onPress }) => {
    const color = variant === 'primary' ? '#FFFFFF': '#1E152A'
    const backgroundColor = variant === 'primary' ? '#009C69': 'rgba(30,21,42,0.1)'
    return (
        <RectButton style={[styles.button, { backgroundColor }]} {...{ onPress }}>
            <Text style={[styles.buttonText, { color }]}>{ text }</Text>
        </RectButton>
    )
}

export default Button
