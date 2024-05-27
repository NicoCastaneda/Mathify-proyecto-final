import { createContext, useEffect, useState } from "react";
import { Alert } from "react-native"
import { user } from "../interface/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Exercise, Leccion } from "../views/ExerciseScreen";

interface content {
    perfil: user;
    setPerfil: React.Dispatch<React.SetStateAction<user>>
    leccion: Leccion
    setLeccion: React.Dispatch<React.SetStateAction<Leccion>>
    help: Exercise
    setHelp: React.Dispatch<React.SetStateAction<Exercise>>
}

export const AppContext = createContext({} as content);

export const ContextProvider = ({ children }) => {
    const [perfil,setPerfil] = useState({} as user)
    const [leccion, setLeccion] = useState({} as Leccion)
    const [help, setHelp] = useState({} as Exercise)
    const getInfo = async () => {
      try {
        const value = await AsyncStorage.getItem("perfil");
        console.log("Último perfil guardado: ",value);
        var perfil: user = JSON.parse(value)
        if (perfil != null) {
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
    return <AppContext.Provider value={{perfil, setPerfil, leccion: leccion, setLeccion: setLeccion, help, setHelp}}>{children}</AppContext.Provider>;
};
