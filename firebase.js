// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8EDnkOlQVxAkenNpC55rouPDZikR9jtQ",
  authDomain: "nusbuddy-auth.firebaseapp.com",
  projectId: "nusbuddy-auth",
  storageBucket: "nusbuddy-auth.appspot.com",
  messagingSenderId: "140585907066",
  appId: "1:140585907066:web:9b294a285cdafe4e88dcc3",
};

// Initialize Firebase
if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = getFirestore();

export { auth };
export { db };
