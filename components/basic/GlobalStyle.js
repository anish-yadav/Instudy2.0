import { StyleSheet } from "react-native";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export const TextStyle = StyleSheet.create({
    heading: {
        fontSize: 22,
        fontFamily: 'SFProText-Semibold',
        color: '#1E152A',
    },
    description:{
        color: 'rgba(30,21,42,0.7)',
        fontSize: 16,
        paddingHorizontal: 40,
        textAlign: 'center',
        fontFamily: 'SFProText-Regular'
    }
})  