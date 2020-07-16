import React from 'react'
import { useSelector } from 'react-redux'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import { classRequired } from '../../helpers/attendance'
// const { Swipeable } = GestureHandler

export default function Attendance({ item, navigation }) {
    const { subject, subCode, percentage } = item
    const { attendance } = useSelector(state => ({
        ...state.authReducer
    }))
    const currAttendace = attendance.find(d => d.subCode === subCode)
    const minAttendance = currAttendace.goal || 75
    const reqClass = classRequired(currAttendace.theo,currAttendace.prac,minAttendance)
    var leavesLeft = 0
    if(reqClass < 0)
        leavesLeft = Math.abs(reqClass)
    return (
        <TouchableOpacity style={[styles.container,{backgroundColor:percentage<minAttendance ? '#f7d5d5':'#ccebe1'}]} 
        onPress={() => navigation.navigate('attendance_detail',{
            subCode,
            subject,
            percentage
        })}>
            <View>
                <Text style={[styles.primaryText,{color:percentage<minAttendance? '#d32f2f':'#009C69'}]}>{subject}</Text>
                <Text style={styles.secondaryText}>{subCode}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ alignItems: 'center', paddingHorizontal: 10 }}>
                    <Text style={[styles.number,{color:percentage<minAttendance? '#d32f2f':'#009C69'}]}>{leavesLeft}</Text>
                    <Text style={styles.secondaryText}>Leaves left</Text>
                </View>
                <View style={{ alignItems: 'center', paddingHorizontal: 10 }}>
                    <Text style={[styles.number,{color:percentage<minAttendance? '#d32f2f':'#009C69'}]}>{Math.floor(percentage)}</Text>
                    <Text style={styles.secondaryText}>Percentage</Text>
                </View>
            </View>
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: "#ccebe1",
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginVertical: 5,
        borderRadius: 5,
        justifyContent: 'space-between',
        alignItems:'center',
        overflow: 'hidden'
    },
    primaryText: {
        color: "#009C69",
        fontSize: 18,
        width:140
    },
    secondaryText: {
        color: "#000",
        fontSize:12
    },
    number: {
        fontSize: 24,
        fontWeight: '600',
        color: "#009C69"
    }
})