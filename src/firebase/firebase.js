import firebase from 'firebase/app';
import 'firebase/database';

// Initialize Firebase (make sure you do this at the beginning of your app)
const firebaseConfig = {
  apiKey: "AIzaSyDuT_dn5NCRJ2SnkFFotBPU5NWPAjLo9rY",
  authDomain: "iska-eae37.firebaseapp.com",
  projectId: "iska-eae37",
  // Add other Firebase configuration options here
};

firebase.initializeApp(firebaseConfig);

// Reference to your database
const database = firebase.database();

// Retrieve the "regular" data
const regularDataRef = database.ref('commands/regular');

regularDataRef.once('value')
  .then((snapshot) => {
    const regularData = snapshot.val();
    console.log('Regular Data:', regularData);
  })
  .catch((error) => {
    console.error('Error fetching regular data:', error);
  });
