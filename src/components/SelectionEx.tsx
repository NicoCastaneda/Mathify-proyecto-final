import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const SelectionEx = ({ enunciado, problema, opciones, respuesta, onAnswer }) => {
  const handleOptionSelect = (selectedOption) => {
    const isCorrect = selectedOption === respuesta;
    onAnswer(isCorrect);
  };

  return (
    <View style={styles.exerciseContainer}>
      <Text style={styles.enunciadoGeneral}>{enunciado}</Text>
      <LinearGradient
        colors={["#C674F1", "#F22E7A"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ padding: 15, alignItems: 'center', borderRadius: 10 }}
      >
        <Text style={styles.problema}>{problema}</Text>
      </LinearGradient>
      <View style={styles.optionsContainer}>
        {opciones.map((option, index) => (
          <TouchableOpacity key={index} style={styles.option} onPress={() => handleOptionSelect(option)}>
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  exerciseContainer: {
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
  optionsContainer: {
    marginTop: 20,
  },
  option: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  optionText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SelectionEx;
