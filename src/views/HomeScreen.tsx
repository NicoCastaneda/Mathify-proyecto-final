import { View, Text, Alert } from 'react-native'
import React, { useState } from 'react'
import { initializeApp } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { firebaseConfig } from '../../firebase-config';

export default function HomeScreen() {
    
  
  return (
    <View>
      <Text>HOME</Text>
    </View>
  )
}