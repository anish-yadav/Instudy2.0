import React, { useState } from 'react'
import { View, Text, FlatList, StyleSheet, Dimensions, TouchableOpacity, Modal, ScrollView } from 'react-native'
import { CheckBox } from 'react-native-elements'

import { useQuery } from '@apollo/client'
import Animation from 'lottie-react-native'
import Feather from 'react-native-vector-icons/Feather'

import { BookThumbWithDetail, BookThumb } from '../../basic/BooksAndVideoCard'
import { BOOKS_QUERY } from '../../../helpers/query'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

const { width, height } = Dimensions.get('screen')

export default function Books({ navigation, route }) {

  const [filterVisible, showFilter] = useState(false)
  var SEMESTER = [
    {
      name: '1st',
      selectedClass: styles.semesterCard,
      isSelected: false
    },
    {
      name: '2nd',
      selectedClass: styles.semesterCard,
      isSelected: false
    },
    {
      name: '3rd',
      selectedClass: styles.semesterCard,
      isSelected: false
    },
    {
      name: '4th',
      selectedClass: styles.semesterCard,
      isSelected: false
    },
    {
      name: '5th',
      style: styles.semesterCard,
      isSelected: false
    },
    {
      name: '6th',
      selectedClass: styles.semesterCard,
      isSelected: false
    },
    {
      name: '7th',
      selectedClass: styles.semesterCard,
      isSelected: false
    },
    {
      name: '8th',
      selectedClass: styles.semesterCard,
      isSelected: false
    }
  ]
  var CATEGORIES = [{
    name: 'CHM',
    selectedClass: styles.semesterCard,
    isSelected: false
  },
  {
    name: 'CSE',
    selectedClass: styles.semesterCard,
    isSelected: false
  },
  {
    name: 'CVL',
    selectedClass: styles.semesterCard,
    isSelected: false
  },
  {
    name: 'EET',
    selectedClass: styles.semesterCard,
    isSelected: false
  },
  {
    name: 'HSS',
    selectedClass: styles.semesterCard,
    isSelected: false
  },
  {
    name: 'MEL',
    selectedClass: styles.semesterCard,
    isSelected: false
  }, {
    name: 'MTH',
    selectedClass: styles.semesterCard,
    isSelected: false
  }, {
    name: 'PHY',
    selectedClass: styles.semesterCard,
    isSelected: false
  }]

  const [semesters, setSemester] = useState(SEMESTER)
  const [ claas, setClass ] = useState(CATEGORIES)
  const selectItem = (name, stateVariable, setStateVariable) => {
    var item = stateVariable.find(semester => semester.name === name)
    let index = stateVariable.findIndex(semester => semester.name === name)
    item.isSelected = !item.isSelected
    item.selectedClass = item.isSelected ? styles.semesterCardSelected : styles.semesterCard
    setStateVariable(s => {
      s[index] = item
      return [...s]
    })
  }

  const SemesterCard = ({ sem, style }) => (
    <TouchableOpacity
      activeOpacity={0.6}
      underlayColor='#dddddd' onPress={() => selectItem(sem,semesters, setSemester)}>
      <View style={[styles.semesterCard, style]}>
        <Text style={{ color: '#009C69' }}>{sem}</Text>
      </View>
    </TouchableOpacity>
  )

  const ClassCard = ({ name, style}) => (
    <TouchableOpacity
      activeOpacity={0.6}
      underlayColor='#dddddd' onPress={() => selectItem(name,claas, setClass)}>
      <View style={[styles.semesterCard, style, { width:80 }]}>
        <Text style={{ color: '#009C69' }}>{name}</Text>
      </View>
    </TouchableOpacity>
  )

  const Filter = () => {
    return (
      <Modal
        transparent={true}
        visible={filterVisible}
      >
        <View style={styles.filtersContainer}>
          <View style={{ height: 100}}>
          <Text style={[styles.label, { marginTop: 20 }]}>Semesters (more than 1)</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {
              semesters.map(semester => (
                <SemesterCard sem={semester.name} style={semester.selectedClass} />
              ))
            }
          </ScrollView>
          </View>
          <View style={{ height: 100}}>
          <Text style={[styles.label, { marginTop: 20 }]}>Class (more than 1)</Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {
              claas.map(c => (
                <ClassCard name={c.name} style={c.selectedClass} />
              ))
            }
          </ScrollView>
          </View>
          <View style={styles.bottom}>
          <TouchableOpacity style={[styles.applyButton, { backgroundColor:'white'}]} onPress={() => showFilter(false)}>
            <Text style={[styles.buttonText,{ color:'#009C69'}]}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.applyButton} onPress={() => showFilter(false)}>
            <Text style={styles.buttonText}>Apply</Text>
          </TouchableOpacity>
          </View>
        </View>
        
      </Modal>
    )
  }

  const { data, loading, error } = useQuery(BOOKS_QUERY)
  if (!error)
    return (
      <View style={styles.container}>
        <View style={styles.header}>
                <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                    <Feather name='x' size={24} color='#000' />
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback>
                    <Feather name='bookmark' size={24} color='#000' />
                </TouchableWithoutFeedback>
            </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 40, paddingTop: 20 }}>
          <Text style={{ fontSize: 14 }}>Top Search</Text>
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center' }}
            onPress={() => showFilter(f => !f)}
          >
            <Text>Filter</Text>
            <Feather name='sliders' style={styles.filterIcon} />
            <Filter />
          </TouchableOpacity>
        </View>
        <View style={styles.tagContainer}>
          <TouchableOpacity style={styles.tag}>
            <Text>CSE</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tag}>
            <Text>MTH</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tag}>
            <Text>PHY</Text>
          </TouchableOpacity>
        </View>
        {
          data && data.books && !loading ?
            <FlatList data={data.books} keyExtractor={item => item.name}
              numColumns={3}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <BookThumb navigation={navigation} {...item} data={data.books} />
              )}
            /> :
            <View style={{ height: height, width: width, justifyContent: 'flex-start', alignItems: 'center' }}>
              <Animation
                style={{
                  width: width,
                  height: height / 2
                }}
                source={require('../../../assets/animation/working.json')}
                speed={1}
                autoPlay
                loop
                progress={1}
              />
            </View>
        }
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 10,
    backgroundColor: '#f7fcfa',
    flex: 1
  },
  header: {
    flexDirection: 'row',
    padding: 20,
    position: 'absolute',
    justifyContent: 'space-between',
    width,
    top: 0
},
  tagContainer: {
    flexDirection: 'row'
  },
  tag: {
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginHorizontal: 5,
    marginVertical: 10
  },
  filterIcon: {
    marginLeft: 10,
    fontSize: 18
  },
  filtersContainer: {
    position: 'absolute',
    backgroundColor: '#f7fcfa',
    paddingHorizontal: 20,
    paddingTop: 20,
    height: 400,
    width: width,
    bottom: 0,
  },
  label: {
    color: '#ccc',
    paddingHorizontal: 10,
    marginBottom: 10,
    fontSize: 16
  },
  semesterCard: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'white',
    height: 50,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    borderRadius: 10
  },
  semesterCardSelected: {
    backgroundColor: '#ccebe1'
  },
  bottom:{
    flexDirection:'row',
    justifyContent:'space-between',
    position:'absolute',
    bottom:10,
    width:width,
    paddingHorizontal:20
  },
  buttonText:{
    color:'white',
    fontSize:16
  },
  applyButton:{
    backgroundColor:'#009C69',
    paddingVertical:10,
    paddingHorizontal:15,
    width:100,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:4
  }
})