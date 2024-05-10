import { View, Text, Alert, Button, StyleSheet } from "react-native";
import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { firebaseConfig } from "../../firebase-config";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import NavBar from "../components/NavBar";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        title="Log off"
        onPress={() => {
          GoogleSignin.signOut();
          navigation.navigate("Login")
        }}
      ></Button>
      <Text>HOME</Text>


      <View style={styles.navbar}><NavBar/></View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#000',
  },
  navbar: {

    padding: 8

  }
})