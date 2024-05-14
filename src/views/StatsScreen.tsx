import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import NavBar from '../components/NavBar'

export default function StatsScreen() {
  return (
    <View style={styles.container}> 
      <Text>Stats Screen</Text>

      <View style={styles.navbar}><NavBar/></View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    navbar: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
      padding: 8
    }
  })