import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Alert } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { AppContext } from '../context/AppContext';
import { doc, updateDoc } from 'firebase/firestore/lite';
import { dbInstance } from '../../firebase-config';
import { StackNavigationProp } from '@react-navigation/stack';
import { user } from '../interface/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TypingEx from '../components/TypingEx';
import SelectionEx from '../components/SelectionEx';
import ToFEx from '../components/ToFEx';

type ExerciseScreenRouteProp = RouteProp<RootStackParamList, 'Exercise'>;

type ExerciseScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Exercise'>;

type Props = {
  route: ExerciseScreenRouteProp;
  navigation: ExerciseScreenNavigationProp;
};

type RootStackParamList = {
  Home: undefined;
  Exercise: { leccion: Leccion };
  Gemini: { equation: string };
};

type Leccion = {
  nombre: string;
  ejercicios: Exercise[];
};

type Exercise = {
  tipo_ejercicio: string;
  enunciado_general: string;
  problema: string;
  respuesta: string;
  opciones?: string[];
  correcto?: boolean;
};

export default function ExerciseScreen({ route, navigation }: Props) {
  const { perfil, setPerfil } = useContext(AppContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const equation = "2x+8=2";
  const { leccion } = route.params;
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [lives, setLives] = useState(2);
  const [modal2Visible, setModal2Visible] = useState(false);

  const setInfo = async (user: user) => {
    try {
      await AsyncStorage.setItem("perfil", JSON.stringify(user));
      console.log("Guardando...");
    } catch (error) {
      Alert.alert("Ha habido un error");
      console.log(error);
    }
  };

  const updateFirestore = async () => {
    if (perfil.clues > 0) {
      await updateDoc(doc(dbInstance, "perfiles", perfil.profileID), {
        clues: perfil.clues - 1
      });
      setShouldNavigate(true);
    }
  };

  const spendClue = async () => {
    if (perfil.clues > 0) {
      setPerfil(prevPerfil => ({
        ...prevPerfil,
        clues: prevPerfil.clues - 1
      }));
      var user = { ...perfil, clues: perfil.clues - 1 } as user;
      setInfo(user);
      await updateFirestore();
    }
  };

  const handlePress = () => {
    if (perfil.clues > 0) {
      spendClue();
    } else {
      console.log("No clues left");
      setModalVisible(true);
    }
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      if (currentExerciseIndex < exercises.length - 1) {
        setCurrentExerciseIndex(currentExerciseIndex + 1);
      } else {
        showModal("¡Felicidades!", "Has completado la lección exitosamente.");
      }
    } else {
      if (lives > 1) {
        setLives(lives - 1);
      } else {
        showModal("¡Derrota!", "Has perdido todas tus vidas.");
      }
    }
  };

  const showModal = (title: string, message: string) => {
    Alert.alert(title, message, [
      {
        text: "OK",
        onPress: () => {
          setModal2Visible(false);
          navigation.navigate('Home');
        }
      }
    ]);
    setModal2Visible(true);
  };

  const renderExercise = () => {
    if (exercises.length === 0 || currentExerciseIndex >= exercises.length) {
      return null;
    }
    const exercise = exercises[currentExerciseIndex];
    switch (exercise.tipo_ejercicio) {
      case 'respuesta_abierta':
        return <TypingEx enunciado={exercise.enunciado_general} problema={exercise.problema} respuesta={exercise.respuesta} onAnswer={handleAnswer} />;
      case 'seleccion_multiple':
        return <SelectionEx enunciado={exercise.enunciado_general} problema={exercise.problema} opciones={exercise.opciones} respuesta={exercise.respuesta} onAnswer={handleAnswer} />;
      case 'verdadero_falso':
        return <ToFEx enunciado={exercise.enunciado_general} problema={exercise.problema} respuesta={exercise.respuesta} onAnswer={handleAnswer} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (leccion && leccion.ejercicios) {
      const selectedExercises = leccion.ejercicios.sort(() => 0.5 - Math.random()).slice(0, 5);
      setExercises(selectedExercises);
    }
  }, [leccion]);

  useEffect(() => {
    if (shouldNavigate) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Gemini', params: { equation } }],
      });
      setShouldNavigate(false);
    }
  }, [shouldNavigate, navigation]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#ffffff', '#4B9EFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{ position: 'absolute', left: 0, right: 0, top: 0, height: '20%', borderRadius: 20 }}
      />
      <Text style={styles.title}>{leccion ? leccion.nombre : 'Cargando...'}</Text>
      <View style={styles.clues}>
        <Text style={styles.getClueText2}>{perfil.clues}</Text>
        <MaterialCommunityIcons name="lightbulb-on" size={30} color='black' />
      </View>
      <View style={styles.clues}>
        <Text style={styles.getClueText2}>Vidas: {lives}</Text>
        <MaterialCommunityIcons name="heart" size={30} color='red' />
      </View>

      <View style={styles.exerciseContainer}>
        {renderExercise()}
      </View>

      <View style={{ flex: 1 }}>
        <TouchableOpacity
          style={styles.getClue}
          onPress={() => {
            handlePress();
            updateFirestore();
          }}
        >
          <LinearGradient
            colors={["#1F2B65", "#00C2FF"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: -1 }}
            style={{ position: 'absolute', left: 0, right: 0, top: 0, height: '100%', borderRadius: 10 }}
          />
          <Text style={styles.getClueText}>View Solution</Text>
          <View style={{ flexDirection: 'row', gap: 2 }}>
            <Text style={styles.getClueText}>1</Text>
            <MaterialCommunityIcons name="lightbulb-on" size={30} color='white' />
          </View>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <Text>Oops, you don't have any clues left</Text>
        <TouchableOpacity onPress={() => setModalVisible(false)}>
          <Text>Close</Text>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    backgroundColor: '#fff',
  },
  exerciseContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  getClue: {
    flexDirection: 'row',
    gap: 20,
    position: 'absolute',
    bottom: 20,
    left: '15%',
    right: '15%',
    height: 50,
    maxWidth: 300,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 1,
    elevation: 8,
  },
  getClueText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    textAlignVertical: 'center',
  },
  getClueText2: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
    textAlignVertical: 'center',
  },
  title: {
    marginLeft: 20,
    marginTop: 20,
    textAlign: 'left',
    fontSize: 25,
    fontWeight: 'bold',
  },
  clues: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    alignSelf: 'flex-end',
    marginRight: 20,
    marginTop: 30,
  }
});
