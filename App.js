import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider, useSelector } from 'react-redux'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'

import {NavigationContainer} from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import Feather from 'react-native-vector-icons/Feather'

import {store,persistor} from './store/store'

import LoginScreen from './components/screens/LoginScreen'
import ResourcesScreen from './components/screens/ResourcesScreen'
import AttendanceScreen from './components/screens/AttendanceScreen'
import SettingsScreen from './components/screens/SettingsScreen'

import UploadScreen from './components/screens/Resources/UploadScreen'
import BookDetailScreen from './components/screens/Resources/BookDetailScreen'

const TabStack  = createBottomTabNavigator()
const Stack = createStackNavigator()

const client = new ApolloClient({
  uri:'https://684a97786793.ngrok.io/graphql'
})
const ResourceStack = () => {
  return(
    <Stack.Navigator
      screenOptions={({route}) => ({
        headerShown:route.name === 'resource'?false:true,
        headerTitleAlign:'center'
      })}  
      >
      <Stack.Screen component={ResourcesScreen} name="resource" />
      <Stack.Screen component={UploadScreen} name="upload" options={{
        title:'Upload'
      }} />
      <Stack.Screen component={BookDetailScreen} name="detail" options={{
        title:'Book',
        thumb:'',
        url:'',
        name:'',
        headerTitle: props => <Text></Text> ,
        headerLeft: props => <TouchableOpacity  {...props}><Feather style={styles.closeButton} name='x' /></TouchableOpacity>,
        headerStyle:{
          backgroundColor:'#EFF1F1',
          elevation: 0, // remove shadow on Android
          shadowOpacity: 0, //removes shadow on IOS
        }
      }} />
    </Stack.Navigator>
  )
}

const HomeStackScreen = () => {
  const {isLoggedIn} = useSelector(state => ({
    ...state.authReducer
  }))

  if(!isLoggedIn)
    return <LoginScreen />
  else {
    return (
      <NavigationContainer>
        <TabStack.Navigator
          screenOptions={({route}) => ({
            tabBarIcon:({focused,color,size}) => {
              if(route.name == 'attendance'){
                return (<View style={styles.container}>
                  <Feather style={styles.icon} name={'trending-up'} size={size} color={color}/>
                  {
                    focused?
                    <View style={{backgroundColor:"#1B0A78",height:7,width:7,borderRadius:7}}></View>
                    : <View></View>
                  }
                </View>)
              }else if(route.name === 'resource'){
                return (<View style={styles.container}>
                  <Feather style={styles.icon} name={'book'} size={size} color={color} />
                  {
                    focused?
                    <View style={{backgroundColor:"#1B0A78",height:7,width:7,borderRadius:7}}></View>
                    : <View></View>
                  }
                </View>)
              }
              else if(route.name === 'setting'){
                return (<View style={styles.container}>
                  <Feather style={styles.icon} name={'settings'} size={size} color={color} />
                  {
                    focused?
                    <View style={{backgroundColor:"#1B0A78",height:7,width:7,borderRadius:7}}></View>
                    : <View></View>
                  }
                </View>)
              }
              return <Feather name={"bell"} size={size} color={color} />
            }
          })}
          tabBarOptions={{
            showLabel:false,
            activeTintColor:'#1B0A78',
            inactiveTintColor:"#000",
            style:{
              backgroundColor:'#fafafa'
            }
          }}
        >
          <TabStack.Screen component={AttendanceScreen} name="attendance" />
          <TabStack.Screen component={ResourceStack} name="resource" />
          <TabStack.Screen component={SettingsScreen} name="setting" />
        </TabStack.Navigator>
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
  container :{
    justifyContent:'center',
    alignItems:'center'
  },
  icon:{
    marginBottom:1
  },
  closeButton:{
    fontSize:24,
    marginLeft:15
  }
})
