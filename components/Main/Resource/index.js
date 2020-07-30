import React from 'react'
import { View, Text,TouchableOpacity } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import CustomSideDrawer from '../../navigation/SideDrawer/CustomSideDrawer'

import Resource from './Resource'
import ResourceDetail from './ResourceDetail'
import Books from './Books'
const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()
const ResourceStack = () => {
    return (
        <Drawer.Navigator  
            drawerContent={props => <CustomSideDrawer {...props} />}
            >
            <Drawer.Screen 
                name='Resource' 
                component={Resource}
                 />
            <Drawer.Screen name='Resource_Detail' component={ResourceDetail} />
            <Drawer.Screen name='Books' component={Books} />
        </Drawer.Navigator>
    )
}

export default ResourceStack
