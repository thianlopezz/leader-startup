import firebase from "firebase";
import "firebase/storage";

try {
  firebase.initializeApp({
    apiKey: "AIzaSyAXYwZi6HqXypf5nrTeozXgy8JyC8ZGjHc",
    authDomain: "leader-startup.firebaseapp.com",
    databaseURL: "https://leader-startup.firebaseio.com",
    projectId: "leader-startup",
    storageBucket: "",
    messagingSenderId: "435739456455",
    appId: "1:435739456455:web:1e372a1faafce00a"
  });
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error("Firebase initialization error", err.stack);
  }
}

const fs = firebase.firestore();
fs.settings({ timestampsInSnapshots: true });

const storageRef = firebase.storage();

export { storageRef, fs as default };
