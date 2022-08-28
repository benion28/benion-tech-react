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
})

// Firebase Storage Reference
console.log("Firebase Config", config)
const storage = getStorage(app)
export default storage