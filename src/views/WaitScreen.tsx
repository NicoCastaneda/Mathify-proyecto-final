import { View, Text } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { AppContext } from '../context/AppContext';

export default function WaitScreen({navigation}: any) {
    const { perfil, setPerfil } = useContext(AppContext)

    const wait = ms => new Promise(resolve =>
        setTimeout(resolve, ms));

    useEffect(() => {
        wait(50).then(()=> {
            if (perfil.email != null) {
              navigation.navigate("Home");
            }
            else {
              navigation.navigate("Login")
            }
        })
      },[perfil]);
  return (
    <View />
  )
}