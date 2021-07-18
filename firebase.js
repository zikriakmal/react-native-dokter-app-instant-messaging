import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyCwuKhKte4CQzeLcIrIlMxk-OQdIVHxbWM",
    authDomain: "ayodokter.firebaseapp.com",
    databaseURL: "https://ayodokter-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "ayodokter",
    storageBucket: "ayodokter.appspot.com",
    messagingSenderId: "276092691435",
    appId: "1:276092691435:web:c29dae6860faac26816fae",
    measurementId: "G-BPNQ78VHSX"
  };

  if (firebase.apps.length === 0){
      firebase.initializeApp(firebaseConfig);
  }


  firebase.firestore().settings({ experimentalForceLongPolling: true });

  
export { firebase };