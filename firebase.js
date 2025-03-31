// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDiJ7rtUHhQ67kG_vyx0CPArS23ReLPvkE", 
    authDomain: "bytesnotfound.firebaseapp.com",
    projectId: "bytesnotfound",
    storageBucket: "bytesnotfound.appspot.com",
    messagingSenderId: "35057330551", 
    appId: "1:35057330551:web:5bdb6bdc518c24ae5b1972", 
    measurementId: "G-Q1E8THNWLH"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
