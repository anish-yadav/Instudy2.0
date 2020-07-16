import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import gql from 'graphql-tag'
import { useApolloClient } from '@apollo/react-hooks'
import AnimatedLoader from 'react-native-animated-loader'


import { useFonts, JosefinSans_600SemiBold, Raleway_600SemiBold } from '@expo-google-fonts/dev'

import { login, skip } from '../../actions/index'

export default function LoginScreen() {
    const [fontsLoaded] = useFonts({
        JosefinSans_600SemiBold,
        Raleway_600SemiBold
    })

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [ err, setError ] = useState('') 
    const [ isError, showError ] = useState(false)
    const [visible, setVisible] = useState(false)
    const client = useApolloClient()
    const LOGIN_QUERY = gql`
    query loginUser($username:String!,$password:String!){
        user(username:$username,password:$password){
            name,
            status,
            message,
            semester,
            attendance{
                subject,
                subCode,
                percentage,
                theo,
                prac
            }
        }
    }
    `

    const dispatch = useDispatch()

    const loginUser = () => {
        console.log('trying to login')
        setVisible(true)
        client.query({
            query: LOGIN_QUERY,
            variables: { username, password },
        }).then(({ data }) => {
            setVisible(false)
            console.log(data.user)
            if(data.user.status === 'success')
                dispatch(login(data.user))
            else
                setError(data.user.message)
        }).catch(e => {
            console.log(e)
            dispatch(skip())
        })

    }

    if (!fontsLoaded) {
        return (<Text>Loading...</Text>)
    }
    return (
        <View style={styles.container}>
            <AnimatedLoader
                visible={visible}
                overlayColor="rgba(255,255,255,0.75)"
                source={require('../../assets/loader.json')}
                animationStyle={styles.lottie}
                speed={1}
            />
            <Image style={styles.logo} source={require('../../assets/icon.png')} />
            <Text style={styles.mainText}>Welcome Again</Text>
            <Text style={styles.secondary}>Lets read it togehther</Text>
            <View style={styles.inputs}>
                <TextInput style={styles.input} placeholder={"1841012416"} keyboardType={'numeric'} autoFocus={true} onChangeText={text => setUsername(text)} />
                <TextInput style={styles.input} placeholder={"****"} secureTextEntry={true} onChangeText={text => setPassword(text)} />
                <Text style={[styles.error]}>{err}</Text>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', width: "100%", marginBottom: 70 }}>

                <TouchableOpacity onPress={() => loginUser()}>
                    <View style={styles.loginButton}>
                        <Text style={styles.loginText}>Login</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => dispatch(skip())}>
                    <Text style={{ marginTop: 15 }}>Skip</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingHorizontal: 30
    },
    logo: {
        width: 70,
        height: 50,
        marginBottom: 70
    },
    mainText: {
        color: '#2F4C6E',
        fontSize: 24,
        fontFamily: 'Raleway_600SemiBold'
    },
    secondary: {
        color: '#ccc',
        marginBottom: 70
    },
    inputs: {
        width: "100%"
    },
    input: {
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        paddingHorizontal: 10,
        fontSize: 18,
        marginVertical: 20
    },
    loginButton: {
        backgroundColor: '#2F4C6E',
        paddingHorizontal: 40,
        borderRadius: 4,
        paddingVertical: 10
    },
    loginText: {
        color: 'white',
        fontSize: 18
    },
    lottie: {
        width: 100,
        height: 100
    },
    error:{
        color:'#d32f2f',
        marginBottom:10
    }
})