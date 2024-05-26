const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc, collection, addDoc } = require('firebase/firestore/lite');
const fs = require('fs');

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCsYV2CU12q_6PywMyTakBaz_T4tt1jhfw",
  authDomain: "mathify-91a29.firebaseapp.com",
  projectId: "mathify-91a29",
  storageBucket: "mathify-91a29.appspot.com",
  messagingSenderId: "817845370181",
  appId: "1:817845370181:web:f60b49ae1c1f82aafd122c"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Carga las preguntas desde el archivo JSON
const uploadQuestions = async () => {
  try {
    const data = fs.readFileSync('questions.json', 'utf8');
    const questions = JSON.parse(data);

    for (const leccion of questions.lecciones) {
      const leccionRef = doc(collection(db, 'lecciones'), leccion.nombre);
      await setDoc(leccionRef, {
        nombre: leccion.nombre,
        dificultad: leccion.dificultad
      });

      for (const ejercicio of leccion.ejercicios) {
        const ejercicioRef = collection(leccionRef, 'ejercicios');
        await addDoc(ejercicioRef, ejercicio);
      }
    }

    console.log('Questions uploaded successfully');
  } catch (error) {
    console.error('Error uploading questions:', error);
  }
};

// Ejecuta la función para cargar las preguntas
// node upload-questions.js

uploadQuestions();
