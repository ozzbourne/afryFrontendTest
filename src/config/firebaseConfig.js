import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD70BhLnE5ZCQjBrIlR9wfV0BXvQhIo1nY',
  authDomain: 'afry-85b59.firebaseapp.com',
  projectId: 'afry-85b59',
  storageBucket: 'afry-85b59.appspot.com',
  messagingSenderId: '1009180149226',
  appId: '1:1009180149226:web:9f62fa4f1cf5ed25589e93',
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export default db;
