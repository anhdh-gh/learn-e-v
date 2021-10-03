import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

// Khởi tạo kết nối tới project trên firebase console
firebase.initializeApp({
    apiKey: "AIzaSyB4ddjYSiGZZqqKpNxJg0MfpwdNzB4rU10",
    authDomain: "learn-english-vocabulary-f4bfe.firebaseapp.com",
    databaseURL: "https://learn-english-vocabulary-f4bfe-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "learn-english-vocabulary-f4bfe",
    storageBucket: "learn-english-vocabulary-f4bfe.appspot.com",
    messagingSenderId: "861953354086",
    appId: "1:861953354086:web:7b9b45aa20adeb187c00a7",
    measurementId: "G-47XDYW4SYY"
})

export const auth = firebase.auth()
export const realtimeDB = firebase.database() // realtime database

export const userDB = realtimeDB.ref('users')
export const studySetDB = realtimeDB.ref('studysets')

export default firebase