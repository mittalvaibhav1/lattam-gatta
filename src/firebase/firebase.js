import firebase from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
 // your firebase config
};

const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();

export default db;
