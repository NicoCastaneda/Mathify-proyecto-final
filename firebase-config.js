import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs} from 'firebase/firestore/lite'
import {getStorage, ref, uploadBytesResumable, getDownloadURL, listAll} from 'firebase/storage'


export const firebaseConfig = {
  apiKey: "AIzaSyCsYV2CU12q_6PywMyTakBaz_T4tt1jhfw",
  authDomain: "mathify-91a29.firebaseapp.com",
  projectId: "mathify-91a29",
  storageBucket: "mathify-91a29.appspot.com",
  messagingSenderId: "817845370181",
  appId: "1:817845370181:web:f60b49ae1c1f82aafd122c"
};

export const fetchLecciones = async () => {
  try {
    const leccionesCol = collection(dbInstance, 'lecciones');
    const leccionesSnapshot = await getDocs(leccionesCol);
    const leccionesList = [];

    for (const doc of leccionesSnapshot.docs) {
      const leccionData = doc.data();
      const ejerciciosCol = collection(doc.ref, 'ejercicios');
      const ejerciciosSnapshot = await getDocs(ejerciciosCol);
      const ejerciciosList = ejerciciosSnapshot.docs.map(ejercicioDoc => ejercicioDoc.data());
      
      // Agregar los ejercicios a los datos de la lección
      leccionData.ejercicios = ejerciciosList;
      leccionesList.push(leccionData);
    }

    console.log("Lecciones con ejercicios:", leccionesList);
    return leccionesList;
  } catch (error) {
    console.error("Error fetching lecciones: ", error);
    return [];
  }
};







const app = initializeApp(firebaseConfig);
const dbInstance = getFirestore(app);
const imageStorage = getStorage(app);

const uploadToFirebase = async (old,uri, name, onProgress) => {
  console.log("Old image: ",old)
  const fetchResponse = await fetch(uri);
  const theBlob = await fetchResponse.blob();

  const imageRef = ref(getStorage(app), `images/${name}`);
  const desertRef = ref(getStorage(app), `images/${old}`)

  const uploadTask = uploadBytesResumable(imageRef, theBlob);

  return new Promise((resolve, reject) => {
    try {
      deleteObject(desertRef).then(console.log("Old Deleted Succesfully"))
    } catch (error) {
      console.log(error)
    }
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        onProgress && onProgress(progress);
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
        reject(error);
      },
      async () => {
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
        resolve({
          downloadUrl,
          metadata: uploadTask.snapshot.metadata,
        });
      }
    );
  });
};

export {dbInstance, imageStorage, uploadToFirebase}
export default app;