//  export default app
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAoO6om-vGH9GUEVsUjYlzhKpgOy4L8LKQ",
    authDomain: "cars-doctor-afb56.firebaseapp.com",
    projectId: "cars-doctor-afb56",
    storageBucket: "cars-doctor-afb56.appspot.com",
    messagingSenderId: "406128661858",
    appId: "1:406128661858:web:ad07dfd4b3c8a6697b083b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;