import React from 'react'
import { View, Text,TouchableOpacity } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import Feather from 'react-native-vector-icons/Feather'
import Attendance from './Attendance'
import AttendanceDetail from './AttendanceDetail'
import { TextStyle } from '../../basic/GlobalStyle'
const Stack = createStackNavigator()
const AttendanceStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name='Attendace' 
                component={Attendance}
                options={{
                    headerTitleAlign: 'center',
                    headerTitle: props => <Text style={[TextStyle.heading]}>Attendance</Text>
                }} />
            <Stack.Screen name='Attendance_Detail' component={AttendanceDetail}
                options={{
                    title: 'Attendance',
                    thumb: '',
                    url: '',
                    name: '',
                    headerTitle: props => <Text></Text>,
                    headerLeft: props => <TouchableOpacity  {...props}><Feather style={{ fontSize: 24, marginLeft: 10}} name='x' /></TouchableOpacity>,
                    headerStyle: {
                        backgroundColor: '#EFF1F1',
                        elevation: 0, // remove shadow on Android
                        shadowOpacity: 0, //removes shadow on IOS
                    }
                }} />
        </Stack.Navigator>
    )
}

export default AttendanceStack
