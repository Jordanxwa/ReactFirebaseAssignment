import firebase from 'firebase';
import '@firebase/firestore';
firebase.initializeApp(firebaseConfig);
const firebaseConfig = {
  apiKey: 'AIzaSyDFVjaGy--PoJVT4tO5UpLEvpTJ1U8BZ8g',
  authDomain: 'reactfirebaseassignment.firebaseapp.com',
  databaseURL: 'https://reactfirebaseassignment.firebaseio.com',
  projectId: 'reactfirebaseassignment',
  storageBucket: 'reactfirebaseassignment.appspot.com',
  messagingSenderId: '99206323679',
  appId: '1:99206323679:web:559111c98d67cddd45b86a'
};

export function addTask(task, addComplete) {
  firebase
    .firestore()
    .collection('Tasks')
    .add({
      name: task.name,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(data => addComplete(data))
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
