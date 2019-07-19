import firebase from "firebase";
import "firebase/storage";

try {
  firebase.initializeApp({
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
  });
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error("Firebase initialization error", err.stack);
  }
}

const fs = firebase.firestore();
// fs.settings({ timestampsInSnapshots: true });

const storageRef = firebase.storage();

export { storageRef, fs as default };
