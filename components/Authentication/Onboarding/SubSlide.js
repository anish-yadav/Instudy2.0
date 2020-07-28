import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Button from '../../basic/Button'

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    subTitle:{
        fontSize: 20,
        fontFamily: 'SFProText-Semibold',
        color: '#1E152A'
    },
    description:{
        color: 'rgba(30,21,42,0.7)',
        fontSize: 16,
        paddingHorizontal: 40,
        textAlign: 'center',
        fontFamily: 'SFProText-Regular'
    }
})

const SubSlide = ({ subTitle, description , last, onPress }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.subTitle}>{ subTitle } </Text>
            <Text style={styles.description}>{ description }</Text>
            <Button text={ !last? 'Next':'Let\'s go'} variant={ last? 'primary':'default'} { ...{ onPress }} />
        </View>
    )
}

export default SubSlide

