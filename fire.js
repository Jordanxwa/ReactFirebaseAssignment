import firebase from 'firebase';

// Initialize then call function
class fire {
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
      messagingSenderId: '328266218292'
    });

  observeAuth = () =>
    firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

  // If user anon sign in fails an error message will pop up
  onAuthStateChanged = user => {
    if (!user) {
      try {
        firebase.auth().signInAnonymously();
      } catch ({ message }) {
        alert(message);
      }
    }
  };

  // create helper for getting user's id
  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get ref() {
    return firebase.database().ref('messages');
  }

  parse = snapshot => {
    // deconstruct the val cna calling it to return whatever is associated with the snapshot
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;

    // converted timestamp to JavaScript Date
    const timestamp = new Date(numberStamp);

    const message = {
      _id,
      timestamp,
      text,
      user
    };
    return message;
  };

  // callback prop that gets the last 20 messages
  on = callback =>
    this.ref
      .limitToLast(20)
      .on('child_added', snapshot => callback(this.parse(snapshot)));

  // timestamp for saving messages
  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }

  // send function that will accept an array of messages, then loop through it
  send = messages => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];

      // save message to server
      const message = {
        text,
        user,
        timestamp: this.timestamp
      };
      this.append(message);
    }
  };

  // save message with unique id
  append = message => this.ref.push(message);

  // unsubscribe to the database
  off() {
    this.ref.off();
  }
}

fire.shared = new fire();

export default fire;
