import React,{ useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import TabBar from '../navigation/TabBar/TabBar'
import { View, Text } from 'react-native'
import AttendanceStack from './Attendance'
import ResourceStack from './Resource'


const TabStack = createBottomTabNavigator()
const Demo = () => <View style={{ flex: 1, backgroundColor: '#fafafa' }}><Text>Demo</Text></View>
const Main = () => {
    return (
        <NavigationContainer >
            <TabStack.Navigator tabBar={props => <TabBar {...props} />}  >
                <TabStack.Screen name='Attendance' component={AttendanceStack} />
                <TabStack.Screen name='Resource' component={ResourceStack} />
            </TabStack.Navigator>
        </NavigationContainer>
    )
}

export default Main
