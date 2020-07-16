import React,{useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import  Feather from 'react-native-vector-icons/Feather'


import Attendance from '../basic/Attendance'

export default function AttendanceScreen({ route, navigation }) {

    const { attendance } = useSelector(state => ({
        ...state.authReducer
    }))

    
    
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Feather name='menu' size={28} />
            </TouchableOpacity>
            <FlatList
                data={attendance}
                style={{flex:1}}
                keyExtractor={item => item.subCode}
                renderItem={({item}) => (
                    <Attendance  item={item} navigation={navigation} />
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
        paddingHorizontal:10,
        paddingTop:20,
        backgroundColor:"#f7fcfa"
    }
})
