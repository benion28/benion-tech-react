import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'

// Initialize Firebase
const config = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId
}

const app = initializeApp({
    apiKey: 'AIzaSyCYX9LRwby4lMh2SHYV0Ah-De0JgVxBIqg',
    authDomain: 'benion-database.firebaseapp.com',
    databaseURL: 'https://benion-database.firebaseio.com',
    projectId: 'benion-database',
    storageBucket: 'benion-database.appspot.com',
    messagingSenderId: '391934444954',
    appId: '1:391934444954:web:8c014487b17dcce8b26623',
    measurementId: 'G-9PBZGWNL1W'
})

// Firebase Storage Reference
console.log("Firebase Config", config)
const storage = getStorage(app)
export default storage