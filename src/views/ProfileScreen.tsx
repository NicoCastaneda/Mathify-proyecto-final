import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text, Alert, TouchableOpacity, Modal, ActivityIndicator } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import NavBar from '../components/NavBar';
import { AppContext } from '../context/AppContext';
import { useCameraPermissions, launchCameraAsync, MediaTypeOptions, PermissionStatus} from 'expo-image-picker'
import { MaterialCommunityIcons} from 'react-native-vector-icons'
import { dbInstance, uploadToFirebase } from '../../firebase-config';
import { doc, updateDoc } from 'firebase/firestore/lite';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { user } from '../interface/user';

const ProfileScreen = (navigation) => {
  const { perfil } = useContext(AppContext)
  const [permission, requestPermission] = useCameraPermissions();
  const [fotoUri, setFotoUri] = useState("")
  const [loading, setLoading] = useState(false)

  var fotoPerfil ="https://fakeimg.pl/400x400/2e82c7/ffffff?text=&font=bebas"
  if(fotoUri != ""){
    fotoPerfil = fotoUri
  }
  else if (perfil.foto != null) {
    fotoPerfil = perfil.foto
  }
  useEffect(()=> {
    if(fotoUri != ""){
      fotoPerfil = fotoUri
    }
  },[fotoUri])
  
  const updatePhoto = async (uri: string) => {
    await updateDoc(doc(dbInstance, "perfiles", perfil.profileID), {
        foto: uri
    });
    await setFotoUri(uri)
    try {
      var user = {...perfil, foto: uri} as user
      await AsyncStorage.setItem("perfil", JSON.stringify(user))
      console.log("Guardando...")
    } catch (error) {
      Alert.alert("Ha habido un error")
      console.log(error)
    }
  };

  const takePhoto = async () => {
    try {
      const cameraResp = await launchCameraAsync({
        allowsEditing: true,
        mediaTypes: MediaTypeOptions.All,
        quality: 1,
      });

      if (!cameraResp.canceled) {
        const { uri } = cameraResp.assets[0];
        const fileName = uri.split("/").pop();
        var old = fotoPerfil.split("/")[fotoPerfil.split("/").length-1].split("%2F")[fotoPerfil.split("/")[fotoPerfil.split("/").length-1].split("%2F").length-1]
        setLoading(true)
        const uploadResp = await uploadToFirebase(old,uri, fileName, (v) =>
          console.log(v)
        );
        setLoading(false)
        console.log(uploadResp);
        updatePhoto(uri);
      }
    } catch (e) {
      Alert.alert("Error Uploading Image " + e.message);
      setLoading(false)
    }
  };


  const editPhoto = () => {
    if (permission?.status !== PermissionStatus.GRANTED) {
      requestPermission()
    }
    else {
      takePhoto()
    }
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#ffffff', '#4B9EFF']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{ position: 'absolute', left: 0, right: 0, top: 0, height: '28%', borderRadius: 20 }}
      />
      <View style={{height: "31%", flexDirection: "row"}}>
        <Image style={styles.profilePicture} src={fotoPerfil}></Image>
        <View style={{...styles.editButton, backgroundColor: "#4B9EFF"}} />
        <TouchableOpacity style={styles.editButton} onPress={editPhoto}>
          <MaterialCommunityIcons name="pencil" size={16} color='white' />
        </TouchableOpacity>
        <View>
          <Text style={{marginTop: 122, marginLeft: 20, fontSize: 24, fontWeight: "bold", color: "white"}}>{perfil.nombre}</Text>
          <View style={{flexDirection: "row"}}>
            <MaterialCommunityIcons style={{marginLeft: 20, marginTop: 7}} name="lightbulb-on" size={30} color='white' />
            <Text style={{marginTop: 10, marginLeft: 5, fontSize: 23, color: "white", fontWeight: "bold"}}>{perfil.clues}</Text>
          </View>
        </View>
      </View>
      <View style={{marginHorizontal: "5%"}}>
        <Text style={styles.title}>Statistics</Text>
        <Text style={styles.title}>Exp</Text>
      </View>

      <View style={styles.navbar}><NavBar/></View>

      <Modal 
        animationType="slide"
        transparent={true}
        visible={loading}
        onRequestClose={() => {
          setLoading(!loading);
        }}>
          <View style={{flex: 1, backgroundColor:"rgba(0,0,0,0.5)", alignContent: 'center', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 24, fontWeight: "bold", color: "white"}}>Cargando...</Text>
            <ActivityIndicator></ActivityIndicator>
          </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    navbar: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
      padding: 8
    },
    profilePicture: {
      marginTop: "28%",
      marginLeft: 20,
      height: 100,
      width: 100,
      borderRadius: 200
    },
    title: {
      fontWeight: "bold",
      fontSize: 21
    },
    editButton: {
      position: "absolute",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "blue",
      height: 30,
      width: 30,
      marginTop: "47%",
      marginLeft: 90,
      borderRadius: 200,
      borderWidth: 2,
      borderColor: "#4B9EFF"
    },
  })

export default ProfileScreen;
