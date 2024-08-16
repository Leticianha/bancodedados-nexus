import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCvb3nSYrcJ_JexbkO_c6FDgrggOtAjptw",
    authDomain: "nexus-47d4e.firebaseapp.com",
    projectId: "nexus-47d4e",
    storageBucket: "nexus-47d4e.appspot.com",
    messagingSenderId: "322156513563",
    appId: "1:322156513563:web:16cfcb8d177cc1d1b1abbe",
    measurementId: "G-81FXBZR2KC"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

const db = getFirestore(app);

export { app, auth, db };
