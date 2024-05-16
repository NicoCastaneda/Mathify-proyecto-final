// AppNavigator.js

import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

import ProfileScreen from '../views/ProfileScreen';
import StatsScreen from '../views/StatsScreen';
import HomeScreen from '../views/HomeScreen';
import NavBar from '../components/NavBar';
import loginScreen from '../views/loginScreen';
import { Ionicons, Entypo } from 'react-native-vector-icons';
import { Modal } from 'react-native';
import Menu from '../components/Menu';
import MapScreen from '../views/MapScreen';
import AboutScreen from '../views/AboutScreen';
import SettingsScreen from '../views/SettingsScreen';

const Tab = createBottomTabNavigator();


const AppNavigator = () => {

  const [showNavBar, setShowNavBar] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={() => (showNavBar ? <NavBar /> : null)}
      >
        {/*pantalla HOME*/}
        <Tab.Screen name="Home" component={HomeScreen}
          options={{
            headerShown: true,
            title: 'Learn',
            headerTransparent: true,
            headerTintColor: '#000932',
            headerTitleStyle: { fontWeight: 'bold' },

            headerLeft: () => (
              <Entypo
                name="graduation-cap"
                size={24}
                color="#000932"
                style={{ marginLeft: 20 }}
              />
            ),
            headerRight: () => (
              <Ionicons
                name="menu"
                size={30}
                color="#000932"
                style={{ marginRight: 20 }}
                onPress={() => {
                  setModalVisible(true);
                }}
              />
            ),
          }} />

        {/*pantalla STATS*/}
        <Tab.Screen name="Stats" component={StatsScreen}
          options={({ navigation }) => ({
            headerShown: true,
            title: 'Stats',
            headerTransparent: true,
            headerTintColor: '#000932',
            headerTitleStyle: { fontWeight: 'bold' },

            headerLeft: () => (
              <Ionicons
                name="arrow-back"
                size={24}
                color="#000932"
                style={{ marginLeft: 20 }}
                onPress={() => navigation.goBack()}
              />
            ),
            headerRight: () => (
              <Ionicons
                name="menu"
                size={30}
                color="#000932"
                style={{ marginRight: 20 }}
                onPress={() => {
                  setModalVisible(true);
                }}
              />
            ),
          })}
        />

        {/*pantalla PROFILE*/}
        <Tab.Screen name="Profile" component={ProfileScreen}
          options={({ navigation }) => ({
            headerShown: true,
            title: 'Profile',
            headerTransparent: true,
            headerTintColor: '#000932',
            headerTitleStyle: { fontWeight: 'bold' },

            headerLeft: () => (
              <Ionicons
                name="arrow-back"
                size={24}
                color="#000932"
                style={{ marginLeft: 20 }}
                onPress={() => {
                  navigation.goBack();
                }}
              />
            ),
            headerRight: () => (
              <Ionicons
                name="menu"
                size={30}
                color="#000932"
                style={{ marginRight: 20 }}
                onPress={() => {
                  setModalVisible(true);
                }}
              />
            ),
          })} />

        {/*pantalla LOGIN*/}
        <Tab.Screen name="Login" component={loginScreen} options={{ headerShown: false }} />

        {/*pantalla MAP*/}
        <Tab.Screen name="Map" component={MapScreen}
          options={({ navigation }) => ({
            headerShown: true,
            title: 'Find Educational Centers',
            headerTransparent: true,
            headerTintColor: '#000932',
            headerTitleStyle: { fontWeight: 'bold' },

            headerLeft: () => (
              <Ionicons
                name="arrow-back"
                size={24}
                color="#000932"
                style={{ marginLeft: 20 }}
                onPress={() => {
                  navigation.goBack();
                }}
              />
            ),
            headerRight: () => (
              <Ionicons
                name="menu"
                size={30}
                color="#000932"
                style={{ marginRight: 20 }}
                onPress={() => {
                  setModalVisible(true);
                }}
              />
            ),
          })} />

        {/*pantalla ABOUT*/}
        <Tab.Screen name="About" component={AboutScreen} options={() => ({ headerShown: false, })} />

        {/*pantalla SETTINGS*/}
        <Tab.Screen name="Settings" component={SettingsScreen}
          options={({ navigation }) => ({
            headerShown: true,
            title: 'Settings',
            headerTransparent: true,
            headerTintColor: '#000932',
            headerTitleStyle: { fontWeight: 'bold' },

            headerLeft: () => (
              <Ionicons
                name="arrow-back"
                size={24}
                color="#000932"
                style={{ marginLeft: 20 }}
                onPress={() => {
                  navigation.goBack();
                }}
              />
            ),
            headerRight: () => (
              <Ionicons
                name="menu"
                size={30}
                color="#000932"
                style={{ marginRight: 20 }}
                onPress={() => {
                  setModalVisible(true);
                }}
              />
            ),
          })} />
      </Tab.Navigator>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}><Menu close={() => { setModalVisible(false) }} />
      </Modal>

    </NavigationContainer>

  );
};

export default AppNavigator;
