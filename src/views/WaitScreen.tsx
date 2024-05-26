import { View, Text, Image } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext';

export default function WaitScreen({ navigation }: any) {
  const { perfil, setPerfil } = useContext(AppContext)

  const wait = ms => new Promise(resolve =>
    setTimeout(resolve, ms));

  useEffect(() => {
    wait(50).then(() => {
      if (perfil.email != null) {
        navigation.navigate("Home");
      }
      else {
        navigation.navigate("Login")
      }
    })
  }, [perfil]);
  return (
    <View style={{
      flex: 1,
      backgroundColor: '#000932',
      justifyContent: "center",
      alignItems: "center"
    }}>
      <Image style={{
        height: 250,
        width: 250,
      }} source={require("../../assets/logo.png")} />
    </View>
  )
}