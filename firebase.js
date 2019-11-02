import * as firebase from 'firebase';

class firebase {
  constructor() {
    this.init();
    this.observeAuth();
  }

  init = () =>
    firebase.initializeApp({
      apiKey: 'AIzaSyAGFHW_RJWb2IEZuPoF3wBMaK7h18Xmv6M',
      authDomain: 'reactnative-firebase-2363c.firebaseapp.com',
      databaseURL: 'https://reactnative-firebase-2363c.firebaseio.com',
      projectId: 'reactnative-firebase-2363c',
      storageBucket: 'reactnative-firebase-2363c.appspot.com',
      messagingSenderId: '328266218292',
      appId: '1:328266218292:web:e401f60471fa79495cc361'
    });

  observeAuth = () =>
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

  onAuthStateChanged = user => {
    if (!user) {
      try {
        firebase.auth().signInAnonymously();
      } catch ({ message }) {
        alert(message);
      }
    }
  };

  // 1.
  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  // 1.
  get ref() {
    return firebase.database().ref('messages');
  }

  parse = snapshot => {
    // 1.
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;
    // 2.
    const timestamp = new Date(numberStamp);
    // 3.
    const message = {
      _id,
      timestamp,
      text,
      user
    };
    return message;
  };

  // 2.
  on = callback =>
    this.ref
      .limitToLast(20)
      .on('child_added', snapshot => callback(this.parse(snapshot)));
  // 3.

  // 2.
  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }

  // 3.
  send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      // 4.
      const message = {
        text,
        user,
        timestamp: this.timestamp
      };
      this.append(message);
    }
  };
  // 5.
  append = message => this.ref.push(message);

  // 4.
  off() {
    this.ref.off();
  }
}

firebase.shared = new firebase();

export default firebase;
