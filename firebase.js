import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyBHTF3LzlZbMUVfrbbhebtqC91snsX-IOM',
  authDomain: 'study-counter-fe6e7.firebaseapp.com',
  projectId: 'study-counter-fe6e7',
  storageBucket: 'study-counter-fe6e7.appspot.com',
  messagingSenderId: '103632367028',
  appId: '1:103632367028:web:cc54242ed0a83d759756e1',
  measurementId: 'G-BFS1XYRESL'
}

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export const firebaseAuth = firebase.auth()
