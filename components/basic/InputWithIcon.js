import React from 'react'
import { View, Text, StyleSheet, TextInput, Dimensions } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'


const{ width } = Dimensions.get('window')
const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        height: 50,
        width: width - 100,
        alignItems: 'center',
        paddingHorizontal: 10,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#ccc',
        marginVertical: 10
    },
    input: {
        fontSize: 16,
        flex: 1
    }
})
const InputWithIcon = ({ name , variant, handleChange }) => {
    return (
        <View style={styles.container}>
            <Feather name={name} size={24} />
            <TextInput style={styles.input} placeholder='1841012416' secureTextEntry={ variant === 'password'? true: false}  onChangeText={t => handleChange(t)}/>
        </View>
    )
}

export default InputWithIcon
