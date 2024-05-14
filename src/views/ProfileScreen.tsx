import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NavBar from '../components/NavBar';

const ProfileScreen = (navigation) => {
navigation = useNavigation();

  const navigateToStats = () => {
    navigation.navigate('Stats');
  };

  const navigateToHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}> 
      <Text>Profile Screen</Text>


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
    }
  })

export default ProfileScreen;
