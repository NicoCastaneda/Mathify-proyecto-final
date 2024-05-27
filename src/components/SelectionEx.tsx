import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'

export default function SelectionEx({ enunciado, problema, opciones, respuesta, onAnswer }) {
    const [selectedButton, setSelectedButton] = useState<number | null>(null);

    return (
        <View style={styles.excersiceContainer}>
            <Text style={styles.enunciadoGeneral}>ENUNCIADO GENERAL</Text>
            <LinearGradient
                colors={["#C674F1", "#000932"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ padding: 15, alignItems: 'center', borderRadius: 10 }}
            >
                <Text style={styles.problema}>PROBLEM</Text>
            </LinearGradient>

            <View style={styles.inputContainer}>
                <TouchableOpacity
                    style={[styles.rectangleButton, selectedButton === 1 ? styles.selectedButton : {}]}
                    onPress={() => setSelectedButton(1)}
                >
                    <Text style={selectedButton === 1 ? styles.selectedButtonText : {}}>Option 1</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.rectangleButton, selectedButton === 2 ? styles.selectedButton : {}]}
                    onPress={() => setSelectedButton(2)}
                >
                    <Text style={selectedButton === 2 ? styles.selectedButtonText : {}}>Option 2</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
                <TouchableOpacity
                    style={[styles.rectangleButton, selectedButton === 3 ? styles.selectedButton : {}]}
                    onPress={() => setSelectedButton(3)}
                >
                    <Text style={selectedButton === 3 ? styles.selectedButtonText : {}}>Option 3</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.rectangleButton, selectedButton === 4 ? styles.selectedButton : {}]}
                    onPress={() => setSelectedButton(4)}
                >
                    <Text style={selectedButton === 4 ? styles.selectedButtonText : {}}>Option 4</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.check}>
                <LinearGradient
                    colors={["#C674F1", "#000932"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{ padding: 15, alignItems: 'center', borderRadius: 10 }}
                >
                    <Text style={styles.checkText}>Check</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    excersiceContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        height: 450,
        width: 300,
        backgroundColor: '#fff',
        marginTop: 50,
    },
    enunciadoGeneral: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        alignSelf: 'flex-start',
        padding: 10,
    },
    problema: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        padding: 15,
        width: 300,
        maxWidth: '100%',
        textAlign: 'center',
    },

    check: {
        height: 50,
        marginTop: 50,
    },
    checkText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        width: 300,
        maxWidth: '100%',
        textAlign: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    rectangleButton: {
        flex: 1,
        backgroundColor: '#DAA3F8',
        padding: 10,
        borderRadius: 5,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedButton: {
        backgroundColor: '#4C327B',
    },
    selectedButtonText: {
        color: '#fff',
    },
})