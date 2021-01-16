import firebase from "firebase/app";
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/functions';
import firebaseConfig from '../config/firebaseConfig'

try {
    firebase.initializeApp(firebaseConfig);
} catch (err) {
    if (!/already exists/.test(err.message)) {
        console.error('Firebase initialization error', err.stack)
    }
}

const isDevevelopment = process.env.DEVELOPMENT || true

// let firestore = firebase.firestore().settings({ host: `http://locahost:8080`, ssl: false })
// let database = firebase.database().settings({ host: `http://locahost:9000`, ssl: false })
// // let storage = firebase.storage()
// let auth = firebase.auth().settings({ host: `http://locahost:9099`, ssl: false })
// let functions = firebase.functions().settings({ host: `http://locahost:5001`, ssl: false })

let firestore = firebase.firestore()
let database = firebase.database()
// let storage = firebase.storage()
let auth = firebase.auth()
let functions = firebase.functions()

// if (isDevevelopment) {
//     firestore.useEmulator('localhost', 8080)
//     database.useEmulator('localhost', 9000)
//     functions.useEmulator('localhost', 5001)
//     auth.useEmulator('http://localhost:9099')
// }

export {
    firestore,
    database,
    // storage,
    auth,
    functions
}