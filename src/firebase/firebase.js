import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyArmD1eJzWp1VkniZmqAaG-E0ShA6sBp2o",
    authDomain: "idid-today.firebaseapp.com",
    databaseURL: "https://idid-today.firebaseio.com",
    projectId: "idid-today",
    storageBucket: "idid-today.appspot.com",
    messagingSenderId: "797031334145",
    appId: "1:797031334145:web:06e9627effd5c6c3ee1b00",
    measurementId: "G-FRE0WNSPER"
};

firebase.initializeApp(config);


export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);


export default firebase;
