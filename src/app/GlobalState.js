import React, { createContext, useReducer } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import AppReducer from './AppReducer'
import { initialState, host } from '../services/userHelper'
import * as ACTIONS from '../services/actions'
import * as USERS_STATE from './usersState'
import * as CBT_USERS_STATE from './cbtUsersState'
import * as SMS_USERS_STATE from './smsUsersState'
import * as NEWS_STATE from './newsState'

// Create Context
export const GlobalContext = createContext(initialState)

// Store Component
export const GlobalStore = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState)
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

    const getTokens = () => {
        const tokens = {
            access_token: "",
            refresh_token: ""
        }

        if (state.smsUser.access_token !== null || state.smsUser.refresh_token !== null) {
            tokens.access_token = state.smsUser.access_token
            tokens.refresh_token = state.smsUser.refresh_token
        }

        return tokens
    }

    const access_token = getTokens().access_token
    const refresh_token = getTokens().refresh_token

    const authConfig = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${access_token}`
        }
    }

    //                    -----------------------------  USERS   ---------------------------                //

    // Get Users
    const getUsers = () => {
        USERS_STATE.getUsers(axios, host, ACTIONS, dispatch)
    }

    // User Login
    const userLogin = (user) => {
        USERS_STATE.userLogin(user, axios, host, config, ACTIONS, dispatch, getUsers, getCbtUsers, getCbtExams, getCbtQuestions, getContactMessages, getCryptos, getCryptoNews, getBingNews, getScores, getImages, getPosts, getPayments, getUtmeQuestions, getUtmeExams)
    }

    // User Login Access
    const userLoginAccess = (user) => {
        USERS_STATE.userLoginAccess(user, ACTIONS, dispatch, getUsers, getCbtUsers, getCbtExams, getCbtQuestions, getContactMessages, getCryptos, getCryptoNews, getBingNews, getScores, getImages, getPosts, getPayments)
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
        USERS_STATE.depositForUser(user, axios, host, adminConfig, ACTIONS, dispatch, getPayments)
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

    // Get Payments
    const getPayments = () => {
        USERS_STATE.getPayments(axios, host, ACTIONS, dispatch)
    }

    // Delete Payment
    const deletePayment = (key) => {
        USERS_STATE.deletePayment(key, axios, host, adminConfig, ACTIONS, dispatch, getPayments)
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
        CBT_USERS_STATE.cbtUserLogin(user, axios, host, config, ACTIONS, dispatch, getCbtUsers, getCbtExams, getCbtQuestions, getScores, getUtmeQuestions, getUtmeExams, getPayments)
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

    // Promote Cbt Users
    const promoteCbtUsers = (user) => {
        CBT_USERS_STATE.promoteCbtUsers(user, axios, host, adminConfig, ACTIONS, dispatch, getCbtUsers)
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

    // Get Utme Questions
    const getUtmeQuestions = () => {
        CBT_USERS_STATE.getUtmeQuestions(axios, host, adminConfig, ACTIONS, dispatch)
    }

    // Get Utme Exams
    const getUtmeExams = () => {
        CBT_USERS_STATE.getUtmeExams(axios, host, adminConfig, ACTIONS, dispatch)
    }

    // Add Utme Question
    const addUtmeQuestion = (object) => {
        CBT_USERS_STATE.addUtmeQuestion(object, axios, host, adminConfig, ACTIONS, dispatch, getUtmeExams, getUtmeQuestions)
    }

    // Create Utme Exams
    const createUtmeExam = (values) => {
        CBT_USERS_STATE.createUtmeExam(values, axios, host, adminConfig, ACTIONS, dispatch, getCbtUsers, getUtmeExams)
    }

    // Utme Exam Subject Category
    const utmeExamSubjectCategory = (values) => {
        CBT_USERS_STATE.utmeExamSubjectCategory(values, ACTIONS, dispatch)
    }

    // Delete Utme Exam
    const deleteUtmeExam = (key) => {
        CBT_USERS_STATE.deleteUtmeExam(key, axios, host, adminConfig, ACTIONS, dispatch, getUtmeExams)
    }

    // Delete Utme Question
    const deleteUtmeQuestion = (key) => {
        CBT_USERS_STATE.deleteUtmeQuestion(key, axios, host, adminConfig, ACTIONS, dispatch, getUtmeQuestions)
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

    //                    -----------------------------  SMS USERS   ---------------------------                //
    // Set Error
    const setError = (message) => {
        SMS_USERS_STATE.setError(message, dispatch)
    }

    // Set Message
    const setMessage = (message) => {
        SMS_USERS_STATE.setMessage(message, dispatch)
    }

    // Get Students
    const getStudents = () => {
        SMS_USERS_STATE.getStudents(dispatch, authConfig, setError)
    }

    // Get Parents
    const getParents = () => {
        SMS_USERS_STATE.getParents(dispatch, authConfig, setError)
    }

    // Get Teachers
    const getTeachers = () => {
        SMS_USERS_STATE.getTeachers(dispatch, authConfig, setError)
    }

    // Get Notifications
    const getNotifications = () => {
        SMS_USERS_STATE.getNotifications(dispatch, authConfig, setError)
    }

    // Get Notifications
    const getSmsUsers = () => {
        SMS_USERS_STATE.getSmsUsers(dispatch, authConfig, setError)
    }

    // Get Fees Collections
    const getFeesCollections = () => {
        SMS_USERS_STATE.getFeesCollections(dispatch, authConfig, setError)
    }

    // Get Expenses
    const getExpenses = () => {
        SMS_USERS_STATE.getExpenses(dispatch, authConfig, setError)
    }

    // Get Exam Results
    const getExamResults = () => {
        SMS_USERS_STATE.getExamResults(dispatch, authConfig, setError)
    }

    // Get Hostels
    const getHostels = () => {
        SMS_USERS_STATE.getHostels(dispatch, authConfig, setError)
    }

    // Get Exam Schedules
    const getExamSchedules = () => {
        SMS_USERS_STATE.getExamSchedules(dispatch, authConfig, setError)
    }

    // Get Transports
    const getTransports = () => {
        SMS_USERS_STATE.getTransports(dispatch, authConfig, setError)
    }

    // Get Clients
    const getClients = () => {
        SMS_USERS_STATE.getClients(dispatch, authConfig, setError)
    }

    // Get Attendances
    const getAttendances = () => {
        SMS_USERS_STATE.getAttendances(dispatch, authConfig, setError)
    }

    // User Login
    const smsUserLogin = (user) => {
        SMS_USERS_STATE.smsUserLogin(user, dispatch, config, getStudents, getParents, getTeachers, getNotifications, getSmsUsers, getFeesCollections, getExpenses, getExamResults, getHostels, toast, getTransports, getExamSchedules, getAttendances, getClients)
    }

    // User Logout
    const smsUserLogout = () => {
        const data = { refresh_token }
        SMS_USERS_STATE.smsUserLogout(data, dispatch, authConfig, toast)
    }

    // Decrypt State
    const decryptState = (data) => {
        SMS_USERS_STATE.decryptState(data, dispatch)
    }


    // Register User
    const registerSmsUser = (user) => {
        SMS_USERS_STATE.registerSmsUser(user, authConfig, getUsers, toast)
    }

    // Admit Student
    const admitStudent = (student) => {
        SMS_USERS_STATE.admitStudent(student, authConfig, getStudents, toast)
    }

    // Add Parent
    const addParent = (parent) => {
        SMS_USERS_STATE.addParent(parent, authConfig, getParents, toast)
    }

    // Add Teacher
    const addTeacher = (teacher) => {
        SMS_USERS_STATE.addTeacher(teacher, authConfig, getTeachers, toast)
    }

    // Add Fees Collection
    const addFeesCollection = (item) => {
        SMS_USERS_STATE.addFeesCollection(item, authConfig, getFeesCollections, toast)
    }

    // Add Expense
    const addExpense = (item) => {
        SMS_USERS_STATE.addExpense(item, authConfig, getExpenses, toast)
    }

    // Add Exam Schedule
    const addExamSchedule = (item) => {
        SMS_USERS_STATE.addExamSchedule(item, authConfig, getExamSchedules, toast)
    }

    // Add Exam Result
    const addExamResult = (item) => {
        SMS_USERS_STATE.addExamResult(item, authConfig, getExamResults, toast)
    }

    // Add Attendance
    const addAttendance = (item) => {
        SMS_USERS_STATE.addAttendance(item, authConfig, getAttendances, toast)
    }

    // Add Notification
    const addNotification = (item) => {
        SMS_USERS_STATE.addNotification(item, authConfig, getNotifications, toast)
    }

    // Add Notification
    const sendMail = (item) => {
        SMS_USERS_STATE.sendMail(item, authConfig, toast, setError, setMessage)
    }

    // Add Hostel
    const addHostel = (item) => {
        SMS_USERS_STATE.addHostel(item, authConfig, getHostels, toast)
    }

    // Add Transport
    const addTransport = (item) => {
        SMS_USERS_STATE.addTransport(item, authConfig, getTransports, toast)
    }

    // Add Client
    const addClient = (item) => {
        SMS_USERS_STATE.addClient(item, authConfig, getClients, toast)
    }

    // Forget Password
    const changePassword = (item) => {
        SMS_USERS_STATE.changePassword(item, authConfig, toast)
    }

    // Forget Password
    const forgetPassword = (item) => {
        SMS_USERS_STATE.forgetPassword(item, authConfig, setError, setMessage, toast)
    }

    // Delete User
    const deleteSmsUser = (id) => {
        SMS_USERS_STATE.deleteSmsUser(id, authConfig, getUsers, toast)
    }

    // Delete Student
    const deleteStudent = (id) => {
        SMS_USERS_STATE.deleteStudent(id, authConfig, getStudents, toast)
    }

    // Delete Parent
    const deleteParent = (id) => {
        SMS_USERS_STATE.deleteParent(id, authConfig, getParents, toast)
    }

    // Delete Teacher
    const deleteTeacher = (id) => {
        SMS_USERS_STATE.deleteTeacher(id, authConfig, getTeachers, toast)
    }

    // Delete Fees Collection
    const deleteFeesCollection = (id) => {
        SMS_USERS_STATE.deleteFeesCollection(id, authConfig, getFeesCollections, toast)
    }

    // Delete Expense
    const deleteExpense = (id) => {
        SMS_USERS_STATE.deleteExpense(id, authConfig, getExpenses, toast)
    }

    // Delete Exam Schedule
    const deleteExamSchedule = (id) => {
        SMS_USERS_STATE.deleteExamSchedule(id, authConfig, getExamSchedules, toast)
    }

    // Delete Exam Result
    const deleteExamResult = (id) => {
        SMS_USERS_STATE.deleteExamResult(id, authConfig, getExamResults, toast)
    }

    // Delete Notification
    const deleteNotification = (id) => {
        SMS_USERS_STATE.deleteNotification(id, authConfig, getNotifications, toast)
    }

    // Delete Hostel
    const deleteHostel = (id) => {
        SMS_USERS_STATE.deleteHostel(id, authConfig, getHostels, toast)
    }

    // Delete Transport
    const deleteTransport = (id) => {
        SMS_USERS_STATE.deleteTransport(id, authConfig, getTransports, toast)
    }

    // Delete Client
    const deleteClient = (id) => {
        SMS_USERS_STATE.deleteClient(id, authConfig, getClients, toast)
    }

    // Delete Attendance
    const deleteAttendance = (id) => {
        SMS_USERS_STATE.deleteClient(id, authConfig, getAttendances, toast)
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
            promoteCbtUsers,
            createExam,
            deleteExam,
            getCbtExams,
            getCbtQuestions,
            updateCbtUserPassword,
            examCategory,
            utmeExamSubjectCategory,
            examAnswered,
            addQuestion,
            editQuestion,
            deleteQuestion,
            addScore,
            getScores,
            deleteScore,
            editScore,
            getPayments, 
            deletePayment,
            getCryptos,
            getCryptoNews,
            getBingNews,
            getCrypto,
            getCryptoHistory,
            getUtmeQuestions,
            getUtmeExams,
            addUtmeQuestion,
            createUtmeExam,
            deleteUtmeExam,
            deleteUtmeQuestion,
            smsUserLogin,
            getStudents,
            getParents,
            getTeachers,
            getNotifications,
            getSmsUsers,
            getFeesCollections,
            getExpenses,
            getExamResults,
            getHostels,
            getAttendances,
            smsUserLogout,
            setError,
            setMessage,
            decryptState,
            getExamSchedules,
            getTransports,
            getClients,
            registerSmsUser,
            admitStudent,
            addParent,
            addTeacher,
            addFeesCollection,
            addExpense,
            addExamSchedule,
            addExamResult,
            addNotification,
            addAttendance,
            sendMail,
            addHostel,
            addTransport,
            addClient,
            deleteSmsUser,
            deleteStudent,
            deleteParent,
            deleteTeacher,
            deleteFeesCollection,
            deleteExpense,
            deleteExamSchedule,
            deleteExamResult,
            deleteNotification,
            deleteHostel,
            deleteTransport,
            deleteClient,
            deleteAttendance,
            changePassword,
            forgetPassword
        }}>
            {children}
        </Provider>
    )
}

export default GlobalStore
