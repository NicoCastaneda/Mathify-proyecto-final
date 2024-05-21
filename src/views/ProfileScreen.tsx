import React, { useContext } from 'react';
import { View, StyleSheet, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from "expo-linear-gradient";
import NavBar from '../components/NavBar';
import { AppContext } from '../context/AppContext';

const ProfileScreen = (navigation) => {
navigation = useNavigation();

  const navigateToStats = () => {
    navigation.navigate('Stats');
  };

  const navigateToHome = () => {
    navigation.navigate('Home');
  };


  const { perfil, setPerfil } = useContext(AppContext)
  var fotoPerfil = "https://fakeimg.pl/400x400/2e82c7/ffffff?text=&font=bebas"
  if (perfil.foto == null) {
    fotoPerfil = "https://fakeimg.pl/400x400/2e82c7/ffffff?text=&font=bebas"
  } else{
    fotoPerfil = perfil.foto
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
        <View>
          <Text style={{marginTop:"70%", marginLeft: 20, fontSize: 24, fontWeight: "bold"}}>{perfil.nombre}</Text>
          <Text style={{marginLeft: 25, marginTop: 10, fontSize: 18}}>Expert - 56.870</Text>
        </View>
      </View>
      <View style={{marginHorizontal: "5%"}}>
        <Text style={styles.title}>Statistics</Text>
        <Text style={styles.title}>Exp</Text>
      </View>

      <View style={styles.navbar}><NavBar/></View>
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
  })

export default ProfileScreen;
