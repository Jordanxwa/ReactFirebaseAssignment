import * as firebase from 'firebase';

// Initialize Firebaseconst
const firebaseConfig = {
  apiKey: 'AIzaSyDFVjaGy--PoJVT4tO5UpLEvpTJ1U8BZ8g',
  authDomain: 'reactfirebaseassignment.firebaseapp.com',
  databaseURL: 'https://reactfirebaseassignment.firebaseio.com',
  projectId: 'reactfirebaseassignment',
  storageBucket: 'reactfirebaseassignment.appspot.com',
  messagingSenderId: '99206323679',
  appId: '1:99206323679:web:559111c98d67cddd45b86a'
};

firebase.initializeApp(firebaseConfig);

export default firebase;
