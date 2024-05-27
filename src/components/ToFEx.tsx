import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'

export default function SelectionEx({ enunciado, problema, respuesta, onAnswer }) {
    const [selectedButton, setSelectedButton] = useState<number | null>(null);

    return (
        <View style={styles.excersiceContainer}>
            <Text style={styles.enunciadoGeneral}>ENUNCIADO GENERAL</Text>
            <LinearGradient
                colors={["#d9e7ff", "#84a7e3"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ padding: 15, alignItems: 'center', borderRadius: 10 }}
            >
                <Text style={styles.problema}>PROBLEM</Text>
            </LinearGradient>

            <View style={styles.inputContainer}>
                <TouchableOpacity
                    style={[styles.rectangleButton, selectedButton === 1 ? styles.selectedButtonT : {}]}
                    onPress={() => setSelectedButton(1)}
                >
                    <Text style={selectedButton === 1 ? styles.selectedButtonText : {}}>TRUE</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.rectangleButton, selectedButton === 2 ? styles.selectedButtonF : {}]}
                    onPress={() => setSelectedButton(2)}
                >
                    <Text style={selectedButton === 2 ? styles.selectedButtonText : {}}>FALSE</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.check}>
                <LinearGradient
                colors={["#d9e7ff", "#84a7e3"]}
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
        color: '#000',
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
        color: 'black',
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
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        borderColor: '#000',
        borderWidth: 1,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedButtonT: {
        backgroundColor: '#024005',
    },
    selectedButtonF: {
        backgroundColor: '#800f0f',
    },
    selectedButtonText: {
        color: '#fff',
    },
})