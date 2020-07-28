import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View, Text, StyleSheet, ScrollView, Dimensions, Image, TouchableOpacity, TextInput } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'

import { getSubjectImage } from '../../../helpers/subjectImage'
import { heplerString } from '../../../helpers/attendance'

import { setAttendanceGoal } from '../../../actions/index'

const { width, height } = Dimensions.get('screen')
const bg = {
  danger:'#f7d5d5',
  normal:'#ccebe1'
}
const color = {
  danger:'#d32f2f',
  normal:'#009C69'
}
export default function AttendanceDetail({ route, navigation}) {
  const { attendance } = useSelector(state => ({
    ...state.authReducer
  }))
  const dispatch = useDispatch()
  const { subCode, subject, percentage } = route.params
  const currAttendace = attendance.find(d => d.subCode === subCode)
  const { theo, prac } = currAttendace
  const [ currGoal,setGoal ] = useState(currAttendace.goal || 75)


  const handleChange = (n) => {
    if (n > 10 && n <= 100){
      console.log('sending set request')
      setGoal(n)
      dispatch(setAttendanceGoal({subCode,goal:n}))
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.bookImage}>
        <Image style={styles.bookImage} source={getSubjectImage(subCode)} />
      </View>

      <View style={styles.description}>
        <View style={styles.subCodeConatiner}>
          <Text style={styles.subCodeText}>{ subCode }</Text>
        </View>
        <Text style={styles.primaryText}>{ subject }</Text>
        <Text style={[styles.percentage,{ color: percentage<currGoal? color.danger : color.normal}]}>{ Math.floor(percentage) }%</Text>
        <View style={{flexDirection:'row',justifyContent:'space-between', width:200}}>
          <Text>Theo: {currAttendace.theo}</Text>
          <Text>Prac: {currAttendace.prac}</Text>
        </View>
        <View style={{ alignItems: 'flex-start', width: width - 20, paddingVertical: 20, paddingHorizontal: 10 }}>
          <Text style={styles.secondaryText}>Any help</Text>
          <Text style={styles.secondaryText, { color: 'black' }}>{heplerString(theo, prac, currGoal)}</Text>
          <Text style={styles.secondaryText, { color: 'black' }}>Attend 5 more classes to obtain 80%</Text>
          <Text style={styles.secondaryText, { color: 'black' }}>Attend 5 more classes to obtain 80%</Text>
        </View>
        <View style={{justifyContent: 'flex-end', alignItems:'center'}}>
          <Text style={[styles.primaryText,{textTransform:'none'}]}>Set Goal (in %)</Text>
          <View style={{flexDirection:'row',justifyContent:'space-between', alignItems:'center'}}>
            <TouchableOpacity onPress={() => handleChange(currGoal-1 )}>
            <Feather name='minus' style={{backgroundColor:bg.danger,padding:5}} color={color.danger} size={24}  />
            </TouchableOpacity>
            <TextInput style={styles.goalInput} keyboardType='number-pad' value={currGoal+''} onChangeText={text => handleChange(text)} />
            <TouchableOpacity onPress={() => handleChange(currGoal+1 )}>
            <Feather name='plus' style={{backgroundColor:bg.normal,padding:5}} color={color.normal} size={24} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    height:height
  },
  bookImage: {
    width: 150,
    height: 220,
    zIndex: 999,
    borderRadius: 10,
    shadowOffset: { width: 10, height: 10 },
    shadowColor: '#009C69',
    shadowOpacity: 1,
    elevation: 20,
    backgroundColor: "#009C69"
  },
  description: {
    backgroundColor: "#fff",
    width: width - 20,
    height:height,
    marginHorizontal: 20,
    alignItems: 'center',
    position: 'relative',
    top: -150,
    paddingTop: 170,
    paddingBottom:30,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  secondaryText: {
    color: '#ccc',
    fontSize: 14
  },
  primaryText: {
    color: '#222222',
    fontSize: 20,
    textTransform: 'capitalize',
    fontFamily: 'OpenSans_600SemiBold',
    textAlign:'center'
  },
  percentage:{
    fontSize:44,
    fontWeight:'bold'
  },
  subCodeConatiner: {
    backgroundColor: '#ccebe1',
    paddingHorizontal: 5,
    paddingVertical: 4,
    borderRadius: 4
  },
  subCodeText: {
    color: '#009C69'
  },
  downloadButton:{
    backgroundColor:'#009C69',
    width:width-40,
    paddingVertical:15,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10
  },
  downloadText:{
    color:'#fff',
    fontSize:16
  },
  goalInput:{
    width:width-150,
    textAlign: 'center',
    fontSize:24,
    borderBottomWidth:1,
    borderBottomColor: '#ccc'
  }
})