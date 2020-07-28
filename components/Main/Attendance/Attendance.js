import React from 'react'
import { useSelector } from 'react-redux'
import { View, Text, StyleSheet, FlatList, Image, Dimensions } from 'react-native'
import  Feather from 'react-native-vector-icons/Feather'

import AttendanceItem from './AttendanceItem'

const { width, height } = Dimensions.get('window')
export default function Attendance({ route, navigation }) {

    const { attendance } = useSelector(state => ({
        ...state.authReducer
    }))

    
    
    return (
        <View style={styles.container}>
            <Image style={{ ...StyleSheet.absoluteFillObject,width,height}} source={require('../../../assets/img/pattern/pattern3.png')} />
            <FlatList
                data={attendance}
                style={{flex:1}}
                keyExtractor={item => item.subCode}
                renderItem={({item}) => (
                    <AttendanceItem  item={item} navigation={navigation} />
                )}
                ListEmptyComponent={() => (
                    <Text>No Data</Text>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        backgroundColor:"#fff"
    }
})
