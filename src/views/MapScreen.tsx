import React from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <Text>Map</Text>
     <MapView 
      provider={PROVIDER_GOOGLE}
      style={styles.map} 
      initialRegion={{
        latitude: 4.861668015490226,
        longitude: -74.0336078314903,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
