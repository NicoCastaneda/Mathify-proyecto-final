import { View, Text, TouchableOpacity, AppState, Alert } from "react-native";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useContext, useRef } from "react";
import { AppContext } from '../context/AppContext';
import { handleIntegrationMP } from '../utils/mp';
import { WebBrowserResultType, openBrowserAsync } from "expo-web-browser";
import { doc, updateDoc } from 'firebase/firestore/lite';
import { dbInstance } from '../../firebase-config';
import { user } from '../interface/user'
import AsyncStorage from '@react-native-async-storage/async-storage';

interface contents {
  quantity: number;
  price: number;
  isRecommended: boolean;
}


export default function buyClues({ quantity, price, isRecommended}: contents) {
    const {perfil, setPerfil} = useContext(AppContext)
  const appState = useRef(AppState.currentState);

  const wait = ms => new Promise(resolve =>
    setTimeout(resolve, ms));

  const buyClues = async (quantity: number, price: number) => {
    const data: Array<string> = await handleIntegrationMP(quantity, price);
    if (!data) {
      return console.log("Algo ha pasao'");
    } else {
      const comprar = await openBrowserAsync(data[0])
      console.log(comprar)
      wait(300).then(async () => {
        if (comprar.type == "opened") {
            if (appState.current === "active") {
              await updateDoc(doc(dbInstance, "perfiles", perfil.profileID), {
                clues: perfil.clues + quantity,
              });
              const user = {...perfil, clues: perfil.clues+quantity} as user
              setPerfil(prevPerfil => ({
                ...prevPerfil,
                clues: prevPerfil.clues + quantity
              }));
              try {
                await AsyncStorage.setItem("perfil", JSON.stringify(user))
                console.log("Guardando...")
              } catch (error) {
                Alert.alert("Ha habido un error")
                console.log(error)
              }
            }
        }
      })
    }
  };


  var recomend;
  var recoText;
  if (isRecommended) {
    recomend = (
      <LinearGradient
        colors={["#C674F1", "#F22E7A"]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          height: "100%",
          borderRadius: 10,
        }}
      />
    );
    recoText = "recomended";
  } else {
    recomend = <View />;
    recoText = "";
  }
  return (
    <TouchableOpacity style={{ height: 60, width: isRecommended ? 140 : 80,
        marginVertical: 3}} onPress={() => buyClues(quantity,price)}>
      {recomend}
      <View
        style={{
          flexDirection: "row",
          width: 60,
          marginHorizontal: 20,
          marginTop: 5
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 23, color: isRecommended ? "white" : "black", marginRight: 3}}>{quantity}</Text>
        <MaterialCommunityIcons name="lightbulb-on" size={22} color={isRecommended ? "white" : "black"} />

        <Text style={{color: "white", fontSize: 10, marginLeft: 5}}>{recoText}</Text>
      </View>
      <Text style={{ fontSize: 18, color: isRecommended ? "white" : "black", marginLeft: 18}}>${price}</Text>
    </TouchableOpacity>
  );
}
