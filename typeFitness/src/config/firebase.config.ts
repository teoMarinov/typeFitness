
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyA7XD-Wsor4lOpX3PB-EwiP7ja4pL1cqlM",
    authDomain: "typescript-fitness-32ac0.firebaseapp.com",
    databaseURL: "https://typescript-fitness-32ac0-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "typescript-fitness-32ac0",
    storageBucket: "typescript-fitness-32ac0.appspot.com",
    messagingSenderId: "737575154040",
    appId: "1:737575154040:web:c37e9f5d2f5ac9d878588d"
  };


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export default db;
export const storage = getStorage(app);