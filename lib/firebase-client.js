import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_APIKEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APPID,
}

// init firebase client
const app = firebase.apps[0] ?? firebase.initializeApp(firebaseConfig)
export const db = app.firestore()

export const appendArray = (el) => firebase.firestore.FieldValue.arrayUnion(el)
export const popArray = (el) => firebase.firestore.FieldValue.arrayRemove(el)

export const createTimestamp = firebase.firestore.FieldValue.serverTimestamp
export const increment = firebase.firestore.FieldValue.increment
