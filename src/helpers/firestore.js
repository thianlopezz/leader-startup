// import firebase from "firebase";
// import "firebase/storage";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

let db;

try {
  const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
  }
debugger;
  const app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error("Firebase initialization error", err.stack);
  }
}

// fs.settings({ timestampsInSnapshots: true });

// const storageRef = firebase.storage();

export { db as default };
