import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBei9jMjdFjNQcA6Qmo4vuOwSZZ2Z_b8pA",
  authDomain: "crown-db-39aa9.firebaseapp.com",
  databaseURL: "https://crown-db-39aa9.firebaseio.com",
  projectId: "crown-db-39aa9",
  storageBucket: "crown-db-39aa9.appspot.com",
  messagingSenderId: "633437911094",
  appId: "1:633437911094:web:3740e0173545fd18b04097",
  measurementId: "G-CKFQF5425Z"
};

firebase.initializeApp(config);


export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

export const signInWithGoogle = () => auth.signInWithPopup(provider);


export default firebase;
