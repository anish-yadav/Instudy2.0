import React, { Suspense, useEffect, useState, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { View, Text, StyleSheet, TextInput, ImageBackground, FlatList, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import Animation from 'lottie-react-native'

import { addBooks } from '../../actions/index'
import { CategoryCard } from '../basic/Cards'

import { styles } from './style/style'

import { BookThumbWithDetail } from '../basic/BooksAndVideoCard'

const { width, height } = Dimensions.get('screen')
export default function ResourcesScreen({ route, navigation }) {

    let offlineData = [{
        name: 'Becoming',
        author: 'John Doe'
    }, {
        name: 'Milk and Honey',
        author: 'John Doe'
    }, {
        name: 'The Knight',
        author: 'John Doe'
    }, {
        name: 'Dooms Day',
        author: 'John Doe'
    }, {
        name: 'Hero Day',
        author: 'John Doe'
    }, {
        name: 'Heya',
        author: 'John Doe'
    }, {
        name: 'Calculus',
        author: 'John Doe'
    }, {
        name: 'Maths',
        author: 'John Doe'
    }]

    let categories = [{ name: 'CHM' }, { name: 'CSE' }, { name: 'CVL' }, { name: 'EET' }, { name: 'HSS' }, { name: 'MEL' }, { name: 'MTH' }, { name: 'PHY' }]

    const [searchText, setSearchText] = useState('')
    const BOOKS_QUERY = gql`
    {
        books{
          name,
          author,
          thumb,
          url,
          subCode,
          semesters
        }
      }`
    const { data, loading, error } = useQuery(BOOKS_QUERY)
    const dispatch = useDispatch()

    useEffect(() => {
        if (data && data.books)
            dispatch(addBooks(data))
    }, [data])

    if (!error)
        return (
            <View>

                <ScrollView>
                    <View style={styles.container}>
                        <ImageBackground
                            style={styles.bgImage}
                            source={require('../../assets/book.jpg')}>
                            <TouchableOpacity style={{ position:'absolute',left:10, top:10}} onPress={() => navigation.openDrawer()}>
                                <Feather name='menu' size={28} color='white' />
                            </TouchableOpacity>
                            <View
                                style={styles.searchContainer}>

                                <Feather
                                    name={'search'}
                                    size={18}
                                    color={"#BAC5C4"}
                                    style={{ marginRight: 5 }} />

                                <TextInput
                                    style={styles.search}
                                    placeholder={"search by book, author, class"}
                                    returnKeyType={'search'}
                                    onChangeText={text => setSearchText(text)}
                                    onSubmitEditing={() => navigation.navigate('search', { text: searchText })} />
                            </View>
                        </ImageBackground>

                        {/* New Arrivals */}
                        <View style={styles.newArrival}>
                            <View
                                style={[styles.headerContainer, { marginLeft: 10 }]}>

                                <Text style={styles.header}>New Arrivals</Text>

                                <TouchableOpacity
                                    style={styles.viewAllContainer}
                                    onPress={() => navigation.navigate('all_books')}
                                >
                                    <Text style={styles.link}>View All</Text>
                                    <Feather name={'chevron-right'} />
                                </TouchableOpacity>
                            </View>
                            {
                                data && data.books ?
                                    <FlatList data={data.books} keyExtractor={item => item.name}
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                        renderItem={({ item }) => (
                                            <BookThumbWithDetail navigation={navigation} name={item.name} author={item.author} thumb={item.thumb} url={item.url} subCode={item.subCode} semesters={item.semesters} />
                                        )}
                                    /> :
                                    <View style={{ height: 250, width: 250, justifyContent: 'center', alignItems: 'center' }}>
                                        <Animation
                                            style={{
                                                width: 100,
                                                height: 100,
                                            }}
                                            source={require('../../assets/loader.json')}
                                            speed={1}
                                            autoPlay
                                            loop
                                            progress={1}
                                        />
                                    </View>
                            }
                        </View>

                        {/* Categories */}
                        <View style={styles.categories}>
                            <View style={styles.headerContainer}>
                                <Text style={styles.header}>Categories</Text>
                            </View>
                            <FlatList data={categories} keyExtractor={item => item.name}
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                renderItem={({ item }) => (
                                    <CategoryCard name={item.name} navigation={navigation} />
                                )}
                            />
                        </View>
                    </View>
                </ScrollView>

                <TouchableOpacity style={styles.uploadButton} onPress={() => navigation.navigate('upload')}>
                    <Feather name='plus' color='#009C69' size={30} />
                </TouchableOpacity>
            </View>
        )
}
