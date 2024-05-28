import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useContext, useState } from 'react';
import { Image, Text, View, StyleSheet, Modal, Touchable, TouchableOpacity, Alert } from 'react-native';
import { AppContext } from '../context/AppContext';
import { user } from '../interface/user'; 
import { useNavigation } from '@react-navigation/native';

interface contents {
  close: () => void;
}

const Menu = ({ close }: contents) => {
  const { setPerfil } = useContext(AppContext)
  const navigation = useNavigation();

  const deleteInfo = async () => {
    try {
      await AsyncStorage.removeItem("perfil")
      console.log("Eliminando...")
      setPerfil({} as user)
    } catch (error) {
      Alert.alert("An error has been encountered")
      console.log(error)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.menu}>
        <Image source={require('../../assets/splash.png')} style={styles.logo} />
        <View style={styles.navigation}>
          <Text>_________________</Text>
          {/* @ts-ignore */}
          <TouchableOpacity onPress={() => { navigation.navigate("Settings"); close() }}>
            <Text style={styles.navItem}>Settings</Text>
          </TouchableOpacity>

          {/* @ts-ignore */}
          <TouchableOpacity onPress={() => { navigation.navigate("Map"); close() }}>
            <Text style={styles.navItem}>Map</Text>
          </TouchableOpacity>

          {/* @ts-ignore */}
          <TouchableOpacity onPress={() => { navigation.navigate("About"); close() }}>
            <Text style={styles.navItem}>About</Text>
          </TouchableOpacity>
          <Text>_________________</Text>

          <TouchableOpacity onPress={() => {
            {/* @ts-ignore */}
            navigation.navigate("Login")
            GoogleSignin.signOut();
            AsyncStorage.removeItem("perfil")
            deleteInfo()
            close()
          }
          }>
            <Text style={styles.navItem}>Log Out</Text>
          </TouchableOpacity>
        </View>
        <Text onPress={close} style={styles.closeButton}>✖</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    marginTop: 15,
    flexDirection: 'row',
    alignSelf: 'flex-end',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    elevation: 8,
  },
  menu: {
    backgroundColor: '#fff',
    padding: 30,
    width: '45%',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },

  navigation: {
    flexDirection: 'column',
  },
  navItem: {
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 18,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    fontSize: 20,
  },
});

export default Menu;
