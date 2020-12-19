import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyAo5cMwCyGjILEsVpEQK4bECL68EOApJns",
    authDomain: "cryptoapp-4827c.firebaseapp.com",
    databaseURL: "https://cryptoapp-4827c-default-rtdb.firebaseio.com/",
    projectId: "cryptoapp-4827c",
    storageBucket: "cryptoapp-4827c.appspot.com",
    messagingSenderId: "175831497701",
    appId: "1:175831497701:android:bda9a5e93b2d1a1d9a8d0c"
};

firebase.initializeApp(firebaseConfig);

export default firebase;