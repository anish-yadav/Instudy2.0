import React from 'react'
import { useDispatch } from 'react-redux'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

import { logout } from '../../actions/index'

export default function SettingsScreen() {
    const dispatch = useDispatch()
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => dispatch(logout())}>
                <Text>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})