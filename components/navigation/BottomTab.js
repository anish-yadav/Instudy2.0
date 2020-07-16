import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'

export default function BottomTab() {
  return (
    <View>
      <Text></Text>
    </View>
  )
}

// export const BottomTabBadge = (icon,focused,color,size) => {
//   return (<View style={styles.container}>

//     {
//       focused ?
//         <View style={{flexDirection:'row'}}>
//           <View style={{backgroundColor:'#EFF1F1'}}>
//           <View style={{ width: 20, height: 70, backgroundColor: '#ccebe1',borderTopRightRadius:30 }}></View>
//           </View>
//           <View style={styles.activeOuterContainer}>
//             <View style={styles.activeTabContainer}>
//               <Feather style={[styles.icon, { color: '#009C69' }]} name={icon}  color={color} size={size} />
//             </View>
//           </View>
//           <View style={{backgroundColor:'#EFF1F1'}}>
//           <View style={{ width: 20, height: 70, backgroundColor: '#ccebe1',borderTopLeftRadius:30 }}></View>
//           </View>
//         </View>

//         : <View><Feather style={[styles.icon]} name={icon} color={color} size={size}  /></View>
//     }
//   </View>)
// }
export const BottomTabBadge = (icon,focused,color,size) => {
  return (<View style={styles.container}>

    {
      focused ?
            <View style={styles.activeTabContainer}>
              <Feather style={[styles.icon, { color: '#009C69' }]} name={icon}  color={color} size={size} />
            </View>

        : <View><Feather style={[styles.icon]} name={icon} color={color} size={size}  /></View>
    }
  </View>)
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    marginBottom: 1,
    fontSize: 24
  },
  activeTabContainer: {
    width: 50,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth:2,
    borderTopColor:'#009C69'
  },
  activeOuterContainer: {
    backgroundColor: '#EFF1F1',
    width: 60,
    height: 60,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  }
})
