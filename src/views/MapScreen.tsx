import React from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View, Text, Button } from 'react-native';
import { googleMapIsInstalled } from 'react-native-maps/lib/decorateMapComponent';

export default function MapScreen() {
  return (
    <View style={styles.container}>
     <MapView 
      
      style={styles.map} 
      initialRegion={{
        latitude: 4.861668015490226,
        longitude: -74.0336078314903,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}>
        <Marker coordinate={{latitude: 4.861668015490226,
        longitude: -74.0336078314903}}/>
      </MapView>
      <View style={{height: 80}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "grey"
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
});
