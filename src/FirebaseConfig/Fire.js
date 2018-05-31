import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import firestore from 'firestore';
import 'firestore';

const config = {
    apiKey: "AIzaSyCnrPIW7wTWfCBbEI8RZNzQQJ3F3f4s9_U",
    authDomain: "drip-beta.firebaseapp.com",
    databaseURL: "https://drip-beta.firebaseio.com",
    projectId: "drip-beta",
    storageBucket: "drip-beta.appspot.com",
    messagingSenderId: "602364034245"
};

const settings = {timestampsInSnapshots : true};

export const fire = firebase.initializeApp(config);
export const firestoreDB = firestore;
export const firebaseFirestore = firebase.firestore();
firebaseFirestore.settings(settings);
