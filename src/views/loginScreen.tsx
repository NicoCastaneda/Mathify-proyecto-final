import React, { useContext, useEffect, useState } from "react";
import { Text, View, TextInput, Image, StyleSheet, TouchableOpacity, Alert, Modal, } from "react-native";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, initializeAuth, getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import app, { dbInstance, firebaseConfig } from "../../firebase-config";
import { LinearGradient } from "expo-linear-gradient";
import { GoogleSignin, GoogleSigninButton, statusCodes, } from "@react-native-google-signin/google-signin";
import { AppContext } from "../context/AppContext";
import { user } from "../interface/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addDoc, collection, getDocs } from "firebase/firestore/lite";

export default function LoginScreen({ navigation }) {
  const { perfil, setPerfil} = useContext(AppContext);
  var found: user = {} as user
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [docID, setDocID] = useState("")

  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState('')
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    if (perfil.email != null) {
      navigation.navigate("Home");
    }
    else {
      navigation.navigate("Login")
    }
  },[perfil.email]);

  useEffect(()=>{
    console.log("Found Updated: ",found)
  },[found])

  GoogleSignin.configure({
    webClientId:
      "817845370181-7bok7ripvgooogb6rdhavil2uukofsm1.apps.googleusercontent.com", // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
    scopes: ["https://www.googleapis.com/auth/drive.readonly"], // what API you want to access on behalf of the user, default is email and profile
    offlineAccess: false, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    hostedDomain: "", // specifies a hosted domain restriction
    forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
    accountName: "", // [Android] specifies an account name on the device that should be used
  });

  const getFromFirebase = async (email:string)=> {
    const querySnapshot = await getDocs(collection(dbInstance, "perfiles"))
    querySnapshot.forEach((doc) => {
      var profile = {profileID: doc.id, ...doc.data()} as user
      console.log(profile.email,", ",email)
      if (profile.email == email) {
        console.log("Se encontró el perfil")
        found = profile
      }
    })
  }

  const setToFirebase = async (nombre: string, email:string, photo: string) => {
    try {
      if (photo == "") {
        photo = `https://fakeimg.pl/400x400/2e82c7/ffffff?text=${nombre.slice(0, 1)}&font=bebas`
      }
      console.log("Correo obtenido: ",email)
      console.log("Revisando la base de datos...")
      var createUser = true
      const querySnapshot = await getDocs(collection(dbInstance, "perfiles"))
      querySnapshot.forEach((doc) => {
        var profile = {...doc.data} as user
        console.log("Usuario: ",profile)

        if (profile.email == email) {
          console.log("Coincidencia!")
          setDocID(doc.id)
          createUser = false
        }
      })
      if (createUser) {
        await addDoc(collection(dbInstance,"perfiles"), {
          nombre: nombre,
          email: email,
          foto: photo,
          achievements: [],
          lastUnitCoursed: 0,
          clues: 50
        })
      }
    } catch (error) {
      console.log(error)
    }
  }


  const setInfo = async (user: user) => {
    try {
      await AsyncStorage.setItem("perfil", JSON.stringify(user))
      console.log("Guardando...")
    } catch (error) {
      Alert.alert("Ha habido un error")
      console.log(error)
    }
  }

  const auth = getAuth(app)

  const handleCreateAccount = async () => {
    await getFromFirebase(newEmail)
      .then(() => {
      if (found.email == null) {
        createUserWithEmailAndPassword(auth, newEmail, newPassword)
          .then((userCredential) => {
            console.log("acc created");
            const user = userCredential.user;
            setToFirebase(newName, user.email, "");
            console.log(user);
            Alert.alert("Tu cuenta ha sido creada correctamente")
            setNewName('')
            setNewEmail('')
            setNewPassword('')
          })
          .catch((error) => {
            Alert.alert(error.message);
          });
        setModalVisible(false);
        setNewName("")
        setNewEmail("");
        setNewPassword("");
      }
      else Alert.alert("El correo electrónico ya está registrado, intenta iniciar sesión")
    })
    .catch((error) => console.log(error))
  };

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        console.log("signed in");
        const user = userCredential.user
        var email = user.email;
        //var foto = `https://fakeimg.pl/400x400/2e82c7/ffffff?text=${nombre.slice(0, 1)}&font=bebas`
        await getFromFirebase(email)
        if (found.email != null) {
          setPerfil(found);
          setInfo(found);
        }
        setEmail("");
        setPassword("");
      })
      .catch((error) => {
        console.log(error);
        Alert.alert("Email or password is incorrect. Please try again.");
      });
  };

  const handelGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      var email = userInfo.user.email
      await getFromFirebase(email)
      if (found.email == null) {
        console.log("Perfil no encontrando, creando perfil nuevo...")
        var foto = userInfo.user.photo;
        var nombre = userInfo.user.name
        setToFirebase(nombre, email, foto)
        const user: user = {
          profileID: docID,
          nombre: nombre,
          email: email,
          foto: foto,
          achievements: [],
          lastUnitCoursed: 0,
          clues: 50
        }
        setPerfil(user);
        setInfo(user);
      }
      else {
        console.log("Encontrado: ",found.email)
        setPerfil(found);
        setInfo(found);
      }
    } catch (error) {
      switch (error.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          // user cancelled the login flow
          console.log("Sign in Canceled");
          break;
        case statusCodes.IN_PROGRESS:
          console.log("In progress");
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          console.log("Play services not available");
          break;
        default:
          console.log("Error desconocido:");
          console.log(error.message);
      }
    }
  };

  return (
    
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../../assets/logo.png")} />
      <Text style={styles.text}>
        Challenge your mind, follow your streak & learn.
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity onPress={() =>{getFromFirebase(email);handleSignIn()}} style={{ width: "100%" }}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={["#1F2B65", "#00C2FF"]}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Log In</Text>
        </LinearGradient>
      </TouchableOpacity>
      <Text style={styles.NALabel}>Don't have an account?</Text>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={{ width: "100%" }}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={["#C674F1", "#F22E7A"]}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </LinearGradient>
      </TouchableOpacity>
      <Text style={styles.ORLabel}>Or</Text>
      
        <GoogleSigninButton
          size={GoogleSigninButton.Size.Wide}
          style={{ width: '100%', height: 48, marginTop: 20, marginBottom: -20 }}
          color={GoogleSigninButton.Color.Light}
          onPress={handelGoogleSignIn}
        />
    

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalCenteredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.input}
              onChangeText={setNewName}
              value={newName}
              placeholder="Name"
            />
            <TextInput
              style={styles.input}
              onChangeText={setNewEmail}
              value={newEmail}
              placeholder="Email"
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              onChangeText={setNewPassword}
              value={newPassword}
              placeholder="Password"
              secureTextEntry
            />

            <TouchableOpacity onPress={handleCreateAccount} style={{ width: "100%" }}>
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={["#1F2B65", "#00C2FF"]}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Create Account</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
              setModalVisible(false)
              setNewEmail("")
              setNewName("")
              setNewPassword("")
              }} style={{ width: "100%" }}>
              <Text style={styles.modalText}>Cancel</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 50,
    backgroundColor: "#000932",
  },
  logo: {
    marginTop: -30,
    marginBottom: 10,
  },
  text: {
    textAlign: "center",
    fontWeight: "light",
    color: "white",
    fontSize: 25,
    marginBottom: 50,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    width: "100%",
    height: 40,
    marginBottom: 10,
    padding: 10,
    backgroundColor: "white",
  },
  button: {
    padding: 10,
    borderRadius: 10,
    marginTop: 15,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  NALabel: {
    color: "white",
    marginTop: 20,
    marginBottom: -15,
    fontWeight: "bold",
    fontSize: 15,
    alignSelf: "flex-start",
  },
  ORLabel: {
    color: "white",
    marginTop: 40,
    marginBottom: -15,
    fontWeight: "bold",
    fontSize: 15,
  },
  modalCenteredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    marginTop: 320,
    backgroundColor: '#000932',
    borderRadius: 10,
    width: '77%',
    alignItems: 'center',

  },
  modalTextInput: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
  modalText: {
    textAlign: 'center',
    color: 'white',
    fontStyle: 'italic',
    fontSize: 15,
    marginTop: 225,
  },
});
