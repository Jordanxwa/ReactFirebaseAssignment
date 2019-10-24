import * as firebase from 'firebase';
import '@firebase/firestore';

// Initialize Firebase
var firebaseConfig = {
  apiKey: 'AIzaSyAdg845RaKUaElk8paiPVF5k6K5lwQ8Fxk',
  authDomain: 'reactfirebaseassignment-3af19.firebaseapp.com',
  databaseURL: 'https://reactfirebaseassignment-3af19.firebaseio.com',
  projectId: 'reactfirebaseassignment-3af19',
  storageBucket: 'reactfirebaseassignment-3af19.appspot.com',
  messagingSenderId: '652934914254',
  appId: '1:652934914254:web:c0b2d898fa4f0e7c51309f'
};

firebase.initializeApp(firebaseConfig);

export default firebase;
