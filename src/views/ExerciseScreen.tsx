import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Alert, ScrollView } from 'react-native';
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

export type Leccion = {
  nombre: string;
  ejercicios: Exercise[];
};

export type Exercise = {
  tipo_ejercicio: string;
  enunciado_general: string;
  problema: string;
  respuesta: string;
  opciones?: string[];
  correcto?: boolean;
};

export default function ExerciseScreen({ route, navigation }: Props) {
  const { perfil, setPerfil, leccion: leccionGlobal, setHelp } = useContext(AppContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [lives, setLives] = useState(2);
  const [modal2Visible, setModal2Visible] = useState(false);

  const [modalBienVisible, setModalBienVisible] = useState(false);
  const [modalMalVisible, setModalMalVisible] = useState(false);

  const setInfo = async (user: user) => {
    try {
      await AsyncStorage.setItem("perfil", JSON.stringify(user));
      console.log("Guardando...");
    } catch (error) {
      Alert.alert("An error has been encountered");
      console.log(error);
    }
  };

  const updateFirestore = async () => {
    if (perfil.clues > 0) {
      await updateDoc(doc(dbInstance, "perfiles", perfil.profileID), {
        clues: perfil.clues - 1
      });
      setHelp(exercises[currentExerciseIndex])
      navigation.navigate("Gemini")
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

  const handleAnswer = async (isCorrect: boolean) => {
    if (isCorrect) {
      if (currentExerciseIndex < exercises.length - 1) {
        setCurrentExerciseIndex(currentExerciseIndex + 1);
        setModalBienVisible(true);
        setTimeout(() => setModalBienVisible(false), 1000);
      } else {
        showModal("¡Congrats!", "You have completed the Lesson!", true);
        var newAchieve = perfil.achievements
        if (!newAchieve.includes(leccionGlobal.nombre)) {
          newAchieve.push(leccionGlobal.nombre)
          setPerfil({ ...perfil, achievements: newAchieve })
          await updateDoc(doc(dbInstance, "perfiles", perfil.profileID), {
            achievements: newAchieve
          });
          setInfo({ ...perfil, achievements: newAchieve })
        }
      }
    } else {
      if (lives > 1) {
        setLives(lives - 1);
        setModalMalVisible(true);
        setTimeout(() => setModalMalVisible(false), 800);
      } else {
        showModal("¡Epic Fail!", "You lost all your lives", true);
      }
    }
  };

  const showModal = (title: string, message: string, reset: boolean) => {
    Alert.alert(title, message, [
      {
        text: "OK",
        onPress: () => {
          setModal2Visible(false);
          if (reset) {
            resetExerciseState();
          }
          navigation.navigate('Home');
        }
      }
    ]);
    setModal2Visible(true);
  };

  const resetExerciseState = async () => {
    console.log("Reseteo")
    setCurrentExerciseIndex(0);
    setExercises([])
    setLives(2);
    if (leccionGlobal && leccionGlobal.ejercicios) {
      const selectedExercises = leccionGlobal.ejercicios.sort(() => 0.5 - Math.random()).slice(0, 5);
      setExercises(selectedExercises);
    }
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
    console.log("En una leccion")
    resetExerciseState();
    console.log(leccionGlobal)
    if (leccionGlobal && leccionGlobal.ejercicios) {
      const selectedExercises = leccionGlobal.ejercicios.sort(() => 0.5 - Math.random()).slice(0, 5);
      setExercises(selectedExercises);
    }
  }, [leccionGlobal]);

  useEffect(() => {

  }, [route.params]);

  return (
    <ScrollView keyboardShouldPersistTaps='never' contentContainerStyle={styles.container}>
      <LinearGradient
        colors={['#ffffff', '#4B9EFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{ position: 'absolute', left: 0, right: 0, top: 0, height: '20%', borderRadius: 20 }}
      />
      <Text style={styles.title}>{leccionGlobal ? leccionGlobal.nombre : 'Cargando...'}</Text>
      <View style={styles.clues}>
        <View style={{ flex: 1, alignContent: 'flex-start', marginLeft: 20 }}>
          <Text style={styles.getClueText2}>Exercise {currentExerciseIndex + 1}/{exercises.length}</Text>
        </View>

        <Text style={styles.getClueText2}>{lives}</Text>
        <MaterialCommunityIcons name="heart" size={30} color='red' />
        <Text style={styles.getClueText2}>{perfil.clues}</Text>
        <MaterialCommunityIcons name="lightbulb-on" size={30} color='black' />
      </View>
      <View style={styles.clues} />

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

      <Modal visible={modalBienVisible} animationType='slide' transparent={true}>
        <View style={styles.bien}>
          <Text style={styles.modalText}>Correct!</Text>
        </View>
      </Modal>

      <Modal visible={modalMalVisible} animationType='slide' transparent={true}>
        <View style={styles.mal}>
          <Text style={styles.modalText}>Incorrect!  -1❤️</Text>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    backgroundColor: '#fff',
  },
  exerciseContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -100,

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
    color: "white",
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
    marginBottom: 10,
  },
  bien: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: '100%',
    maxHeight: 100,
    width: 200,
    backgroundColor: '#74e386',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
  },
  mal: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: '100%',
    maxHeight: 100,
    width: 200,
    backgroundColor: '#fa7878',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
  },
  modalText: {
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    textAlignVertical: 'center',
  }
});

