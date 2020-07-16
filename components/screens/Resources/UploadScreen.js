import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, TouchableHighlight, StyleSheet, FlatList, ScrollView } from 'react-native'
import * as DocumentPicker from 'expo-document-picker';
import Feather from 'react-native-vector-icons/Feather'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

import s3, { startCloudUpload } from '../../../helpers/s3'

import axios from 'axios'

const SelectFileComponent = () => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
      <Feather name='upload-cloud' size={24} style={{ marginRight: 20 }} />
      <Text style={styles.input}>Select the file</Text>
    </View>
  )
}

const FileSelectedComponent = ({ name, cancelFile }) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
      <Text>{name}</Text>
      <Feather name={'x'} onPress={() => cancelFile()} />
    </View>
  )

}




export default function UploadScreen() {

  const SEMESTER = [
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
  const [semesters, setSemester] = useState(SEMESTER)
  const [name, setName] = useState('')
  const [author, setAuthor] = useState('')
  const [subCode, setCode] = useState('')
  const [uploadText, setUploadText] = useState('Upload')
  const [file, selectFile] = useState({})

  const ADD_BOOK = gql`
  mutation AddBook($name:String,$url:String,$author:String,$semesters:[String],$subCode:String){
    addBook(name:$name,url:$url,author:$author,semesters:$semesters,subCode:$subCode){
      url,
      name,
      author
    }
  }
  `
  const [addBook, { data, loading }] = useMutation(ADD_BOOK)
  const [h, setH] = useState(0)
  let t = 0

  const uploadAnimation = () => {
    let x = setInterval(() => {
      if (t < 50) {
        t = t + 1
        setH(a => a + 1)
      }
      else {
        setUploadText('Uploaded')
        clearInterval(x)
      }
    }, 50)
  }

  const uploadingStyle = () => {
    return {
      backgroundColor: '#1B0A78',
      width: 50,
      justifyContent: 'center',
      alignItems: 'center',
      height: h
    }
  }

  const selectItem = (sem) => {
    var item = semesters.find(semester => semester.name === sem)
    let index = semesters.findIndex(semester => semester.name === sem)
    item.isSelected = !item.isSelected
    item.selectedClass = item.isSelected ? styles.semesterCardSelected : styles.semesterCard
    setSemester(s => {
      s[index] = item
      return [...s]
    })
  }

  const documentPicker = () => {
    console.log('startinng to upload')
    DocumentPicker.getDocumentAsync({ type: 'application/pdf', copyToCacheDirectory: false }).then(({ type, uri, name, size }) => {
      if (type == 'success') {
        selectFile({ uri, name, size })
      }
    })
  }

  const cancelFile = () => {
    selectFile({})
  }

  const startUpload = async () => {
    setUploadText('Uploading')
    uploadAnimation()
    let { data } = await axios.post('https://38142c74ad80.ngrok.io/presigned', {
      name: file.name
    })
    var url = data.url

    if (url) {
      console.log(url)
      console.log(file)
      var options = { headers: { 'Content-Type': 'application/pdf', 'x-amz-acl': 'public-read' } }
      axios.put(url, file, options).then(data => {
        console.log(data)
      }).catch(e => {
        console.log('error occured')
        console.log(e)
      })
    }

  }




  const SemesterCard = ({ sem, style }) => (
    <TouchableOpacity
      activeOpacity={0.6}
      underlayColor='#dddddd' onPress={() => selectItem(sem)}>
      <View style={[styles.semesterCard, style]}>
        <Text>{sem}</Text>
      </View>
    </TouchableOpacity>
  )


  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.container}>
        <Text style={styles.label}>Book Name</Text>
        <TextInput style={styles.input} placeholder='Introduction to computer programming' onChangeText={text => setName(text)} />

        <Text style={[styles.label, { marginTop: 20 }]}>Author Name</Text>
        <TextInput style={styles.input} placeholder='John Doe' onChangeText={text => setAuthor(text)} />

        <Text style={[styles.label, { marginTop: 20 }]}>Semesters (more than 1)</Text>
        <FlatList
          data={semesters}
          horizontal={true}
          keyExtractor={item => item.name}
          showsHorizontalScrollIndicator={false}
          extraData={semesters}
          renderItem={({ item }) => (
            <SemesterCard sem={item.name} style={item.selectedClass} />
          )} />

        <Text style={[styles.label, { marginTop: 20 }]}>File </Text>
        <TouchableOpacity style={[styles.input, styles.upload]} onPress={() => documentPicker()}>
          {
            file.name ?
              <FileSelectedComponent name={file.name} cancelFile={cancelFile} />
              :
              <SelectFileComponent />
          }
        </TouchableOpacity>
        <Text style={[styles.label, { marginTop: 20 }]}>Subject Code</Text>
        <TextInput style={styles.input} placeholder='CSW-121' onChangeText={text => setCode(text)} />
        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={() => startUpload()}>
          <View style={styles.login}>
            <Text style={{ color: 'white', fontSize: 16 }}>{uploadText}</Text>
            <View style={[styles.uploadConatiner, { justifyContent: uploadText === 'Upload' ? 'center' : 'flex-end' }]}>

              {
                uploadText === 'Uploading' || uploadText === 'Uploaded' ?
                  <View style={uploadingStyle()}>
                    {
                      uploadText === 'Uploaded' ?
                        <Feather name='check' color='white' size={18} />
                        : <></>
                    }
                  </View>
                  : <Feather name='arrow-up' size={18} color='white' />
              }
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#fff'
  },
  input: {
    backgroundColor: '#fafafa',
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontSize: 16,
    borderRadius: 10
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
    backgroundColor: '#fafafa',
    height: 50,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    borderRadius: 10
  },
  semesterCardSelected: {
    backgroundColor: '#c8bde9'
  },
  upload: {
    paddingVertical: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 40
  },
  login: {
    backgroundColor: '#c8bde9',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 30,
    marginTop: 20,
    width: 170,
    justifyContent: 'space-between',
    borderRadius: 30
  },
  uploadConatiner: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: 50,
    height: 50,
    marginLeft: 10,
    borderRadius: 30,
    backgroundColor: '#b4aad1',
    overflow: 'hidden'
  }
})

