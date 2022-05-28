export const getUsers = (axios, host, ACTIONS, dispatch) => {
    axios({
        url: '/benion-users/api/users',
        method: 'get',
        baseURL: host
    }).then(response => {
        dispatch({
            type: ACTIONS.getUsers,
            payload: response.data.data.allUsers
        })
        dispatch({
            type: ACTIONS.usersError,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersMessage,
            payload: response.data.message
        })
    }).catch(error => {
        console.log(error)
        dispatch({
            type: ACTIONS.usersMessage,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersError,
            payload: `Get Users Error (${error.message})`
        })
    })
}

export const userLogin = (user, axios, host, config, ACTIONS, dispatch, getUsers, getCbtUsers) => {
    axios({
        url: '/benion-users/api/login',
        method: 'post',
        baseURL: host,
        headers: config.headers,
        data: user
    }).then(response => {
        dispatch({
            type: ACTIONS.userLogIn,
            payload: response.data.data
        })
        dispatch({
            type: ACTIONS.usersError,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersMessage,
            payload: response.data.message
        })
        if (response.data.data.role === "admin") {
            getUsers()
            getCbtUsers()
        } else {
            dispatch({
                type: ACTIONS.getUsers,
                payload: []
            })
            dispatch({
                type: ACTIONS.getCbtUser,
                payload: []
            })
        }
    }).catch(error => {
        console.log(error)
        dispatch({
            type: ACTIONS.usersMessage,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersError,
            payload: `User Login Error (${error.message})`
        })
    })
}

export const deleteUser = (id, axios, host, adminConfig, ACTIONS, dispatch) => {
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
            type: ACTIONS.usersError,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersMessage,
            payload: response.data.message
        })
    }).catch(error => {
        console.log(error)
        dispatch({
            type: ACTIONS.usersMessage,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersError,
            payload: `Delete User Error (${error.message})`
        })
    })
}

export const deleteAllUsers = (axios, host, adminConfig, ACTIONS, dispatch) => {
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
            type: ACTIONS.usersError,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersMessage,
            payload: response.data.message
        })
    }).catch(error => {
        console.log(error)
        dispatch({
            type: ACTIONS.usersMessage,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersError,
            payload: `Delete Users Error (${error.message})`
        })
    })
}

export const googleSignIn = (axios, host, config, ACTIONS, dispatch) => {
    axios({
        url: '/auth/api/google-login',
        method: 'get',
        baseURL: host,
        headers: config.headers
    }).then(response => {
        console.log(response)
        dispatch({
            type: ACTIONS.usersError,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersMessage,
            payload: "Google Auth Requested"
        })
    }).catch(error => {
        console.log(error)
        dispatch({
            type: ACTIONS.usersMessage,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersError,
            payload: `Google Auth Error (${error.message})`
        })
    })
}

export const registerUser = (user, axios, host, config, ACTIONS, dispatch) => {
    axios({
        url: process.env.USER_ACTIVATE_EMAIL ? '/benion-users/api/register-activate' : '/benion-users/api/register',
        method: 'post',
        baseURL: host,
        headers: config.headers,
        data: user
    }).then(response => {
        console.log(response)
        dispatch({
            type: ACTIONS.usersError,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersMessage,
            payload: response.data.message
        })
    }).catch(error => {
        console.log(error)
        dispatch({
            type: ACTIONS.usersMessage,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersError,
            payload: `Register User Error (${error.message})`
        })
    })
}

export const userForget = (user, axios, host, config, ACTIONS, dispatch) => {
    axios({
        url: '/benion-users/api/forget-password',
        method: 'put',
        baseURL: host,
        headers: config.headers,
        data: user
    }).then(response => {
        console.log(response)
        dispatch({
            type: ACTIONS.usersError,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersMessage,
            payload: response.data.message
        })
    }).catch(error => {
        console.log(error)
        dispatch({
            type: ACTIONS.usersMessage,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersError,
            payload: `Forget User Error (${error.message})`
        })
    })
}

export const userLogout = (axios, host, ACTIONS, dispatch) => {
    axios({
        url: '/benion-users/api/logout',
        method: 'get',
        baseURL: host
    }).then(response => {
        dispatch({
            type: ACTIONS.userLogOut
        })
        dispatch({
            type: ACTIONS.usersError,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersMessage,
            payload: response.data.message
        })
    }).catch(error => {
        console.log(error)
        dispatch({
            type: ACTIONS.usersMessage,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersError,
            payload: `User Logout Error (${error.message})`
        })
    })
}

export const userContact = (user, axios, host, config, ACTIONS, dispatch) => {
    axios({
        url: '/benion-users/api/contact-us',
        method: 'post',
        baseURL: host,
        headers: config.headers,
        data: user
    }).then(response => {
        console.log(response)
        dispatch({
            type: ACTIONS.usersError,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersMessage,
            payload: response.data.message
        })
    }).catch(error => {
        console.log(error)
        dispatch({
            type: ACTIONS.usersMessage,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersError,
            payload: `User Contact Error (${error.message})`
        })
    })
}

export const updateUser = (user, axios, host, adminConfig, ACTIONS, dispatch) => {
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
            type: ACTIONS.usersError,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersMessage,
            payload: response.data.message
        })
    }).catch(error => {
        console.log(error)
        dispatch({
            type: ACTIONS.usersMessage,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersError,
            payload: `Update User Error (${error.message})`
        })
    })
}

export const addUser = (user, axios, host, config, ACTIONS, dispatch) => {
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
            type: ACTIONS.usersError,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersMessage,
            payload: response.data.message
        })
    }).catch(error => {
        console.log(error)
        dispatch({
            type: ACTIONS.usersMessage,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersError,
            payload: `Add User Error (${error.message})`
        })
    })
}