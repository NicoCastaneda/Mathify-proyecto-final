// AppNavigator.js

import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import ProfileScreen from '../views/ProfileScreen';
import StatsScreen from '../views/StatsScreen';
import HomeScreen from '../views/HomeScreen';
import NavBar from '../components/NavBar';
import loginScreen from '../views/loginScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  const [showNavBar, setShowNavBar] = useState(false);

  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBar={() => (showNavBar ? <NavBar /> : null)} 
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Stats" component={StatsScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />

      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
