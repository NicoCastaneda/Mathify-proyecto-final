import { View, Text ,StyleSheet, AppState, Alert } from 'react-native'
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import BuyClues from '../components/buyClues'
import React, { useContext, useRef } from 'react'
import NavBar from '../components/NavBar';
import { getAuth, updateEmail, updatePassword } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from '../context/AppContext';
import { user } from '../interface/user';
import { doc, updateDoc } from 'firebase/firestore/lite';
import { dbInstance } from '../../firebase-config';

export default function SettingsScreen({navigation}: any) {
  const { perfil, setPerfil } = useContext(AppContext)
  const updateUserEmail = async (newEmail: string) => {
    try {
      const auth = getAuth();
      updateEmail(auth.currentUser, newEmail).then(() => {
      }).catch((error) => {
        console.log("Hubo un error con el getAuth: ",error)
      });
      await updateDoc(doc(dbInstance, "perfiles", perfil.profileID), {
        email: newEmail
      });
      var user = {...perfil, email: newEmail} as user
      setPerfil(user)
      await AsyncStorage.setItem("perfil", JSON.stringify(user));
      console.log("Email actualizado")
      Alert.alert("Success!","Your Email has been updated!")
      navigation.navigate("Settings")
      
    } catch (error) {
      console.log("Hubo un error general: ",error)
      Alert.alert("Oh, no!","We couldn't update your Email :(")
    }
  }

  const updateUserPassword = async (newPassword: string) => {
      const auth = getAuth();
      updatePassword(auth.currentUser, newPassword).then(() => {
        Alert.alert("Success!","Your Password has been updated!")
      }).catch((error) => {
        console.log("Hubo un error con el getAuth: ",error)
        Alert.alert("Oh, no!","We couldn't update your Password :( (If you logged in with a Google account, you can't change your password)")
      });
  }

  const updateUserName = async (newUsername: string) => {
    try {
      var user = {...perfil, nombre: newUsername} as user
      setPerfil(user)
      await AsyncStorage.setItem("perfil", JSON.stringify(user));
      console.log("Email actualizado")
      Alert.alert("Success!","Your Username has been updated!")
    } catch (error) {
      console.log("Hubo un error general: ",error)
      Alert.alert("Oh, no!","We couldn't update your Username :(")
    }
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#ffffff', '#0075FF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1.3 }}
        style={{ position: 'absolute', left: 0, right: 0, top: 0, height: '100%', borderRadius: 20 }}
      />
      <View style={{height: 65}}></View>
      <Text style={styles.breaks}>_______________________</Text>
      <Text style={{...styles.options, marginTop:15, marginBottom:10}}>Change Password</Text>
      <Text style={styles.options}>Change Username</Text>
      <Text style={{...styles.options, marginTop:10, marginBottom:0}}>Change Email</Text>
      <Text style={styles.breaks}>_______________________</Text>
      <View style={{height: 20}}></View>
      <View style={{height: 250, width: '70%'}}>
        <LinearGradient
          colors={['#ffffff', '#99E7FF']}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{position: "absolute", left: 0, right: 0, top: 0, height: '100%', borderRadius: 10 }}
        />
        <View style={{flexDirection: "row", padding: 10, rowGap: 5}}>
          <Text style={{fontSize: 20, marginRight: 8, marginLeft: 5}}>Buy Clues</Text>
          <MaterialCommunityIcons
              name="lightbulb-on"
              size={22}
              color="black"
            />
        </View>
        <View style={{flexDirection: "row"}}>
          <BuyClues quantity={5} price={0.52} isRecommended={false}/>
          <BuyClues quantity={15} price={1.48} isRecommended={false}/>
        </View>
        <View style={{flexDirection: "row"}}>
          <BuyClues quantity={30} price={2.54} isRecommended={false}/>
          <BuyClues quantity={100} price={6.99} isRecommended={true}/>
        </View>
        <View style={{flexDirection: "row"}}>
          <BuyClues quantity={500} price={36.14} isRecommended={false}/>
          <BuyClues quantity={1000} price={65.99} isRecommended={false}/>
        </View>
      </View>
      <View style={styles.navbar}><NavBar /></View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  breaks: {
    fontSize: 30
  },
  options: {
    fontSize: 20,
    marginVertical: 10,
    width: 230,
  },
  navbar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 8
  },
  buyClues: {
    borderRadius: 5,
    
  },
})