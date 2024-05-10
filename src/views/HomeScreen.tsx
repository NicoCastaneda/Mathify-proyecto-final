import { View, Text, Alert, Button } from "react-native";
import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { firebaseConfig } from "../../firebase-config";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

export default function HomeScreen({ navigation }) {
  return (
    <View>
      <Button
        title="Log off"
        onPress={() => {
          GoogleSignin.signOut();
          navigation.navigate("Login")
        }}
      ></Button>
      <Text>HOME</Text>
    </View>
  );
}
