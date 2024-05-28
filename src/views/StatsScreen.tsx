import { View, Text, Image,StyleSheet } from 'react-native'
import React from 'react'
import NavBar from '../components/NavBar'

export default function StatsScreen() {
  return (
    <View style={styles.container}> 
<Text style={styles.text}>We're stil working on that...</Text>
    <Image style={styles.comingsoon} source={require("../../assets/comingsoon.png")} />      
    <View style={styles.navbar}><NavBar/></View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000932'
    },
    navbar: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
      padding: 8
    },
    comingsoon: {
        width: 350,
        height: 100,
        marginTop: 150,
        alignSelf: 'center',
    },
    text:{
        color: 'white',
        fontSize: 25,
        alignSelf: 'center',
        marginTop: 300,
        fontWeight: 'bold',
        marginBottom: -50
    }
  })