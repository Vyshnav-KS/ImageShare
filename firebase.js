import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

// import { initializeApp } from 'firebase/app';
// import { getAuth } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';
// import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBsUvcc_m7wvOdVSQ9V9PXahpNoRlOzQBU',
  authDomain: 'imageshare-6e152.firebaseapp.com',
  projectId: 'imageshare-6e152',
  storageBucket: 'imageshare-6e152.appspot.com',
  messagingSenderId: '527627522775',
  appId: '1:527627522775:web:98e87cfda1a9894f929692',
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
  firebase.firestore().settings({experimentalForceLongPolling: true});
} else {
  app = firebase.app();
}

const auth = firebase.auth();
const storage = firebase.storage();
const db = firebase.firestore();
export {app, auth, storage, db};
