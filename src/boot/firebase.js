import * as firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";
// import "firebase/storage";

// ADD YOUR FIREBASE CONFIG OBJECT HERE:
var firebaseConfig = {
  apiKey: "AIzaSyCQ8t9xE32bYp_JTn-Rrf-5edqi35kX-NE",
  authDomain: "quasar-app-demo.firebaseapp.com",
  databaseURL: "https://quasar-app-demo.firebaseio.com",
  projectId: "quasar-app-demo",
  storageBucket: "quasar-app-demo.appspot.com",
  messagingSenderId: "47075696381",
  appId: "1:47075696381:web:fe0f18564c4287c163a894",
  measurementId: "G-6889JY6SVN"
};

let firebaseApp = firebase.initializeApp(firebaseConfig);
let fireAuth = firebaseApp.auth();
let DB = firebaseApp.firestore();
// let fireStorage = firebaseApp.storage();

export { firebase, firebaseApp, fireAuth, DB };
// export { firebaseAuth, firebaseDb, fireStorage };
