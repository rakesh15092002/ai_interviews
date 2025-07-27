// firebase/clientApp.ts

import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAlsNAAxuxK6ctCmJ_lWBKw1i7p_49ZXyo",
  authDomain: "prepinterview-98fac.firebaseapp.com",
  projectId: "prepinterview-98fac",
  storageBucket: "prepinterview-98fac.appspot.com",
  messagingSenderId: "829826213567",
  appId: "1:829826213567:web:b57027d261656b40f7080a",
  measurementId: "G-HV2BBRNJX0",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
