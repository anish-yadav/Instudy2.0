import React, { useState, useRef } from 'react'
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { interpolateColor } from 'react-native-redash'
const{ width } = Dimensions.get('window')
const height = 64
const tabWidth = width/5
const tabs = [
  { name: 'book-open' ,screen: 'Resource' },
  { name: 'video' ,screen: 'Attendance' },
  { name: 'home' ,screen: 'Attendance' },
  { name: 'message-circle' ,screen: 'Attendance' },
  { name: 'user' ,screen: 'Attendance' }
]

const TabBar = ({ navigation }) => {
  //console.log(props)
  const [values, setValues] = useState(tabs.map((_, i) => new Animated.Value(i)))
  const [ active,setActive] = useState(2)
  const value = new Animated.Value(active*tabWidth)
  const handlePress = (i) => {
    
    // const v = tabs.map((_, i) => new Animated.Value(0))
    // setValues(v)
      console.log('to value', i*tabWidth)
      console.log('before animation',value)
      Animated.timing(value,{
        toValue: i*tabWidth,
        duration:200
      }).start(({ finished }) => {
      console.log('after animation', value)
      console.log('Finished')
      setActive(i)
      navigation.navigate(tabs[i].screen)
    })
    
  }
  return (
    <View style={styles.container}>
      <Animated.View  style={[styles.circle,{ transform: [{ translateX: value}]}]} />
      {
        tabs.map(({ name }, i) => {
          const activeValue = values[i]
          const opacity = activeValue.interpolate({
            inputRange: tabs.map((_,i) => i ),
            outputRange: tabs.map((_,i)=> i === active? 0:1)
          })
          const activeOpacity = activeValue.interpolate({
            inputRange: tabs.map((_,i) => i ),
            outputRange: tabs.map((_,i)=> i === active? 1:0)
          })
          return (
            <TouchableWithoutFeedback key={i} onPress={() => handlePress(i)}>
              <Animated.View  style={[styles.tab, { ...StyleSheet.absoluteFillObject, opacity:activeOpacity }]}>
                <Feather name={name} size={24} color='#fff' />
              </Animated.View>
              <Animated.View  style={[styles.tab, { opacity }]}>
                <Feather name={name} size={24} color='#1E152A' />
              </Animated.View>

              
            </TouchableWithoutFeedback>
          )
        })
      }
    </View>
  )
}

export default TabBar

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: 'white'
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  tab: {
    justifyContent: 'center',
    alignItems: 'center',
    height: height,
  },
  circle: {
    ...StyleSheet.absoluteFillObject,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#1E152A',
    marginTop: (height - 50) / 2,
    marginLeft: 10,
  }
})
