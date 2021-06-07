import * as firebase from 'firebase';
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBvd35IJV7tmywTK7kopDwyi630TD8L-0s",
  authDomain: "signal-clone-9b29a.firebaseapp.com",
  projectId: "signal-clone-9b29a",
  storageBucket: "signal-clone-9b29a.appspot.com",
  messagingSenderId: "535239338286",
  appId: "1:535239338286:web:062e49383beedf9cccb2bf"
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export {db, auth};
