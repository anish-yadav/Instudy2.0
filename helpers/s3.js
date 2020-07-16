import React,{ useState, useEffect} from 'react'
import { View, Text } from 'react-native'
import  gql  from 'graphql-tag'
import ApolloClient  from 'apollo-boost'
import { useMutation, useQuery } from '@apollo/react-hooks'

const client = new ApolloClient({
  uri:'https://38142c74ad80.ngrok.io/graphql'
})
// const [addBook, {data,loading}] = useMutation(ADD_BOOK)
export default function s3({file}) {
  
  const GET_URL = gql`
    {
      getSignedUrl(name:"${file.name}"){
        url,
        status
      }
    }
  `

  const {data,loading,error} = useQuery(GET_URL)
  if(!loading)
    console.log(data)
}


export const startCloudUpload = ({file,name,author,semesters,subCode}) => {
  return client.query({
    query:gql`
    {
      getSignedUrl(name:"${file.name}"){
        url,
        status
      }
    }
    `
  })
}

