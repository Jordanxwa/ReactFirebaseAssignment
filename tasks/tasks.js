import firebase from 'firebase';
import '@firebase/firestore';

firebase.initializeApp(firebaseConfig);

const firebaseConfig = {
  apiKey: 'AIzaSyAdg845RaKUaElk8paiPVF5k6K5lwQ8Fxk',
  authDomain: 'reactfirebaseassignment-3af19.firebaseapp.com',
  databaseURL: 'https://reactfirebaseassignment-3af19.firebaseio.com',
  projectId: 'reactfirebaseassignment-3af19',
  storageBucket: 'reactfirebaseassignment-3af19.appspot.com',
  messagingSenderId: '652934914254',
  appId: '1:652934914254:web:c0b2d898fa4f0e7c51309f'
};

export function addTask(task, addComplete) {
  firebase
    .firestore()
    .collection('Tasks')
    .add({
      name: task.name,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(snapshot => snapshot.get())
    .then(taskData => addComplete(taskData.data()))
    .catch(error => console.log(error));
}

export async function getTask(taskReceived) {
  var itemList = [];

  var snapshot = await firebase
    .firestore()
    .collection('Tasks')
    .orderBy('createdAt')
    .get();

  snapshot.forEach(doc => {
    itemList.push(doc.data());
  });

  taskReceived(itemList);
}
