import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider, useSelector, useDispatch } from 'react-redux'
import ApolloClient, { InMemoryCache } from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'

import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { navigationRef, navigate } from './helpers/navigationRef'
import Feather from 'react-native-vector-icons/Feather'

import { store, persistor } from './store/store'
import { setActiveRoute } from './actions/index'

import { BottomTabBadge } from './components/navigation/BottomTab'

import LoginScreen from './components/screens/LoginScreen'
import ResourcesScreen from './components/screens/ResourcesScreen'
import AttendanceScreen from './components/screens/AttendanceScreen'
import AttendanceDetailScreen from './components/screens/AttendanceDetailScreen'
import SettingsScreen from './components/screens/SettingsScreen'
import CustomSideDrawer from './components/navigation/SideDrawer/CustomSideDrawer'
import AllCategoriesScreen from './components/screens/Resources/AllCategoriesScreen'
import VideoScreen from './components/screens/Video/VideoScreen'


import UploadScreen from './components/screens/Resources/UploadScreen'
import BookDetailScreen from './components/screens/Resources/BookDetailScreen'
import SearchScreen from './components/screens/Resources/SearchScreen'
import AllBooksScreen from './components/screens/Resources/AllBooksScreen'
import VideoDetialScreen from './components/screens/Video/VideoDetialScreen';

const TabStack = createBottomTabNavigator()
const Stack = createStackNavigator()
const DrawerStack = createDrawerNavigator()

const client = new ApolloClient({
  uri: 'https://intense-plateau-68311.herokuapp.com/graphql'
})
const ResourceStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        headerShown: route.name === 'resource' ? false : true,
        headerTitleAlign: 'center'
      })}
    >
      <Stack.Screen component={ResourcesScreen} name="resource" />
      <Stack.Screen component={UploadScreen} name="upload" options={{
        title: 'Upload'
      }} />
      <Stack.Screen component={BookDetailScreen} name="detail" options={{
        title: 'Book',
        thumb: '',
        url: '',
        name: '',
        headerTitle: props => <Text></Text>,
        headerLeft: props => <TouchableOpacity  {...props}><Feather style={styles.closeButton} name='x' /></TouchableOpacity>,
        headerStyle: {
          backgroundColor: '#f7fcfa',
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0, //removes shadow on IOS
        }
      }} />
      <Stack.Screen component={SearchScreen} name="search" options={{
        title: 'Search Results',
        text: '',
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          backgroundColor: '#EFF1F1'
        }
      }} />
      <Stack.Screen component={AllBooksScreen} name="all_books" options={{
        title: 'Books',
        headerLeft: props => <TouchableOpacity onPress={() => navigate('resource') }><Feather style={styles.closeButton} name='arrow-left' /></TouchableOpacity>
      }} />
    </Stack.Navigator>
  )
}

const AttendanceStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        headerShown: route.name === 'attendance' ? false : true,
        headerTitleAlign: 'center'
      })}>
      <Stack.Screen component={AttendanceScreen} name="attendance" />
      <Stack.Screen component={AttendanceDetailScreen} name="attendance_detail" options={{
        title: 'Attendance',
        thumb: '',
        url: '',
        name: '',
        headerTitle: props => <Text></Text>,
        headerLeft: props => <TouchableOpacity  {...props}><Feather style={styles.closeButton} name='x' /></TouchableOpacity>,
        headerStyle: {
          backgroundColor: '#EFF1F1',
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0, //removes shadow on IOS
        }
      }} />
    </Stack.Navigator>
  )
}

const VideoStack = () => (
  <Stack.Navigator
  screenOptions={({route}) => ({
    headerShown: route.name === 'videos' ? false: true,
    headerTitleAlign: 'center'
  })}
  >
    <Stack.Screen component={VideoScreen} name="videos" />
    <Stack.Screen 
      component={VideoDetialScreen} 
      name="video_detail"
      options={({ route }) => ({
        title: route.params.name
      })} />
  </Stack.Navigator>
)
const TabStackScreen = () => {
  return (
    <TabStack.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name == 'attendance') {
            return ( BottomTabBadge('trending-up',focused,color,size))
          } else if (route.name === 'resource') {
            return (BottomTabBadge('book',focused,color,size))
          }
          else if (route.name === 'videos') {
            return ( BottomTabBadge('video',focused,color,size))
          }
          return <Feather name={"bell"}  />
        }
      })}
      tabBarOptions={{
        showLabel: false,
        activeTintColor: '#009C69',
        inactiveTintColor: "#009C69",
        style: {
          backgroundColor: '#f7fcfa',
          elevation: 0,
          height: 60
        }
      }}
    >
      <TabStack.Screen component={AttendanceStack} name="attendance" />
      <TabStack.Screen component={ResourceStack} name="resource" />
      <TabStack.Screen component={VideoStack} name="videos" />
    </TabStack.Navigator>
  )
}
const HomeStackScreen = () => {
  const { isLoggedIn } = useSelector(state => ({
    ...state.authReducer
  }))
  const dispatch = useDispatch()
  const routeNameRef = React.useRef();

  if (!isLoggedIn)
    return <LoginScreen />
  else {
    return (
      <NavigationContainer
        ref={navigationRef}
        onReady={() => routeNameRef.current = navigationRef.current.getCurrentRoute().name}
        onStateChange={() => {
          const previousRouteName = routeNameRef.current;
          const currentRouteName = navigationRef.current.getCurrentRoute().name

          if (previousRouteName !== currentRouteName) {
            dispatch(setActiveRoute({ name: currentRouteName }))
          }

          // Save the current route name for later comparision
          routeNameRef.current = currentRouteName;
        }}
      >
        <DrawerStack.Navigator drawerType='front' drawerContent={props => <CustomSideDrawer {...props} />}>
          <DrawerStack.Screen component={TabStackScreen} name='home' />
          <DrawerStack.Screen component={AllCategoriesScreen} name='all' />
        </DrawerStack.Navigator>
      </NavigationContainer>
    )
  }
}



export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} >
        <ApolloProvider client={client}>
          <HomeStackScreen />
        </ApolloProvider>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    marginBottom: 1,
    fontSize: 24
  },
  closeButton: {
    fontSize: 24,
    marginLeft: 15
  },
  activeTabContainer: {
    backgroundColor: '#ccebe1',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25
  },
  activeOuterContainer: {
    backgroundColor: '#fff',
    width: 60,
    height: 60,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  }
})
