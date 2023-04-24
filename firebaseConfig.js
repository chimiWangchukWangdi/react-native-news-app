import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBqpKFVqysp6uMVvwN43FNxyTxXx8MqGwE",
    authDomain: "react-native-news-app-7cc1e.firebaseapp.com",
    projectId: "react-native-news-app-7cc1e",
    storageBucket: "react-native-news-app-7cc1e.appspot.com",
    messagingSenderId: "367988516952",
    appId: "1:367988516952:web:3ff2f10bf8c566505a022d"
};

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
