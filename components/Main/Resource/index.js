import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import CustomSideDrawer from '../../navigation/SideDrawer/CustomSideDrawer'

import { ResourceStack } from './Resource'
import Books from './Books'
const Drawer = createDrawerNavigator()
const ResourceDrawer = () => {
    return (
        <Drawer.Navigator  
            drawerContent={props => <CustomSideDrawer {...props} />}
            >
            <Drawer.Screen 
                name='Resource' 
                component={ResourceStack}
                 />
            <Drawer.Screen name='Books' component={Books} />
        </Drawer.Navigator>
    )
}

export default ResourceDrawer
