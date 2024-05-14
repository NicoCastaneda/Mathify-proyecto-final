import React, { useState } from 'react';
import { Image, Text, View, StyleSheet, Modal } from 'react-native';

interface contents {
    close: () => void;
}

const Menu = ({close}: contents) => {

  return (
    <View style={styles.container}>
      <View style={styles.menu}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
        <Text style={styles.title}>Mathify</Text>
        <View style={styles.navigation}>
          <Text style={styles.navItem}>Profile</Text>
          <Text style={styles.navItem}>Settings</Text>
          <Text style={styles.navItem}>About</Text>
          <Text style={styles.navItem}>Log Out</Text>
        </View>
        <Text onPress={close} style={styles.closeButton}>X</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // Makes the container take up the whole screen
    flexDirection: 'row', // Arrange child elements horizontally
    alignSelf: 'flex-end', // Align the container to the right
  },
  menu: {
    backgroundColor: '#fff',
    padding: 20,
    width: '45%', // Set width to 45%
    height: '100%', // Set height to 100%
  },
  logo: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  navigation: {
    flexDirection: 'column', // Arrange navigation items vertically
  },
  navItem: {
    marginBottom: 10, // Add some space between navigation items
  },
  closeButton: {
    position: 'absolute', // Position close button absolutely
    top: 10, // Set top position with some padding
    right: 10, // Set right position with some padding
  },
});

export default Menu;
