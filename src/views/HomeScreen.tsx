import { View, Text, Alert, Button, Image, StyleSheet } from "react-native";
import React, { useContext, useState } from "react";
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { firebaseConfig } from "../../firebase-config";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import NavBar from "../components/NavBar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AppContext } from "../context/AppContext";
import { user } from "../interface/user";

export default function HomeScreen({ navigation }) {
  const {perfil, setPerfil} = useContext(AppContext)
  const deleteInfo = async () => {
    try {
      await AsyncStorage.removeItem("perfil")
      console.log("Eliminando...")
    } catch (error) {
      Alert.alert("Ha habido un error")
      console.log(error)
    }
  }
  return (
    <View style={styles.container}>
      <Button
        title="Log out"
        onPress={() => {
          GoogleSignin.signOut();
          navigation.navigate("Login")
          AsyncStorage.removeItem("perfil")
          deleteInfo()
        }
      }
      ></Button>
      <Image style={{height: 80, width: 80, borderRadius: 100}} src={perfil.foto}></Image>
      <Text>HOME</Text>
      <Text>{perfil.email}</Text>



      <View style={styles.navbar}><NavBar/></View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,

  },
  navbar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 8
  }
})