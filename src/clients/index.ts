import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyD2iDHgTWirGX7RqF7J_xKrgH6imnirl0o",
  authDomain: "shen-6832a.firebaseapp.com",
  projectId: "shen-6832a",
  storageBucket: "shen-6832a.appspot.com",
  messagingSenderId: "649635453029",
  appId: "1:649635453029:web:3abf30d6275cd13e708e8c",
  measurementId: "G-YQLPMRL1WL",
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
