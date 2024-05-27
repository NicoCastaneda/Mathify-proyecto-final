import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { Route } from '@react-navigation/native';
import { AppContext } from '../context/AppContext';
import { doc, updateDoc } from 'firebase/firestore/lite';
import { dbInstance } from '../../firebase-config';
import { StackNavigationProp } from '@react-navigation/stack';

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
  tipo: string;
  enunciadoGeneral: string;
  problema: string;
  respuesta: string;
  opciones?: string[];
  correcto?: boolean;
};

export default function ExerciseScreen({ route, navigation }: Props) {
  const { perfil, setPerfil } = useContext(AppContext)
  const [modalVisible, setModalVisible] = useState(false);
 // const navigation = useNavigation();

  const [shouldNavigate, setShouldNavigate] = useState(false);
  const equation = "2x+8=2";
  const {leccion} = route.params;

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
      await updateFirestore();
    }
  }

  const handlePress = () => {
    if (perfil.clues > 0) {
      spendClue();
    } else {
      console.log("No clues left");
      setModalVisible(true);
    }
  }

  useEffect(() => {
    if (shouldNavigate) {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Gemini', params: { equation } }],
        });
        setShouldNavigate(false);
    }
}, [shouldNavigate]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#ffffff', '#4B9EFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{ position: 'absolute', left: 0, right: 0, top: 0, height: '20%', borderRadius: 20 }}
      />
      <Text style={styles.title}>{leccion.nombre}</Text>
      <View style={styles.clues}>
        <Text style={styles.getClueText2}>{perfil.clues}</Text>
        <MaterialCommunityIcons name="lightbulb-on" size={30} color='black' />
      </View>

      <View>
        <Text>{equation}</Text>
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
