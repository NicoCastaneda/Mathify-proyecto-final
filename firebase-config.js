import { initializeApp } from 'firebase/app';
import { getFirestore} from 'firebase/firestore/lite'
import {getStorage, ref, uploadBytesResumable, getDownloadURL, listAll} from 'firebase/storage'


export const firebaseConfig = {
  apiKey: "AIzaSyCsYV2CU12q_6PywMyTakBaz_T4tt1jhfw",
  authDomain: "mathify-91a29.firebaseapp.com",
  projectId: "mathify-91a29",
  storageBucket: "mathify-91a29.appspot.com",
  messagingSenderId: "817845370181",
  appId: "1:817845370181:web:f60b49ae1c1f82aafd122c"
};

const app = initializeApp(firebaseConfig);
const dbInstance = getFirestore(app);
const imageStorage = getStorage(app);

const listFiles = async () => {
  const storage = getStorage(app);

  // Create a reference under which you want to list
  const listRef = ref(storage, "images");

  // Find all the prefixes and items.
  const listResp = await listAll(listRef);
  return listResp.items;
};

const uploadToFirebase = async (uri, name, onProgress) => {
  const fetchResponse = await fetch(uri);
  const theBlob = await fetchResponse.blob();

  const imageRef = ref(getStorage(app), `images/${name}`);

  const uploadTask = uploadBytesResumable(imageRef, theBlob);

  return new Promise((resolve, reject) => {
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

export {dbInstance, imageStorage, uploadToFirebase, listFiles}
export default app;