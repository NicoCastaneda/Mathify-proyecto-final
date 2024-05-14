// AppNavigator.js

import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

import ProfileScreen from '../views/ProfileScreen';
import StatsScreen from '../views/StatsScreen';
import HomeScreen from '../views/HomeScreen';
import NavBar from '../components/NavBar';
import loginScreen from '../views/loginScreen';
import { Ionicons } from 'react-native-vector-icons';
import { Modal } from 'react-native';
import Menu from '../components/Menu';

const Tab = createBottomTabNavigator();


const AppNavigator = () => {

  const [showNavBar, setShowNavBar] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={() => (showNavBar ? <NavBar /> : null)} 
      >
        <Tab.Screen name="Home" component={HomeScreen}
        options={{
          headerShown: true, 
            title: 'Learn', 
            headerTransparent: true,
            headerTintColor: '#000932',
            headerTitleStyle: { fontWeight: 'bold' } ,
       
            headerLeft: () => (
              <Ionicons
              name="arrow-back"
              size={24}
              color="#000932"
              style={{ marginLeft: 20 }}
              onPress={() => {
                console.log('Back button clicked');
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
                console.log('menu button clicked');
              }}
            />
            ),
        }}/>

        <Tab.Screen name="Stats" component={StatsScreen} 
         options={{
          headerShown: true, 
            title: 'Stats', 
            headerTransparent: true,
            headerTintColor: '#000932',
            headerTitleStyle: { fontWeight: 'bold' } ,
       
            headerLeft: () => (
              <Ionicons
              name="arrow-back"
              size={24}
              color="#000932"
              style={{ marginLeft: 20 }}
              onPress={() => {
                console.log('Back button clicked');
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
                console.log('menu button clicked');
              }}
            />
            ),
        }}/>

        <Tab.Screen name="Profile" component={ProfileScreen}
         options={{
          headerShown: true, 
            title: 'Profile', 
            headerTransparent: true,
            headerTintColor: '#000932',
            headerTitleStyle: { fontWeight: 'bold' } ,
       
            headerLeft: () => (
              <Ionicons
              name="arrow-back"
              size={24}
              color="#000932"
              style={{ marginLeft: 20 }}
              onPress={() => {
                console.log('Back button clicked');
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
        }}/>

        <Tab.Screen name="Login" component={loginScreen} options={{headerShown: false}}/>
      </Tab.Navigator>
      
      <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}><Menu close={() => {setModalVisible(false)}}/>
      </Modal>

    </NavigationContainer>
    
  );
};

export default AppNavigator;
