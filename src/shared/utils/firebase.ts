import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyADiIqSNbeeuJRkOLGpQcCyFJnJgAyo06Y",
    authDomain: "easysell-9a8b0.firebaseapp.com",
    projectId: "easysell-9a8b0",
    storageBucket: "easysell-9a8b0.appspot.com",
    messagingSenderId: "61891594092",
    appId: "1:61891594092:web:a66d2edd42c315a441d549"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase