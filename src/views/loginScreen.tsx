import React, { useState } from 'react';
import { Text, View, TextInput, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import app, { firebaseConfig } from '../../firebase-config';
import { LinearGradient } from 'expo-linear-gradient';


export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const auth = getAuth(app);

  const handleCreateAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('acc created')
        const user = userCredential.user;
        console.log(user)
      })
      .catch(error => {
        Alert.alert("User already exists")
      })
  }

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('signed in')
        const user = userCredential.user;
        console.log(user)
        navigation.navigate('Home')
      })
      .catch(error => {
        console.log(error)
        Alert.alert("Email or password is incorrect. Please try again.")
      })

  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../../assets/logo.png')}
      />
      <Text style={styles.text}>Challenge your mind, follow your streak & learn.</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity onPress={handleSignIn} style={{ width: '100%' }}>
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#1F2B65', '#00C2FF']} style={styles.button}>
          <Text style={styles.buttonText}>Sign In</Text>
        </LinearGradient>
      </TouchableOpacity>

      <Text style={styles.NALabel}>Don't have an account?</Text>
      <TouchableOpacity onPress={handleCreateAccount} style={{ width: '100%' }}>
        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#C674F1', '#F22E7A']} style={styles.button}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </LinearGradient>
      </TouchableOpacity>



      <Text style={styles.ORLabel}>Or</Text>
      <TouchableOpacity style={styles.button}><Text style={styles.buttonText}>boton de google</Text></TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 50,
    backgroundColor: '#000932'
  },
  logo: {
    marginTop: -30,
    marginBottom: 10,
  },
  text: {
    textAlign: 'center',
    fontWeight: 'light',
    color: 'white',
    fontSize: 25,
    marginBottom: 50,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    width: '100%',
    height: 40,
    marginBottom: 10,
    padding: 10,
    backgroundColor: 'white',
  },
  button: {
    padding: 10,
    borderRadius: 10,
    marginTop: 15,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  NALabel: {
    color: 'white',
    marginTop: 20,
    marginBottom: -15,
    fontWeight: 'bold',
    fontSize: 15,
    alignSelf: 'flex-start'
  },
  ORLabel: {
    color: 'white',
    marginTop: 40,
    marginBottom: -15,
    fontWeight: 'bold',
    fontSize: 15,
  }
});


