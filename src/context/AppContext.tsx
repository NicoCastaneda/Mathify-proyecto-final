import { createContext, useEffect, useState } from "react";
import { Alert } from "react-native"
import { user } from "../interface/user";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface content {
    perfil: user;
    setPerfil: React.Dispatch<React.SetStateAction<user>>
}

export const AppContext = createContext({} as content);

export const ContextProvider = ({ children }) => {
    const [perfil,setPerfil] = useState({} as user)
    const getInfo = async () => {
      try {
        const value = await AsyncStorage.getItem("perfil");
        console.log(value);
        if (value !== null) {
          console.log("Setting user...")
          setPerfil(JSON.parse(value));
        }
      } catch (error) {
        Alert.alert("Ha habido un error")
        console.log(error)
      }
    };
    useEffect(() => { 
      getInfo();
    },[])
    return <AppContext.Provider value={{perfil, setPerfil}}>{children}</AppContext.Provider>;
};
