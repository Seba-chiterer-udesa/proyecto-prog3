import app from "firebase/app";
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDkFB-udOhS1ubADbBJ_ob62Ftu_oumIas",
    authDomain: "proyecto-prog3-e7923.firebaseapp.com",
    projectId: "proyecto-prog3-e7923",
    storageBucket: "proyecto-prog3-e7923.appspot.com",
    messagingSenderId: "409498785454",
    appId: "1:409498785454:web:9f03deef62cd434143bf3f"
  };

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();