import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Button } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import { AppContext } from "../context/AppContext";
import { LinearGradient } from "expo-linear-gradient";
import { fetchLecciones } from "../../firebase-config";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Leccion } from "./ExerciseScreen";

type RootStackParamList = {
  Home: undefined;
  Exercise: { leccion: Leccion };
};
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;


export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { perfil, setPerfil, setLeccion: setLeccionGlobal } = useContext(AppContext);
  const [lecciones, setLecciones] = useState<Leccion[]>([]);

  useEffect(() => {
    const loadLecciones = async () => {
      const data = await fetchLecciones();
      const lecciones: Leccion[] = data.map(doc => {
        return {
          nombre: doc.nombre,
          ejercicios: doc.ejercicios
        }
      });
      setLecciones(lecciones);
    };
    loadLecciones();
  }, []);

  useEffect(()=>{
    if (navigation.isFocused()) {
      setLeccionGlobal({} as Leccion)
    }

  },[navigation.isFocused()])

  const handleLeccionPress = (leccion: Leccion) => {
    console.log("Lección seleccionada:", leccion);
    navigation.navigate('Exercise', { leccion: leccion });
  };

  return (
    <View style={styles.container}>

      <LinearGradient
        colors={['#ffffff', '#4B9EFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{ position: 'absolute', left: 0, right: 0, top: 0, height: '30%', borderRadius: 20 }}
      />

      <View style={{ marginTop: 260 }}></View>
      <View style={{ position: "absolute" }}>
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 23, marginTop: 100, marginLeft: 17, width: 400 }}>Hi, {perfil.nombre}!</Text>
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 23, marginTop: 3, marginLeft: 17, width: 250 }}>Start a new challenge or continue one you have already started</Text>
      </View>
      <View style={{ marginHorizontal: "5%" }}>
        <ScrollView style={{ height: "60%" }}>
          
        <View>
          <Text>Lessons</Text>
        {lecciones.map((leccion, index) => (

          <Button
            key={index}
            title={leccion.nombre}
            onPress={() => {
              handleLeccionPress(leccion)
              setLeccionGlobal(leccion)
            }}
          />
        ))}
      </View>



      { /*   <Text style={styles.title}>Continue...</Text>
          <View style={{ flexDirection: "row" }}>
            <View>

              <TouchableOpacity style={styles.activity_placeholder} onPress={(}>
                <LinearGradient
                  colors={['#C674F1', '#F22E7A']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: -1 }}
                  style={{ position: 'absolute', left: 0, right: 0, top: 0, height: '100%', borderRadius: 20 }}
                />
                <Text style={styles.desc_placeholder}>Equations</Text>
                <Text style={styles.desc_placeholder}>57%</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.difficulty_placeholder}>med. 2.9/5</Text>
          </View>{
          <Text style={styles.title}>New Challenges</Text>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.activity_placeholder}>
              <LinearGradient
                colors={['#000932', '#00C2FF']}
                start={{ x: -1.2, y: -0.5 }}
                end={{ x: 1, y: -1 }}
                style={{ position: 'absolute', left: 0, right: 0, top: 0, height: '100%', borderRadius: 20 }}
              />
              <Text style={styles.desc_placeholder}>Complete the</Text>
              <Text style={styles.desc_placeholder}>equation</Text>
            </View>
            <Text style={styles.difficulty_placeholder}>med. 2.2/5</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.activity_placeholder}>
              <LinearGradient
                colors={['#000932', '#00C2FF']}
                start={{ x: -1.2, y: -0.5 }}
                end={{ x: 1, y: -1 }}
                style={{ position: 'absolute', left: 0, right: 0, top: 0, height: '100%', borderRadius: 20 }}
              />
              <Text style={styles.desc_placeholder}>Graphics &</Text>
              <Text style={styles.desc_placeholder}>Functions</Text>
            </View>
            <Text style={styles.difficulty_placeholder}>med. 4/5</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.activity_placeholder}>
              <LinearGradient
                colors={['#000932', '#00C2FF']}
                start={{ x: -1.2, y: -0.5 }}
                end={{ x: 1, y: -1 }}
                style={{ position: 'absolute', left: 0, right: 0, top: 0, height: '100%', borderRadius: 20 }}
              />
              <Text style={styles.desc_placeholder}>Diferential</Text>
              <Text style={styles.desc_placeholder}>Functions</Text>
            </View>
            <Text style={styles.difficulty_placeholder}>med. 4.5/5</Text>
          </View>*/}
        </ScrollView>
        <View style={styles.activity_placeholder} /> 
      </View>
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
  },
  title: {
    fontWeight: "bold",
    fontSize: 21
  },
  activity_placeholder: {
    marginVertical: 10,
    height: 100,
    width: 250,
    alignContent: "center",
    justifyContent: "center"
  },
  difficulty_placeholder: {
    alignSelf: "center",
    marginLeft: 10,
    fontSize: 26,
    width: 65
  },
  desc_placeholder: {
    alignSelf: 'center',
    color: "white",
    fontWeight: "bold",
    fontSize: 27,
  }
});
