import { View, Text, Alert, Button, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { firebaseConfig } from "../../firebase-config";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import NavBar from "../components/NavBar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppContext } from "../context/AppContext";
import { LinearGradient } from "expo-linear-gradient";

export default function HomeScreen({ navigation }) {
  const { perfil, setPerfil } = useContext(AppContext)

  var fotoPerfil
  if (perfil.foto == null) {
    fotoPerfil = "https://fakeimg.pl/400x400/2e82c7/ffffff?text=&font=bebas"
  } else{
    fotoPerfil = perfil.foto
  }


  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#ffffff', '#4B9EFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{ position: 'absolute', left: 0, right: 0, top: 0, height: '30%', borderRadius: 20 }}
      />

      <View style={{ marginTop: 300 }}></View>

      <Image style={{ height: 80, width: 80, borderRadius: 100 }} src={fotoPerfil}></Image>
      <Text>HOME</Text>
      <Text>{perfil.email}</Text>

      <TouchableOpacity onPress={() => navigation.navigate("Map")}>
        <Text>MAP</Text> 
      </TouchableOpacity> 

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text>go to login</Text> 
      </TouchableOpacity> 



      <View style={styles.navbar}><NavBar /></View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {

    flex: 1,
    backgroundColor: 'white',
  },
  navbar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 8
  }
})