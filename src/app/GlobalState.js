import React, { createContext, useReducer } from 'react'
import axios from 'axios'
import AppReducer from './AppReducer'
import { initialState, host } from '../services/userHelper'
import * as ACTIONS from '../services/actions'
import * as USERS_STATE from './usersState'
import * as CBT_USERS_STATE from './cbtUsersState'
import * as NEWS_STATE from './newsState'

// Create Context
export const GlobalContext = createContext(initialState)

// Store Component
export const GlobalStore = ({ children }) => {
    const [ state, dispatch ] = useReducer(AppReducer, initialState)
    const token = state.user.token || ''
    const { Provider } = GlobalContext

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const adminConfig = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    }

    //                    -----------------------------  USERS   ---------------------------                //

    // Get Users
    const getUsers = () => {
        USERS_STATE.getUsers(axios, host, ACTIONS, dispatch)
    }

    // User Login
    const userLogin = (user) => {
        USERS_STATE.userLogin(user, axios, host, config, ACTIONS, dispatch, getUsers, getCbtUsers, getCbtExams, getCbtQuestions, getContactMessages, getCryptos, getCryptoNews, getBingNews, getScores, getImages, getPosts)
    }

    // User Login Access
    const userLoginAccess = (user) => {
        USERS_STATE.userLoginAccess(user, ACTIONS, dispatch, getUsers, getCbtUsers, getCbtExams, getCbtQuestions, getContactMessages, getCryptos, getCryptoNews, getBingNews, getScores, getImages, getPosts)
    }

    // Delete User
    const deleteUser = (id) => {
        USERS_STATE.deleteUser(id, axios, host, adminConfig, ACTIONS, dispatch)
    }

    // Delete All User
    const deleteAllUsers = () => {
        USERS_STATE.deleteAllUsers(axios, host, adminConfig, ACTIONS, dispatch)
    }

    // Google User Sign In
    const googleSignIn = () => {
        USERS_STATE.googleSignIn(axios, host, config, ACTIONS, dispatch)
    }


    // Register User
    const registerUser = (user) => {
        USERS_STATE.registerUser(user, axios, host, config, ACTIONS, dispatch, getContactMessages)
    }

    // User Forget
    const userForget = (user) => {
        USERS_STATE.userForget(user, axios, host, config, ACTIONS, dispatch)
    }
    // User Logout
    const userLogout = () => {
        USERS_STATE.userLogout(axios, host, ACTIONS, dispatch)
    }

    // User Contact Us
    const userContact = (user) => {
        USERS_STATE.userContact(user, axios, host, config, ACTIONS, dispatch)
    }

    // Update User
    const updateUser = (user) => {
        USERS_STATE.updateUser(user, axios, host, adminConfig, ACTIONS, dispatch, getUsers)
    }

    // Add User
    const addUser = (user) => {
        USERS_STATE.addUser(user, axios, host, config, ACTIONS, dispatch, getUsers, getContactMessages)
    }

    // Show Alerts
    const showAlert = (value) => {
        USERS_STATE.showAlert(value, ACTIONS, dispatch)
    }

    // Get Contact Messages
    const getContactMessages = () => {
        USERS_STATE.getContactMessages(axios, host, ACTIONS, dispatch)
    }

    // Delete User
    const deleteContactMessage = (key) => {
        USERS_STATE.deleteContactMessage(key, axios, host, adminConfig, ACTIONS, dispatch, getContactMessages)
    }

    // Activate User
    const activateUser = (user) => {
        USERS_STATE.activateUser(user, axios, host, adminConfig, ACTIONS, dispatch)
    }

    // Deposit For User
    const depositForUser = (user) => {
        USERS_STATE.depositForUser(user, axios, host, adminConfig, ACTIONS, dispatch)
    }

    // Change User Password
    const changeUserPassword = (token, user) => {
        USERS_STATE.changeUserPassword(token, user, axios, host, adminConfig, ACTIONS, dispatch)
    }

    // Change User Password
    const updateUserPassword = (user) => {
        USERS_STATE.updateUserPassword(user, axios, host, adminConfig, ACTIONS, dispatch)
    }

    // Get Images
    const getImages = () => {
        USERS_STATE.getImages(axios, host, ACTIONS, dispatch)
    }

    // Add Image
    const addImage = (data) => {
        USERS_STATE.addImage(data, axios, host, adminConfig, ACTIONS, dispatch, getImages)
    }

    // Update Image
    const updateImage = (data) => {
        USERS_STATE.updateImage(data, axios, host, adminConfig, ACTIONS, dispatch, getImages)
    }

    // Delete Image
    const deleteImage = (key) => {
        USERS_STATE.deleteImage(key, axios, host, adminConfig, ACTIONS, dispatch, getImages)
    }
    


    //                    -----------------------------  CBT USERS   ---------------------------                //
    
    // Add Cbt User
    const addCbtUser = (user) => {
        CBT_USERS_STATE.addCbtUser(user, axios, host, adminConfig, ACTIONS, dispatch, getCbtUsers, getContactMessages)
    }

     // Register Cbt Student
    const registerCbtUser = (user) => {
        CBT_USERS_STATE.registerCbtUser(user, axios, host, config, ACTIONS, dispatch, getContactMessages)
    }
    
    // Get Cbt Users
    const getCbtUsers = () => {
        CBT_USERS_STATE.getCbtUsers(axios, host, ACTIONS, dispatch)
    }

    // Cbt User Login
    const cbtUserLogin = (user) => {
        CBT_USERS_STATE.cbtUserLogin(user, axios, host, config, ACTIONS, dispatch, getCbtUsers, getCbtExams, getCbtQuestions, getScores)
    }

    // Delete User
    const deleteCbtUser = (id) => {
        CBT_USERS_STATE.deleteCbtUser(id, axios, host, adminConfig, ACTIONS, dispatch)
    }

    // Delete All User
    const deleteAllCbtUsers = () => {
        CBT_USERS_STATE.deleteAllCbtUsers(axios, host, adminConfig, ACTIONS, dispatch)
    }

    // Find Cbt User
    const findCbtUser = (user) => {
        CBT_USERS_STATE.findCbtUser(user, axios, host, host, ACTIONS, dispatch)
    }

    // Cbt User Logout
    const cbtUserLogout = () => {
        CBT_USERS_STATE.cbtUserLogout(axios, host, ACTIONS, dispatch)
    }

    // Update Cbt User
    const updateCbtUser = (user) => {
        CBT_USERS_STATE.updateCbtUser(user, axios, host, adminConfig, ACTIONS, dispatch, getCbtUsers)
    }

    // Update Cbt Exam
    const updateExam = (key, values) => {
        CBT_USERS_STATE.updateExam(values, key, axios, host, config, ACTIONS, dispatch, getCbtUsers, getCbtExams)
    }

    // Delete Cbt Exam
    const deleteExam = (key) => {
        CBT_USERS_STATE.deleteCbtExam(key, axios, host, adminConfig, ACTIONS, dispatch, getCbtExams)
    }

    // Create Cbt Exam
    const createExam = (values) => {
        CBT_USERS_STATE.createExam(values, axios, host, config, ACTIONS, dispatch, getCbtUsers, getCbtExams)
    }

    // Get Cbt Exams
    const getCbtExams = () => {
        CBT_USERS_STATE.getCbtExams(axios, host, ACTIONS, dispatch)
    }

    // Get Cbt Questions
    const getCbtQuestions = () => {
        CBT_USERS_STATE.getCbtQuestions(axios, host, ACTIONS, dispatch)
    }

    // Exam Category
    const examCategory = (values) => {
        CBT_USERS_STATE.examCategory(values, ACTIONS, dispatch)
    }

    // Exam Answered
    const examAnswered = (values) => {
        CBT_USERS_STATE.examCategory(values, ACTIONS, dispatch)
    }

    // Add Exam Question
    const addQuestion = (object) => {
        CBT_USERS_STATE.addQuestion(object, axios, host, adminConfig, ACTIONS, dispatch, getCbtExams, getCbtQuestions)
    }

    // Edit Exam Question
    const editQuestion = (object, key) => {
        CBT_USERS_STATE.editQuestion(object, key, axios, host, adminConfig, ACTIONS, dispatch, getCbtExams, getCbtQuestions)
    }

    // Delete Question
    const deleteQuestion = (key) => {
        CBT_USERS_STATE.deleteQuestion(key, axios, host, adminConfig, ACTIONS, dispatch, getCbtQuestions)
    }

    // Get Scores
    const getScores = () => {
        CBT_USERS_STATE.getScores(axios, host, ACTIONS, dispatch)
    }

    // Add Score
    const addScore = (object) => {
        CBT_USERS_STATE.addScore(object, axios, host, adminConfig, ACTIONS, dispatch, getScores)
    }

    // Edit Score
    const editScore = (object, key) => {
        CBT_USERS_STATE.editScore(object, key, axios, host, adminConfig, ACTIONS, dispatch, getScores)
    }

    // Delete Score
    const deleteScore = (key) => {
        CBT_USERS_STATE.deleteScore(key, axios, host, adminConfig, ACTIONS, dispatch, getScores)
    }

    // Change Cbt User Password
    const updateCbtUserPassword = (user) => {
        CBT_USERS_STATE.updateCbtUserPassword(user, axios, host, adminConfig, ACTIONS, dispatch)
    }


     //                    -----------------------------  NEWS   ---------------------------                //

     // Get News
    const getCryptos = (details) => {
        NEWS_STATE.getCryptos(details, axios, host, config, ACTIONS, dispatch)
    }

     // Get Crypto News
    const getCryptoNews = (details) => {
        NEWS_STATE.getCryptoNews(details, axios, host, config, ACTIONS, dispatch)
    }

    // Get Bing News
    const getBingNews = (details) => {
        NEWS_STATE.getBingNews(details, axios, host, config, ACTIONS, dispatch)
    }

    // Get Crypto
    const getCrypto = (id) => {
        NEWS_STATE.getCrypto(id, axios, host, config, ACTIONS, dispatch)
    }

    // Get News
    const getCryptoHistory = (details) => {
        NEWS_STATE.getCryptoHistory(details, axios, host, config, ACTIONS, dispatch)
    }

    // Get Posts
    const getPosts = () => {
        NEWS_STATE.getPosts(axios, host, ACTIONS, dispatch)
    }

    // Add Post
    const addPost = (data) => {
        NEWS_STATE.addPost(data, axios, host, adminConfig, ACTIONS, dispatch, getPosts)
    }

    // Update Post
    const updatePost = (data) => {
        NEWS_STATE.updatePost(data, axios, host, adminConfig, ACTIONS, dispatch, getPosts)
    }

    // Delete Post
    const deletePost = (key) => {
        NEWS_STATE.deletePost(key, axios, host, adminConfig, ACTIONS, dispatch, getPosts)
    }

    return (
        <Provider value={{
            state,
            deleteUser,
            deleteAllUsers,
            registerUser,
            getUsers,
            userLogin,
            userLoginAccess,
            userLogout,
            updateUser,
            addUser,
            userForget,
            userContact,
            googleSignIn,
            activateUser,
            depositForUser,
            changeUserPassword,
            updateUserPassword,
            getImages, 
            addImage, 
            updateImage, 
            deleteImage,
            getPosts, 
            addPost, 
            updatePost, 
            deletePost,
            addCbtUser,
            getCbtUsers,
            registerCbtUser,
            cbtUserLogin,
            deleteCbtUser,
            deleteAllCbtUsers,
            updateCbtUser,
            showAlert,
            getContactMessages,
            deleteContactMessage,
            cbtUserLogout,
            findCbtUser,
            updateExam,
            createExam,
            deleteExam,
            getCbtExams,
            getCbtQuestions,
            updateCbtUserPassword,
            examCategory,
            examAnswered,
            addQuestion,
            editQuestion,
            deleteQuestion,
            addScore,
            getScores,
            deleteScore,
            editScore,
            getCryptos,
            getCryptoNews,
            getBingNews,
            getCrypto,
            getCryptoHistory
        }}>
            { children }
        </Provider>
    )
}

export default GlobalStore
