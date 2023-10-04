// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCO9r7xrh05L9vyKP0q2Sszm7Q3eDFzPGs",
  authDomain: "signupandlogin-e23c5.firebaseapp.com",
  projectId: "signupandlogin-e23c5",
  storageBucket: "signupandlogin-e23c5.appspot.com",
  messagingSenderId: "59687585023",
  appId: "1:59687585023:web:ec2dd0ae62e5a3c388f8ca",
  measurementId: "G-MC7P284344"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);