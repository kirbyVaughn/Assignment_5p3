import firebase from "firebase/app"
import "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyANeWVhoLGWTCNBei_ywOX4-Eb0_P7-nos",
  authDomain: "mav-progressive.firebaseapp.com",
  projectId: "mav-progressive",
  storageBucket: "mav-progressive.appspot.com",
  messagingSenderId: "774711441633",
  appId: "1:774711441633:web:db36d83830b0444228dfa0"
}
let firebaseApp = firebase.initializeApp(firebaseConfig)
let db = firebaseApp.firestore()

export { db }
