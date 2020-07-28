import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import Login from './Login/Login'
import  Onboarding   from './Onboarding/Onboarding'


const AuthenticationStack = createStackNavigator()
const Authentication = () => {
    return (
        <NavigationContainer>
            <AuthenticationStack.Navigator headerMode='none'>
                <AuthenticationStack.Screen name='Onboarding' component={Onboarding} />
                <AuthenticationStack.Screen name='Login' component={Login} />
            </AuthenticationStack.Navigator>
        </NavigationContainer>
    )
}

export default Authentication
