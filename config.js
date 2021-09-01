import * as firebase from 'firebase';

require('@firebase/firestore');

var firebaseConfig = {
  apiKey: "AIzaSyCEmhQMeHT55I77zRUNGJlsuL3bRLrMYfI",
  authDomain: "barter-e18cc.firebaseapp.com",
  projectId: "barter-e18cc",
  storageBucket: "barter-e18cc.appspot.com",
  messagingSenderId: "83535580972",
  appId: "1:83535580972:web:d42ca571db97066287e689"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();