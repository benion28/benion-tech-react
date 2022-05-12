import React, { createContext, useReducer } from 'react'
import axios from 'axios'
import reducer from './reducer'
import { initialState, host } from '../services/userHelper'
import * as ACTIONS from '../services/actions'

// Create Context
export const GlobalContext = createContext(initialState)

// Store Component
export const GlobalStore = ({ children }) => {
    const [ state, dispatch ] = useReducer(reducer, initialState)
    const token = state.user.token
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

    // Get Users
    const getUsers = () => {
        axios({
            url: '/benion-users/api/users',
            method: 'get',
            baseURL: host
        }).then(response => {
            console.log(response)
            dispatch({
                type: ACTIONS.getUsers,
                payload: response.data.data.allUsers
            })
        }).catch(error => {
            console.log(error)
            dispatch({
                type: ACTIONS.usersError,
                payload: error.response.data.error
            })
        })
    }

    // User Login
    const userLogin = (user) => {
        axios({
            url: '/benion-users/api/login',
            method: 'post',
            baseURL: host,
            headers: config.headers,
            data: user
        }).then(response => {
            console.log(response)
            dispatch({
                type: ACTIONS.userLogIn,
                payload: response.data.data
            })
            dispatch({
                type: ACTIONS.usersMessage,
                payload: response.data.message
            })
        }).catch(error => {
            console.log(error)
            dispatch({
                type: ACTIONS.usersError,
                payload: error.response.data.error
            })
        })
    }

    // Delete User
    const deleteUser = (id) => {
        axios({
            url: `/benion-users/api/delete-user/${ id }`,
            method: 'delete',
            baseURL: host,
            headers: adminConfig.headers
        }).then(response => {
            console.log(response)
            dispatch({
                type: ACTIONS.deleteUser,
                payload: id
            })
            dispatch({
                type: ACTIONS.usersMessage,
                payload: response.data.message
            })
        }).catch(error => {
            console.log(error)
            dispatch({
                type: ACTIONS.usersError,
                payload: error.response.data.error
            })
        })
    }

    // Delete All User
    const deleteAllUsers = () => {
        axios({
            url: '/benion-users/api/delete-all-users',
            method: 'delete',
            baseURL: host,
            headers: adminConfig.headers
        }).then(response => {
            console.log(response)
            dispatch({
                type: ACTIONS.deleteAllUsers,
                payload: []
            })
            dispatch({
                type: ACTIONS.usersMessage,
                payload: response.data.message
            })
        }).catch(error => {
            console.log(error)
            dispatch({
                type: ACTIONS.usersError,
                payload: error.response.data.error
            })
        })
    }

    // Register User
    const registerUser = (user) => {
        axios({
            url: '/benion-users/api/register',
            method: 'post',
            baseURL: host,
            headers: config.headers,
            data: user
        }).then(response => {
            console.log(response)
            dispatch({
                type: ACTIONS.usersMessage,
                payload: response.data.message
            })
        }).catch(error => {
            console.log(error)
            dispatch({
                type: ACTIONS.usersError,
                payload: error.response.data.error
            })
        })
    }

    // Update User
    const updateUser = (user) => {
        const id = user._id
        axios({
            url: `/benion-users/api/edit-user/${id}`,
            method: 'put',
            baseURL: host,
            headers: adminConfig.headers,
            data: user
        }).then(response => {
            console.log(response)
            dispatch({
                type: ACTIONS.updateUser,
                payload: {
                    id,
                    data: response.data.data
                }
            })
            dispatch({
                type: ACTIONS.usersMessage,
                payload: response.data.message
            })
        }).catch(error => {
            console.log(error)
            dispatch({
                type: ACTIONS.usersError,
                payload: error.response.data.error
            })
        })
    }

    // Add User
    const addUser = (user) => {
        axios({
            url: '/benion-users/api/add-user',
            method: 'post',
            baseURL: host,
            headers: config.headers,
            data: user
        }).then(response => {
            console.log(response)
            dispatch({
                type: ACTIONS.addUser,
                payload: response.data.data
            })
            dispatch({
                type: ACTIONS.usersMessage,
                payload: response.data.message
            })
        }).catch(error => {
            console.log(error)
            dispatch({
                type: ACTIONS.usersError,
                payload: error.response.data.error
            })
        })
    }

    return (
        <Provider value={{
            allUsers: state.users.allUsers,
            guestUsers: state.users.guestUsers,
            adminUsers: state.users.adminUsers,
            user: state.user,
            loading: state.loading,
            error: state.error,
            message: state.error,
            deleteUser,
            deleteAllUsers,
            registerUser,
            getUsers,
            userLogin,
            updateUser,
            addUser
        }}>
            { children }
        </Provider>
    )
}

export default GlobalStore
