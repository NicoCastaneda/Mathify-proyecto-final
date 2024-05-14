import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialIcons, Entypo, Ionicons } from 'react-native-vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function NavBar(navigation) {
  navigation = useNavigation();
  const route = useRoute();

  const navigateToProfile = () => {
    navigation.navigate('Profile');
  };

  const navigateToStats = () => {
    navigation.navigate('Stats');
  };

  const navigateToHome = () => {
    navigation.navigate('Home');
  };

  const isStatsFocused = route.name === 'Stats';
  const isHomeFocused = route.name === 'Home';
  const isProfileFocused = route.name === 'Profile';

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={["#DFE6FF", "#5FA6FF"]}
      style={styles.mainContainer}
    >
      <View style={styles.viewContainer}>
        <TouchableOpacity onPress={navigateToStats}>
          <MaterialIcons name="leaderboard" size={30} color={isStatsFocused ? '#3C1FB2' : '#000932'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToHome}>
          <Entypo name="graduation-cap" size={30} color={isHomeFocused ? '#3C1FB2' : '#000932'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateToProfile}>
          <Ionicons name="person" size={30} color={isProfileFocused ? '#3C1FB2' : '#000932'} />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    borderRadius: 50,
  },
  viewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    paddingHorizontal: 35,
    borderRadius: 50,
  },
});
