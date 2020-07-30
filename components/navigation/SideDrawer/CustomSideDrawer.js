import React from 'react'
import { useSelector, useDispatch }  from 'react-redux'
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import {
  DrawerContentScrollView
} from '@react-navigation/drawer'

import { logout } from '../../../actions/index'

const { height } = Dimensions.get('window')
export default function CustomSideDrawer(props) {
  const { navigation } = props
  const { name } = useSelector(state => ({
    ...state.authReducer
  }))
  const { active } = useSelector(state => ({
    ...state.history
  }))
  const dispatch = useDispatch()
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.profileContainer}>
        <Image style={styles.logo} source={require('../../../assets/icon.png')} />
        
      </View>
      <View style={styles.container}>

        {/* main navigations */}
      <View style={styles.navigationContainer}>
          


          <TouchableOpacity style={[styles.itemContainer,active == 'all_books'?styles.activeContainer:styles.nothing]} onPress={() => navigation.navigate('Books')}>
            <Feather name='book' style={[styles.icon,active == 'all_books'?styles.activeColor:styles.nothing]} />
            <Text style={[styles.text,active == 'all_books'?styles.activeColor:styles.nothing]}>Books</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.itemContainer,active == 'all_books'?styles.activeContainer:styles.nothing]} onPress={() => navigation.navigate('resource',{ screen: 'all_books'})}>
            <Feather name='book' style={[styles.icon,active == 'all_books'?styles.activeColor:styles.nothing]} />
            <Text style={[styles.text,active == 'all_books'?styles.activeColor:styles.nothing]}>Notes</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.itemContainer,active == 'all_books'?styles.activeContainer:styles.nothing]} onPress={() => navigation.navigate('resource',{ screen: 'all_books'})}>
            <Feather name='book' style={[styles.icon,active == 'all_books'?styles.activeColor:styles.nothing]} />
            <Text style={[styles.text,active == 'all_books'?styles.activeColor:styles.nothing]}>Question Papers</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.itemContainer,active == 'videos'?styles.activeContainer:styles.nothing]} onPress={() => navigation.navigate('home',{ screen: 'videos'})}>
            <Feather name='video' style={[styles.icon,active == 'videos'?styles.activeColor:styles.nothing]} />
            <Text style={[styles.text,active == 'videos'?styles.activeColor:styles.nothing]}>Videos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.itemContainer,active == 'favourite'?styles.activeContainer:styles.nothing]}>
            <Feather name='heart' style={[styles.icon,active == 'favourite'?styles.activeColor:styles.nothing]} />
            <Text style={[styles.text,active == 'favourite'?styles.activeColor:styles.nothing]}>Favourite</Text>
          </TouchableOpacity>

      </View>


      {/* Bootom part */}
      <View style={styles.navigationContainer}>
          <TouchableOpacity style={styles.itemContainer}>
            <Feather style={styles.icon} name='share-2' />
            <Text style={styles.text}>Tell a Friend</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.itemContainer}>
            <Feather style={styles.icon} name='help-circle' />
            <Text style={styles.text}>Help and Feedback</Text>
          </TouchableOpacity>
      </View>
      </View>
    </DrawerContentScrollView>
  )
}

const styles = StyleSheet.create({
  container:{
    paddingHorizontal:20,
    paddingTop:20,
    paddingBottom:20,
    justifyContent:'space-between',
    height : height-70-150
  },
  profileContainer:{
    height: 150,
    justifyContent:'flex-end',
    paddingHorizontal:30
  }, 
  navigationContainer:{
    borderTopWidth:1,
    borderTopColor:'#F4EFF8'
  },
  itemContainer:{
    flexDirection:'row',
    alignItems:'center',
    paddingVertical: 10,
    paddingLeft:10
  },
  activeContainer:{
    backgroundColor:'#ccebe1',
    borderRadius:5
  },
  logo: {
    width: 120,
    height: 100,
  },
  name:{
    fontSize:24,
    textTransform:'capitalize',
    fontFamily: 'SFProText-Regular'
  },
  text:{
    marginLeft:20,
    fontSize:16,
    color:'#514D51',
    fontWeight:'600'
  },
  icon :{
    fontSize:18,
    color:'#C2C2C2'
  },
  activeColor:{
    color:'#009C69'
  }
})
