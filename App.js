import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider, useSelector, useDispatch } from 'react-redux'
import { ApolloClient, ApolloProvider } from '@apollo/client'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'

import { store, persistor } from './store/store'

import { Authentication, Main } from './components'
import { useFonts } from '@expo-google-fonts/dev'
import { HttpLink, InMemoryCache } from 'apollo-boost';
import { VideoProvider } from './context/VideoContext';

const client = new ApolloClient({
  uri: 'http://192.168.42.172:4000/graphql',
  cache: new InMemoryCache(),
})

const HomeStackScreen = () => {
  const { isLoggedIn } = useSelector(state => ({
    ...state.authReducer
  }))

  if (!isLoggedIn)
    return <Authentication />
  else {
    return (
      <Main />
    )
  }
}



export default function App() {
  const [loaded] = useFonts({
    'SFProText-Bold': require('./assets/fonts/SF-Pro-Text-Bold.otf'),
    'SFProText-Semibold': require('./assets/fonts/SF-Pro-Text-Semibold.otf'),
    'SFProText-Regular': require('./assets/fonts/SF-Pro-Text-Regular.otf')
  })

  if (!loaded)
    return <View><Text>Loading</Text></View>

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} >
        <ApolloProvider client={client}>
          <VideoProvider>
            <HomeStackScreen />
          </VideoProvider>
        </ApolloProvider>
      </PersistGate>
    </Provider>
  );
}
