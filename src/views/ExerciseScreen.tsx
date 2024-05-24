import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { AppContext } from '../context/AppContext';

type ExerciseScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Exercise'>;

export default function ExerciseScreen() {
    const { perfil, setPerfil } = useContext(AppContext)
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation<ExerciseScreenNavigationProp>();
    const equation = "10x+8=2";

    const spendClue = () => {
        setPerfil(prevPerfil => ({
            ...prevPerfil,
            clues: prevPerfil.clues - 1
        }));
    }

    const handlePress = () => {
        if (perfil.clues >= 0) {
            navigation.navigate("Gemini", { equation });
            spendClue();
            console.log("Clues: ", perfil.clues);
        } else {
            console.log("No clues left");
            setModalVisible(true);
        }
    }

    return (
        <View style={styles.container}>
            <Text>ExerciseScreen</Text>
            <Text>Equation</Text>
            <Text>{equation}</Text>
            <Text>Clues: {perfil.clues}</Text>
            <View style={{ flex: 1 }}>
                <TouchableOpacity
                    style={styles.getClue}
                    onPress={() => handlePress()}
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
        animationType= "fade"
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
    }
});
