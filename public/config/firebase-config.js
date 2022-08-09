// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.7/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDoNILJ29wDcy-azPb_k4_eIW81w7UGdYk",
  authDomain: "shazer-madro.firebaseapp.com",
  databaseURL: "https://shazer-madro.firebaseio.com",
  projectId: "shazer-madro",
  storageBucket: "shazer-madro.appspot.com",
  messagingSenderId: "515135853608",
  appId: "1:515135853608:web:623a1f4cbcab7f9c21511d",
  measurementId: "G-DEPSG8ZZJ4"
};

export const  app = initializeApp(firebaseConfig);
export const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDoNILJ29wDcy-azPb_k4_eIW81w7UGdYk",
  authDomain: "shazer-madro.firebaseapp.com",
  databaseURL: "https://shazer-madro.firebaseio.com",
  projectId: "shazer-madro",
  storageBucket: "shazer-madro.appspot.com",
  messagingSenderId: "515135853608",
  appId: "1:515135853608:web:623a1f4cbcab7f9c21511d",
  measurementId: "G-DEPSG8ZZJ4"
});

const analytics = getAnalytics(app);