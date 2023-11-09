import { boot } from "quasar/wrappers";

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  deleteDoc,
  deleteField,
  collection,
  query,
  where,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

import firebase from "firebase/compat/app";
//import "firebase/compat/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAwJfS7SEXZyOH2-aDp5V2xpDURqV52DJ8",
  authDomain: "teste-projeto-3b3e9.firebaseapp.com",
  projectId: "teste-projeto-3b3e9",
  storageBucket: "teste-projeto-3b3e9.appspot.com",
  messagingSenderId: "487708856176",
  appId: "1:487708856176:web:4890cc61f9142f473689b5",
  measurementId: "G-S8W6QV1STF",
};

//

// const firebaseConfig = {
//   apiKey: "AIzaSyB7aJ16RM-Zh7_ROfiLs-kzOGgSgGxXyPY",
//   authDomain: "apigrupovab.firebaseapp.com",
//   projectId: "apigrupovab",
//   storageBucket: "apigrupovab.appspot.com",
//   messagingSenderId: "232910036994",
//   appId: "1:232910036994:web:a20a3393561d9d71c7071b",
//   measurementId: "G-HQLGR7RVW0",
// };

// Inicialize Firebase Storage
//firebase.initializeApp(firebaseConfig);
//var storage = firebase.storage();

// Initialize Firebase App
const app = initializeApp(firebaseConfig);
//var storage = firebase.storage();
const db = getFirestore(app);
//const auth = getAuth(app);

export {
  db,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  deleteField,
  collection,
  query,
  where,
  onSnapshot,
  serverTimestamp,
  deleteDoc,
};

export default boot(async (/*{ db, setDoc }*/) => {
  // something to do
});
