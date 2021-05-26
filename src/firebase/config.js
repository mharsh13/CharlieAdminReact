import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyABrfrUJEwqjD1aw6fREWNVO-tHOeCGNn8",
  authDomain: "charlie-ed09f.firebaseapp.com",
  projectId: "charlie-ed09f",
  storageBucket: "charlie-ed09f.appspot.com",
  messagingSenderId: "774290683111",
  appId: "1:774290683111:web:93049d87506b7e11d59e42",
  measurementId: "G-XESDWQP8SW",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectStorage, projectFirestore, timestamp };
