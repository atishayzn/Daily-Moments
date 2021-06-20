// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import  firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyB4zDQ_72YCkJlFQ7q5D2SgMpXaCSxb76A",
    authDomain: "daily-momen.firebaseapp.com",
    projectId: "daily-momen",
    storageBucket: "daily-momen.appspot.com",
    messagingSenderId: "591104970914",
    appId: "1:591104970914:web:3f7ee6ea4b00a81974c7fb",
    measurementId: "G-NCG7E3B5HC"
  };
  const app=firebase.initializeApp(firebaseConfig);
  export const auth =app.auth();
  export const firestore=app.firestore();
  export const storage=app.storage();