import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { AppContext } from '../context/AppContext';
import { doc, updateDoc } from 'firebase/firestore/lite';
import { dbInstance } from '../../firebase-config';

type ExerciseScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Exercise'>;

export default function ExerciseScreen() {
    const { perfil, setPerfil } = useContext(AppContext)
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation<ExerciseScreenNavigationProp>();
    const [shouldNavigate, setShouldNavigate] = useState(false);
    const equation = "10x+8=2";

    const updateFirestore = async () => {
        await updateDoc(doc(dbInstance, "perfiles", perfil.profileID), {
          clues: perfil.clues-1
        });
        setShouldNavigate(true);
      };
      
      const spendClue = async () => {
        setPerfil(prevPerfil => ({
          ...prevPerfil,
          clues: prevPerfil.clues - 1
        }));
        await updateFirestore();
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
            <Text style={styles.title}>NOMBRE DE LA LECCION</Text>
            <View style={styles.clues}>
                <Text style={styles.getClueText2}>{perfil.clues}</Text>
            <MaterialCommunityIcons name="lightbulb-on" size={30} color='black' />
            </View>
            

            <View style={styles.excersiceContainer}>
                <LinearGradient
                    colors={["#C674F1", "#F22E7A"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{ position: 'absolute', left: 0, right: 0, top: 0, height: '100%', borderRadius: 10 }}
                />
                <Text>*COMPONENTE DEL EJERCICIO*</Text>
                <Text>Exercise</Text>
                <Text>{equation}</Text>
            </View>

            <Text style={styles.stuckedText}>Stuck in an excercise?</Text>
            <View style={{ flex: 1 }}>
                <TouchableOpacity
                    style={styles.getClue}
                    onPress={() => {
                        handlePress()
                        updateFirestore()
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
                <Text>oops, you don't have any clues left</Text>
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
    stuckedText: {
        position: 'absolute',
        bottom: '9%',
        left: '15%',
        right: '15%',
        textAlign: 'left',
        fontSize: 15,
        fontWeight: 'light',
    },
    excersiceContainer: {
        
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        height: 450,
        width: 350,
        backgroundColor: '#F5FCFF',
        borderRadius: 10,
        marginTop: 50,
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
