import firebase from 'firebase'
import flamelink from 'flamelink'

const config = {
    apiKey: "AIzaSyBlkD_5XWLLjLli8mzvfYPB0iIr-RNxPyM",
    authDomain: "pg-data-270ee.firebaseapp.com",
    databaseURL: "https://pg-data-270ee.firebaseio.com",
    projectId: "pg-data-270ee",
    storageBucket: "pg-data-270ee.appspot.com",
    messagingSenderId: "603873756686"
};
const settings = {timestampsInSnapshots: true};
export const fb = firebase.initializeApp(config);
export const fs = fb.firestore();
export const fl = flamelink(config);

fs.settings(settings);