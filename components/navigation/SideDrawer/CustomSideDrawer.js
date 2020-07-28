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
        <Image style={styles.profileImage} source={require('../../../assets/avatar/male1.png')} />
        <Text style={styles.name}>{name || 'Anish Kumar Yadav'}</Text>
      </View>
      <View style={styles.container}>

        {/* main navigations */}
      <View style={styles.navigationContainer}>
          <TouchableOpacity 
          style={[styles.itemContainer,active == 'attendance'?styles.activeContainer:styles.nothing]} 
          onPress={()=> navigation.navigate('home',{screen: 'attendance'})}>
            <Feather name='user' style={[styles.icon,active == 'attendance'?styles.activeColor:styles.nothing]} />
            <Text style={[styles.text,active == 'attendance'?styles.activeColor:styles.nothing]}>Attendance</Text>
          </TouchableOpacity>

          <TouchableOpacity 
          style={[styles.itemContainer,active == 'message'?styles.activeContainer:styles.nothing]} 
          onPress={() => navigation.navigate('message')}
          >
            <Feather name='message-square' style={[styles.icon,active == 'message'?styles.activeColor:styles.nothing]} />
            <Text style={[styles.text,active == 'message'?styles.activeColor:styles.nothing]}>Messages</Text>
          </TouchableOpacity>


          <TouchableOpacity style={[styles.itemContainer,active == 'all_books'?styles.activeContainer:styles.nothing]} onPress={() => navigation.navigate('resource',{ screen: 'all_books'})}>
            <Feather name='book' style={[styles.icon,active == 'all_books'?styles.activeColor:styles.nothing]} />
            <Text style={[styles.text,active == 'all_books'?styles.activeColor:styles.nothing]}>Books</Text>
          </TouchableOpacity>


          <TouchableOpacity style={[styles.itemContainer,active == 'videos'?styles.activeContainer:styles.nothing]} onPress={() => navigation.navigate('home',{ screen: 'videos'})}>
            <Feather name='video' style={[styles.icon,active == 'videos'?styles.activeColor:styles.nothing]} />
            <Text style={[styles.text,active == 'videos'?styles.activeColor:styles.nothing]}>Videos</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.itemContainer,active == 'favourite'?styles.activeContainer:styles.nothing]}>
            <Feather name='heart' style={[styles.icon,active == 'favourite'?styles.activeColor:styles.nothing]} />
            <Text style={[styles.text,active == 'favourite'?styles.activeColor:styles.nothing]}>Favourite</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.itemContainer} onPress={() => dispatch(logout())}>
            <Feather name='log-out' style={styles.icon} />
            <Text style={styles.text}>Sign Out</Text>
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
    height : height-210
  },
  profileContainer:{
    height: 200,
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
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  name:{
    fontSize:18,
    fontWeight:'600',
    marginTop:20,
    textTransform:'capitalize'
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
