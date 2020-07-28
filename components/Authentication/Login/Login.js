import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, Image , Modal} from 'react-native'
import { useDispatch } from 'react-redux'
import { TextStyle } from '../../basic/GlobalStyle'
import { Button, InputWithIcon } from '../../basic'
import { useLazyQuery } from '@apollo/react-hooks'
import { LOGIN_USER } from '../../../helpers/query'
import AnimatedLoader  from 'react-native-animated-loader'

import pattern from '../../../assets/Authentication/Onboarding/pattern1.png'
import { login, skip } from '../../../actions'
const { width, height } = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1E152A'
    },
    patternContainer: {
        height: 100,
        overflow: 'hidden',
        backgroundColor: 'white'
    },
    pattern: {
        height: 100,
        width,
        borderBottomLeftRadius: 75
    },
    form: {
        height: height * 0.61,
        backgroundColor: 'white',
        borderTopRightRadius: 75,
        borderBottomLeftRadius: 75,
        borderBottomRightRadius: 75,
    },
    footer: {
        flex: 1,
        backgroundColor: '#1E152A',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    footerItem: {
        height: 50,
        width: 50,
        borderRadius: 25,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10
    },
    logo: {
        width: 25,
        height: 25
    }
})

const Login = () => {
    const [loginUser,{ called, loading, data, error, networkStatus }] = useLazyQuery(LOGIN_USER)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [err, setError] = useState('')
    const dispatch = useDispatch()
    const onPress = () => {
        setError('')
        loginUser({ variables: { username: username, password: password } })
    }
    useEffect(() => {
        if(called && !loading) {
            if(data.user.status === 'success')
                dispatch(login(data.user))
            else
                setError(data.user.message)
            if(error)   
                console.log(error)
        }
    }, [data])

    return (
        <View style={styles.container}>
            <Modal
                transparent={true}
                visible={called && err.length == 0}
            >
            <AnimatedLoader
                visible={true}
                overlayColor="rgba(255,255,255,0.75)"
                source={require('../../../assets/animation/loading.json')}
                animationStyle={styles.lottie}
                speed={1}
            />
            </Modal>
            <View style={styles.patternContainer}>

                <Image style={styles.pattern} source={pattern} />
            </View>


            <View style={styles.form}>
                <View style={{ ...StyleSheet.absoluteFillObject }}>
                    <Image style={[styles.pattern]} source={pattern} />
                </View>


                <View style={[styles.form, { alignItems: 'center', paddingTop: 40 }]}>
                    <Text style={TextStyle.heading}>Welcome back</Text>
                    <Text style={[TextStyle.description, { marginVertical: 10 }]}>Use your credentials below and login to your account</Text>

                    <InputWithIcon variant='username' name='user' handleChange={setUsername} />
                    <InputWithIcon variant='password' name='lock' handleChange={setPassword} />
                    {
                        err.length > 0 ?
                        <Text style={[TextStyle.description]}>{err}</Text>
                        :<></>
                    }
                    <Button text='Login to your account' variant='primary' {...{ onPress }} />
                </View>


            </View>



            <View style={styles.footer}>
                <Text style={{ color: 'white', marginVertical: 10 }}>Connect with us</Text>
                <View style={{ flexDirection: 'row' }}>
                    <View style={styles.footerItem}>
                        <Image style={styles.logo} source={require('../../../assets/Authentication/Onboarding/google.png')} />
                    </View>
                    <View style={styles.footerItem}>
                        <Image style={styles.logo} source={require('../../../assets/Authentication/Onboarding/facebook.png')} />
                    </View>
                    <View style={styles.footerItem}>
                        <Image style={styles.logo} source={require('../../../assets/Authentication/Onboarding/twitter.png')} />
                    </View>
                </View>
            </View>
        </View>
    )
}

export default Login
