import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Button, Image } from "react-native";
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

  useEffect(() => {
    if (navigation.isFocused()) {
      setLeccionGlobal({} as Leccion)
    }

  }, [navigation.isFocused()])

  const handleLeccionPress = (leccion: Leccion) => {
    console.log("Lección seleccionada:", leccion);
    navigation.navigate('Exercise', { leccion: leccion });
  };

  const lessonImages = {
    'Arithmetic': require('../../assets/Arithmetic.png'),
    'Equations': require('../../assets/Equations.png'),
    'Fractions': require('../../assets/Fractions.png'),
    'Logical Thinking': require('../../assets/Logical Thinking.png'),
    'Percentages': require('../../assets/Percentages.png'),
  };

  return (
    <View style={styles.container}>

      <LinearGradient
        colors={['#ffffff', '#4B9EFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{ position: 'absolute', left: 0, right: 0, top: 0, height: '30%', borderRadius: 20 }}
      />

      <View style={{ marginTop: 275 }}></View>
      <View style={{ position: "absolute" }}>
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 23, marginTop: 100, marginLeft: 17, width: 400 }}>Hi, {perfil.nombre}!</Text>
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 23, marginTop: 3, marginLeft: 17, width: 250 }}>Start a new challenge or continue one you have already started</Text>
      </View>
      <View style={{ marginHorizontal: "5%" }}>
        <ScrollView style={{ height: "57%" }}>

          <ScrollView style={{ height: "60%" }}>
            <View>
              <Text style={{...styles.title, marginTop: 0}}>Available Lessons</Text>
              {lecciones.map((leccion, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.card}
                  onPress={() => {
                    handleLeccionPress(leccion);
                    setLeccionGlobal(leccion);
                  }}
                >
                  <Image source={lessonImages[leccion.nombre]} style={styles.cardImage} />
                  <View style={styles.textContainer}>
                    <Text style={styles.cardText}>{leccion.nombre}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

        </ScrollView>
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
    fontSize: 21,
    margin: 15,
  },

  card: {
    flexDirection: 'row',
    backgroundColor: '#000932',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 10,
    padding: 10,
  },
  cardImage: {
    width: 70,
    height: 70,
    marginRight: 10,
    borderRadius: 10,
  },
  textContainer: {
    justifyContent: 'center',
    marginHorizontal: 40,
  },
  cardText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});