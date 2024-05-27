import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const TypingEx = ({ enunciado, problema, respuesta, onAnswer }) => {
  const [userInput, setUserInput] = useState('');

  const handleCheck = () => {
    const isCorrect = userInput.trim() === respuesta;
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
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Your answer here..."
          placeholderTextColor="#aaa"
          value={userInput}
          onChangeText={setUserInput}
        />
      </View>
      <TouchableOpacity style={styles.check} onPress={handleCheck}>
        <LinearGradient
          colors={["#C674F1", "#F22E7A"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ padding: 15, alignItems: 'center', borderRadius: 10 }}
        >
          <Text style={styles.checkText}>Check</Text>
        </LinearGradient>
      </TouchableOpacity>
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
  inputContainer: {
    flex: 1,
    maxHeight: 50,
    alignItems: 'center',
    marginTop: 30,
  },
  input: {
    height: 50,
    width: 300,
    maxWidth: '100%',
    backgroundColor: '#fff',
    paddingLeft: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
});

export default TypingEx;
