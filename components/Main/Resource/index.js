import React from 'react'
import { View, Text,TouchableOpacity } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import Feather from 'react-native-vector-icons/Feather'
import Resource from './Resource'
const Stack = createStackNavigator()
const ResourceStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name='Resource' 
                component={Resource}
                options={{
                    headerShown: false
                }} />
            
        </Stack.Navigator>
    )
}

export default ResourceStack
