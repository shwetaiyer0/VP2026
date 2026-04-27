// Import the Firebase SDK
import firebase from 'firebase/app';
import 'firebase/firestore';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDCHexnR1o6KkD0N5mi82G7E4VP2EDaP5w",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "events-8d388",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "638377830496",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);

// Get a reference to the Firestore service
const db = firebase.firestore();

// Example: Reading data from a collection
db.collection("cities").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        // doc.data() is an object representing the document
        console.log(`${doc.id} => ${doc.data()}`);
    });
});
