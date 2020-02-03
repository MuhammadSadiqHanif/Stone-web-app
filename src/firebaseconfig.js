import * as firebase from 'firebase'
var firebaseConfig = {
  apiKey: "AIzaSyAH9F2UJc0UVS6tq3WCSR5BakHvrYDjKFc",
  authDomain: "stonewebapp.firebaseapp.com",
  databaseURL: "https://stonewebapp.firebaseio.com",
  projectId: "stonewebapp",
  storageBucket: "",
  messagingSenderId: "462020762481",
  appId: "1:462020762481:web:c56203a205bed002"
};  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
export var db = firebase.database();
export var auth = firebase.auth()