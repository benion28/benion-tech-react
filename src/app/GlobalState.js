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
        USERS_STATE.userLogin(user, axios, host, config, ACTIONS, dispatch, getUsers, getCbtUsers)
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
        USERS_STATE.registerUser(user, axios, host, config, ACTIONS, dispatch)
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
        USERS_STATE.addUser(user, axios, host, config, ACTIONS, dispatch)
    }

    //                    -----------------------------  CBT USERS   ---------------------------                //
    
    // Add Cbt User
    const addCbtUser = (user) => {
        CBT_USERS_STATE.addCbtUser(user, axios, host, adminConfig, ACTIONS, dispatch)
    }

     // Register Cbt Student
    const registerCbtUser = (user) => {
        CBT_USERS_STATE.registerCbtUser(user, axios, host, config, ACTIONS, dispatch)
    }
    
    // Get Cbt Users
    const getCbtUsers = () => {
        CBT_USERS_STATE.getCbtUsers(axios, host, ACTIONS, dispatch)
    }

    // Cbt User Login
    const cbtUserLogin = (user) => {
        CBT_USERS_STATE.cbtUserLogin(user, axios, host, config, ACTIONS, dispatch, getCbtUsers)
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
    const cbtUserFind = (user, state) => {
        CBT_USERS_STATE.cbtUserFind(user, state, ACTIONS, dispatch)
    }
    // Cbt User Logout
    const cbtUserLogout = () => {
        CBT_USERS_STATE.cbtUserLogout(axios, host, ACTIONS, dispatch)
    }

    // Update Cbt User
    const updateCbtUser = (user) => {
        CBT_USERS_STATE.updateCbtUser(user, axios, host, adminConfig, ACTIONS, dispatch, getCbtUsers)
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

    return (
        <Provider value={{
            state,
            deleteUser,
            deleteAllUsers,
            registerUser,
            getUsers,
            userLogin,
            userLogout,
            updateUser,
            addUser,
            userForget,
            userContact,
            googleSignIn,
            addCbtUser,
            getCbtUsers,
            registerCbtUser,
            cbtUserLogin,
            deleteCbtUser,
            deleteAllCbtUsers,
            updateCbtUser,
            cbtUserLogout,
            cbtUserFind,
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
