import { View, Text, StyleSheet, Image, ViewComponent } from 'react-native'
import React from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import { LinearGradient } from 'expo-linear-gradient'
/*
interface contents {
    letra: string
    color: string
}*/

export default function NavBar() {
  return (
    <LinearGradient
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    colors={["#DFE6FF", "#5FA6FF"]}
    style={styles.mainContainer}
  >
    <View style={styles.viewContainer}>
    
     <MaterialIcons name="leaderboard" size={30} color="#000932"></MaterialIcons>
     
     <Entypo name="graduation-cap" size={30} color="#000932"></Entypo>
     <FontAwesome5 name="user-alt" size={30} color="#000932"></FontAwesome5>
    </View>
    </LinearGradient>
  )
}

const styles= StyleSheet.create({
    mainContainer: {
        borderRadius: 50,
      },
      viewContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 50,
        paddingHorizontal: 35,
        borderRadius: 50,
        
      }
    })