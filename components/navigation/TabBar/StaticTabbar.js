import React, { useState } from 'react'
import { View, Text, TouchableWithoutFeedback, StyleSheet, Animated, Dimensions } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import { Extrapolate } from 'react-native-reanimated'

const { width } = Dimensions.get('window')
export const tabHeight = 64
export default function StaticTabbar({ tabs, value }) {

  const [values, setValues] = useState(tabs.map((_, index) => new Animated.Value(index === 0 ? 1 : 0)))


  const tabWidth = width / tabs.length
  const handelPress = (key) => {

    //  When clicking we are setting its value to 1 and everyone elses to 0 
    Animated.sequence([
      // Setting to 0
      ...values.map(value => Animated.timing(value,{
        toValue: 0,
        duration:50,
        useNativeDriver: true
      })),
      // Setting to 1
      Animated.parallel([
        Animated.spring(values[key], {
          toValue: 1,
          useNativeDriver: true
        }),
        Animated.spring(value, {
          toValue: -width + tabWidth * key,
          useNativeDriver: true
        })
      ]),
      
    ]).start()
  }

  return (
    <View style={[styles.container,{ backgroundColor: '#1E152A'}]}>
      {
        tabs.map(({ name }, index) => {
          const activeValue = values[index] // 1,0,0,0,0
          const opacity = value.interpolate({
            inputRange: [-width + tabWidth * (index - 1), -width + tabWidth * (index), -width + tabWidth * (index + 1)],
            outputRange: [1, 0, 1],
            extrapolate: Extrapolate.CLAMP
          })
          const translateY = activeValue.interpolate({
            inputRange: [0,1],
            outputRange: [tabHeight, 0]
          })
          return (
            <React.Fragment key={index}>
              <TouchableWithoutFeedback onPress={() => handelPress(index)}>
                <Animated.View style={[styles.tab, { opacity }]}>
                  <Feather name={name} size={25} color='#ccc'/>
                </Animated.View>
              </TouchableWithoutFeedback>
              <Animated.View style={{
                position: 'absolute',
                width: tabWidth,
                top: -8,
                left: tabWidth * index,
                height: tabHeight,
                justifyContent: 'center', alignItems: 'center',
                transform:[{ translateY}]
              }}>
                <View style={styles.circle}>
                  <Feather name={name} size={25} color='#000' />
                </View>
              </Animated.View>
            </React.Fragment>
          )
        })
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: tabHeight
  },
  activeIcon: {
    position: 'absolute'
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  }
})