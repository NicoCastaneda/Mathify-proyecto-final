import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const ToFEx = ({ enunciado, problema, respuesta, onAnswer }) => {
  const handleAnswer = (selectedAnswer) => {
    const isCorrect = (selectedAnswer === 'true') === (respuesta === 'true');
    onAnswer(isCorrect);
  };

  return (
    <View style={styles.exerciseContainer}>
      <Text style={styles.enunciadoGeneral}>{enunciado}</Text>
      <LinearGradient
        colors={["#3e5740", "#573e3e"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ padding: 15, alignItems: 'center', borderRadius: 10 }}
      >
        <Text style={styles.problema}>{problema}</Text>
      </LinearGradient>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handleAnswer('true')}>
          <LinearGradient
            colors={["#3e6b3f", "#32CD32"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ padding: 15, alignItems: 'center', borderRadius: 10 }}
          >
            <Text style={styles.buttonText}>true</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleAnswer('false')}>
          <LinearGradient
            colors={["#6b3e3e", "#FF5C5C"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ padding: 15, alignItems: 'center', borderRadius: 10 }}
          >
            <Text style={styles.buttonText}>false</Text>
          </LinearGradient>
        </TouchableOpacity>
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
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 30,
  },
  button: {
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default ToFEx;
