import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBh6ViqWfCpwr8DS6BhF8wXKKihOMPxjBU",
    authDomain: "eatr-a209d.firebaseapp.com",
    projectId: "eatr-a209d",
    storageBucket: "eatr-a209d.appspot.com",
    messagingSenderId: "1079155265563",
    appId: "1:1079155265563:web:677bdc91eef23b9ad628be",
    measurementId: "G-NNR0133JPR"
}
const firebase = Firebase.initializeApp(config);

export { firebase };