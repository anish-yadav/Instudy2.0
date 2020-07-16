import React, { Suspense } from 'react'
import { useSelector } from 'react-redux'
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'

import { useApolloClient } from '@apollo/react-hooks'


import { BookThumbWithDetail } from '../../basic/BooksAndVideoCard'

export default function SearchScreen({ route, navigation }) {

  const searchText = route.params.text.toLowerCase()
  const { books } = useSelector(state => ({
    ...state.resourceReducer
  }))

  
  const result = books.filter(book => book.name.toLowerCase().search(searchText) != -1 || book.subCode.toLowerCase().search(searchText) != -1)
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.searchResultContainer}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginRight: 10, marginBottom: 20 }}>
            <Text style={styles.header}>Books</Text>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={styles.link}>View All</Text>
              <Feather name={'chevron-right'} />
            </TouchableOpacity>
          </View>
          {
            result.length > 0?
              <Suspense fallback={<Text>Loading data...</Text>}>
                <FlatList data={result} keyExtractor={item => item.name}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <BookThumbWithDetail navigation={navigation} name={item.name} author={item.author} thumb={item.thumb} url={item.url} subCode={item.subCode} semesters={item.semesters} />
                  )}
                />
              </Suspense> : 
              <View style={{justifyContent:'center',alignItems:'center'}}>
                <Image source={require('../../../assets/not-found.png')} style={styles.notFoundImage} />
                <Text style={{fontWeight:'600'}}>No Books Found</Text>
              </View>
          }

        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF1F1'
  },
  searchResultContainer: {
    paddingLeft: 20,
    paddingTop: 20,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    height: 340,
    marginBottom: 15,
  },
  link: {
    fontSize: 12,
    color: "#1B0A78"
  },
  header: {
    fontSize: 24
  },
  notFoundImage:{
    width:250,
    height:150
  }
})