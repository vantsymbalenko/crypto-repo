import * as firebase from 'firebase';
import firestore from 'firestore';

const config = {
    apiKey: "AIzaSyCnrPIW7wTWfCBbEI8RZNzQQJ3F3f4s9_U",
    authDomain: "drip-beta.firebaseapp.com",
    databaseURL: "https://drip-beta.firebaseio.com",
    projectId: "drip-beta",
    storageBucket: "",
    messagingSenderId: "602364034245"
};

export const fire = firebase.initializeApp(config);
export const firestoreDB = firestore;
export const firebaseFirestore = firebase.firestore();