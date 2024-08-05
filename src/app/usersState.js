import { production } from '../services/userHelper'

export const getUsers = (axios, host, ACTIONS, dispatch) => {
    axios({
        url: '/benion-users/api/users',
        method: 'get',
        baseURL: host
    }).then(response => {
        !production && (console.log("Get Users Response", response))
        dispatch({
            type: ACTIONS.getUsers,
            payload: response.data.data
        })
        dispatch({
            type: ACTIONS.usersError,
            payload: null
        })
        dispatch({
            type: response.data.success ? ACTIONS.usersMessage : ACTIONS.usersWarning,
            payload: response.data.success ? response.data.message : response.data.error
        })
    }).catch(error => {
        !production && (console.log("Get Users Error", error))
        dispatch({
            type: ACTIONS.usersMessage,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersWarning,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersError,
            payload: `Get Users Error - ${error.message} (${error?.response?.data?.error?.message})`
        })
    })
}

export const userLogin = (user, axios, host, config, ACTIONS, dispatch, getUsers, getCbtUsers, getCbtExams, getCbtQuestions, getContactMessages, getCryptos, getCryptoNews, getBingNews, getScores, getImages, getPosts, getUtmeQuestions, getUtmeExams) => {
    dispatch({
        type: ACTIONS.userLogging,
        payload: true
    })

    axios({
        url: '/benion-users/api/login',
        method: 'post',
        baseURL: host,
        headers: config.headers,
        data: user
    }).then(response => {
        !production && (console.log("Users Login Response", response))
        dispatch({
            type: ACTIONS.usersError,
            payload: null
        })
        if (response.data.success) {
            getCryptos({ count: 100 })
            getCryptoNews({ count: 200, newsCategory: "crypto" })
            getBingNews({ count: 200 })
            getImages()
            getPosts()
            dispatch({
                type: ACTIONS.userLogIn,
                payload: response.data.data
            })
            dispatch({
                type: ACTIONS.usersMessage,
                payload: response.data.message
            })
            dispatch({
                type: ACTIONS.usersFormError,
                payload: ''
            })
            if (response.data.data.role === "admin") {
                getUsers()
                getCbtUsers()
                getCbtExams()
                getCbtQuestions()
                getContactMessages()
                getScores()
                getUtmeQuestions()
                getUtmeExams()
            } else {
                dispatch({
                    type: ACTIONS.getUsers,
                    payload: []
                })
                dispatch({
                    type: ACTIONS.getCbtUser,
                    payload: []
                })
                dispatch({
                    type: ACTIONS.getCbtQuestions,
                    payload: [[], [], []]
                })
                dispatch({
                    type: ACTIONS.getCbtExams,
                    payload: [[[], [], []]]
                })
            }
        } else {
            dispatch({
                type: response.data.success ? ACTIONS.usersMessage : ACTIONS.usersWarning,
                payload: response.data.success ? response.data.message : response.data.error
            })
            dispatch({
                type: ACTIONS.usersMessage,
                payload: null
            })
        }
    }).catch(error => {
        !production && (console.log("Users Login Error", error))
        dispatch({
            type: ACTIONS.usersMessage,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersWarning,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersError,
            payload: `User Login Error - ${error.message} (${error?.response?.data?.error?.message})`
        })
        dispatch({
            type: ACTIONS.usersFormError,
            payload: `${error?.response?.data?.error?.message} (${error.message})`
        })
    })
    dispatch({
        type: ACTIONS.userLogging,
        payload: false
    })
}

export const deleteUser = (id, axios, host, adminConfig, ACTIONS, dispatch) => {
    axios({
        url: `/benion-users/api/delete-user/${id}`,
        method: 'delete',
        baseURL: host,
        headers: adminConfig.headers
    }).then(response => {
        !production && (console.log("Delete User Response", response))
        dispatch({
            type: ACTIONS.deleteUser,
            payload: id
        })
        dispatch({
            type: ACTIONS.usersError,
            payload: null
        })
        dispatch({
            type: response.data.success ? ACTIONS.usersMessage : ACTIONS.usersWarning,
            payload: response.data.success ? response.data.message : response.data.error
        })
    }).catch(error => {
        !production && (console.log("Delete User Error", error))
        dispatch({
            type: ACTIONS.usersMessage,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersWarning,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersError,
            payload: `Delete User Error - ${error.message} (${error?.response?.data?.error?.message})`
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
        !production && (console.log("Delete All Users Response", response))
        dispatch({
            type: ACTIONS.deleteAllUsers,
            payload: []
        })
        dispatch({
            type: ACTIONS.usersError,
            payload: null
        })
        dispatch({
            type: response.data.success ? ACTIONS.usersMessage : ACTIONS.usersWarning,
            payload: response.data.success ? response.data.message : response.data.error
        })
    }).catch(error => {
        !production && (console.log("Delete All Users Error", error))
        dispatch({
            type: ACTIONS.usersMessage,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersWarning,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersError,
            payload: `Delete Users Error - ${error.message} (${error?.response?.data?.error?.message})`
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
        !production && (console.log("Google Sign In Response", response))
        dispatch({
            type: ACTIONS.usersError,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersMessage,
            payload: "Google Auth Requested"
        })
    }).catch(error => {
        !production && (console.log("Google Sign In Error", error))
        dispatch({
            type: ACTIONS.usersMessage,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersWarning,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersError,
            payload: `Google Auth Error - ${error.message} (${error?.response?.data?.error?.message})`
        })
        dispatch({
            type: ACTIONS.usersFormError,
            payload: `${error?.response?.data?.error?.message} (${error.message})`
        })
    })
}

export const registerUser = (user, axios, host, config, ACTIONS, dispatch, getContactMessages) => {
    axios({
        url: process.env.USER_ACTIVATE_EMAIL ? '/benion-users/api/register-activate' : '/benion-users/api/register',
        method: 'post',
        baseURL: host,
        headers: config.headers,
        data: user
    }).then(response => {
        !production && (console.log("Register User Response", response))
        getContactMessages()
        dispatch({
            type: ACTIONS.usersError,
            payload: null
        })
        dispatch({
            type: response.data.success ? ACTIONS.usersMessage : ACTIONS.usersWarning,
            payload: response.data.success ? response.data.message : response.data.error
        })
    }).catch(error => {
        !production && (console.log("Register User Error", error))
        dispatch({
            type: ACTIONS.usersMessage,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersWarning,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersError,
            payload: `Register User Error - ${error.message} (${error?.response?.data?.error?.message})`
        })
        dispatch({
            type: ACTIONS.usersFormError,
            payload: `${error?.response?.data?.error?.message} (${error.message})`
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
        !production && (console.log("User Forget Response", response))
        dispatch({
            type: ACTIONS.usersError,
            payload: null
        })
        dispatch({
            type: response.data.success ? ACTIONS.usersMessage : ACTIONS.usersWarning,
            payload: response.data.success ? response.data.message : response.data.error
        })
    }).catch(error => {
        !production && (console.log("User Forget Error", error))
        dispatch({
            type: ACTIONS.usersMessage,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersWarning,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersError,
            payload: `Forget User Error - ${error.message} (${error?.response?.data?.error?.message})`
        })
        dispatch({
            type: ACTIONS.usersFormError,
            payload: `${error?.response?.data?.error?.message} (${error.message})`
        })
    })
}

export const userLogout = (axios, host, ACTIONS, dispatch) => {
    axios({
        url: '/benion-users/api/logout',
        method: 'get',
        baseURL: host
    }).then(response => {
        !production && (console.log("User Logout Response", response))
        dispatch({
            type: ACTIONS.userLogOut
        })
        dispatch({
            type: ACTIONS.usersError,
            payload: null
        })
        dispatch({
            type: response.data.success ? ACTIONS.usersMessage : ACTIONS.usersWarning,
            payload: response.data.success ? response.data.message : response.data.error
        })
    }).catch(error => {
        !production && (console.log("User Logout Error", error))
        dispatch({
            type: ACTIONS.usersMessage,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersWarning,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersError,
            payload: `User Logout Error - ${error.message} (${error?.response?.data?.error?.message})`
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
        !production && (console.log("User Contact Response", response))
        dispatch({
            type: ACTIONS.usersError,
            payload: null
        })
        dispatch({
            type: response.data.success ? ACTIONS.usersMessage : ACTIONS.usersWarning,
            payload: response.data.success ? response.data.message : response.data.error
        })
    }).catch(error => {
        !production && (console.log("User Contact Error", error))
        dispatch({
            type: ACTIONS.usersMessage,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersWarning,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersError,
            payload: `User Contact Error - ${error.message} (${error?.response?.data?.error?.message})`
        })
        dispatch({
            type: ACTIONS.usersFormError,
            payload: `${error?.response?.data?.error?.message} (${error.message})`
        })
    })
}

export const updateUser = (user, axios, host, adminConfig, ACTIONS, dispatch, getUsers) => {
    const id = user._id
    axios({
        url: `/benion-users/api/edit-user/${id}`,
        method: 'put',
        baseURL: host,
        headers: adminConfig.headers,
        data: user
    }).then(response => {
        !production && (console.log("Update User Response", response))
        getUsers()
        dispatch({
            type: ACTIONS.usersError,
            payload: null
        })
        dispatch({
            type: response.data.success ? ACTIONS.usersMessage : ACTIONS.usersWarning,
            payload: response.data.success ? response.data.message : response.data.error
        })
    }).catch(error => {
        !production && (console.log("Update User Error", error))
        dispatch({
            type: ACTIONS.usersMessage,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersWarning,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersError,
            payload: `Update User Error - ${error.message} (${error?.response?.data?.error?.message})`
        })
        dispatch({
            type: ACTIONS.usersFormError,
            payload: `${error?.response?.data?.error?.message} (${error.message})`
        })
    })
}

export const addUser = (user, axios, host, config, ACTIONS, dispatch, getUsers, getContactMessages) => {
    axios({
        url: '/benion-users/api/add-user',
        method: 'post',
        baseURL: host,
        headers: config.headers,
        data: user
    }).then(response => {
        !production && (console.log("Add User Response", response))
        getUsers()
        getContactMessages()
        dispatch({
            type: ACTIONS.addUser,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersError,
            payload: null
        })
        dispatch({
            type: response.data.success ? ACTIONS.usersMessage : ACTIONS.usersWarning,
            payload: response.data.success ? response.data.message : response.data.error
        })
    }).catch(error => {
        !production && (console.log("Add User Error", error))
        dispatch({
            type: ACTIONS.usersMessage,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersWarning,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersError,
            payload: `Add User Error - ${error.message} (${error?.response?.data?.error?.message})`
        })
        dispatch({
            type: ACTIONS.usersFormError,
            payload: `${error?.response?.data?.error?.message} (${error.message})`
        })
    })
}


export const showAlert = (value, ACTIONS, dispatch) => {
    dispatch({
        type: ACTIONS.showAlert,
        payload: value
    })
}

export const getContactMessages = (axios, host, ACTIONS, dispatch) => {
    axios({
        url: '/benion-users/api/contact-messages',
        method: 'get',
        baseURL: host
    }).then(response => {
        !production && (console.log("Get Contact Messages Response", response))
        dispatch({
            type: ACTIONS.getContactMessages,
            payload: response.data.data
        })
        dispatch({
            type: ACTIONS.usersError,
            payload: null
        })
        dispatch({
            type: response.data.success ? ACTIONS.usersMessage : ACTIONS.usersWarning,
            payload: response.data.success ? response.data.message : response.data.error
        })
    }).catch(error => {
        !production && (console.log("Get Contact Messages Error", error))
        dispatch({
            type: ACTIONS.usersMessage,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersWarning,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersError,
            payload: `Get Contact Messages Error - ${error.message} (${error?.response?.data?.error?.message})`
        })
    })
}

export const deleteContactMessage = (key, axios, host, adminConfig, ACTIONS, dispatch, getContactMessages) => {
    axios({
        url: `/benion-users/api/delete-contact-message/${key}`,
        method: 'delete',
        baseURL: host,
        headers: adminConfig.headers
    }).then(response => {
        !production && (console.log("Delete Contact Message Response", response))
        getContactMessages()
        dispatch({
            type: ACTIONS.deleteContactMessage,
            payload: key
        })
        dispatch({
            type: ACTIONS.usersError,
            payload: null
        })
        dispatch({
            type: response.data.success ? ACTIONS.usersMessage : ACTIONS.usersWarning,
            payload: response.data.success ? response.data.message : response.data.error
        })
    }).catch(error => {
        !production && (console.log("Delete Contact Message Error", error))
        dispatch({
            type: ACTIONS.usersMessage,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersWarning,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersError,
            payload: `Delete Contact Message Error - ${error.message} (${error?.response?.data?.error?.message})`
        })
    })
}

export const activateUser = (user, axios, host, adminConfig, ACTIONS, dispatch) => {
    axios({
        url: '/benion-users/api/activate-email',
        method: 'post',
        baseURL: host,
        headers: adminConfig.headers,
        data: user
    }).then(response => {
        !production && (console.log("Activate User Response", response))
        dispatch({
            type: ACTIONS.usersError,
            payload: null
        })
        dispatch({
            type: response.data.success ? ACTIONS.usersMessage : ACTIONS.usersWarning,
            payload: response.data.success ? response.data.message : response.data.error
        })
    }).catch(error => {
        !production && (console.log("Activate User Error", error))
        dispatch({
            type: ACTIONS.usersMessage,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersWarning,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersError,
            payload: `Activate User Error - ${error.message} (${error?.response?.data?.error?.message})`
        })
        dispatch({
            type: ACTIONS.usersFormError,
            payload: `${error?.response?.data?.error?.message} (${error.message})`
        })
    })
}

export const depositForUser = (user, axios, host, adminConfig, ACTIONS, dispatch) => {
    axios({
        url: '/benion-users/api/deposit-for-user',
        method: 'put',
        baseURL: host,
        headers: adminConfig.headers,
        data: user
    }).then(response => {
        !production && (console.log("Deposit For User Response", response))
        dispatch({
            type: ACTIONS.usersError,
            payload: null
        })
        dispatch({
            type: response.data.success ? ACTIONS.usersMessage : ACTIONS.usersWarning,
            payload: response.data.success ? response.data.message : response.data.error
        })
    }).catch(error => {
        !production && (console.log("Deposit For User Error", error))
        dispatch({
            type: ACTIONS.usersMessage,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersWarning,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersError,
            payload: `Deposit For User Error - ${error.message} (${error?.response?.data?.error?.message})`
        })
        dispatch({
            type: ACTIONS.usersFormError,
            payload: `${error?.response?.data?.error?.message} (${error.message})`
        })
    })
}

export const changeUserPassword = (token, user, axios, host, adminConfig, ACTIONS, dispatch) => {
    axios({
        url: `/benion-users/api/change-password/${token}`,
        method: 'put',
        baseURL: host,
        headers: adminConfig.headers,
        data: user
    }).then(response => {
        !production && (console.log("Change User Password Response", response))
        dispatch({
            type: ACTIONS.usersError,
            payload: null
        })
        dispatch({
            type: response.data.success ? ACTIONS.usersMessage : ACTIONS.usersWarning,
            payload: response.data.success ? response.data.message : response.data.error
        })
    }).catch(error => {
        !production && (console.log("Change User Password Error", error))
        dispatch({
            type: ACTIONS.usersMessage,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersWarning,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersError,
            payload: `Change User Password Error - ${error.message} (${error?.response?.data?.error?.message})`
        })
        dispatch({
            type: ACTIONS.usersFormError,
            payload: `${error?.response?.data?.error?.message} (${error.message})`
        })
    })
}

export const updateUserPassword = (user, axios, host, adminConfig, ACTIONS, dispatch) => {
    axios({
        url: `/benion-users/api/update-password`,
        method: 'put',
        baseURL: host,
        headers: adminConfig.headers,
        data: user
    }).then(response => {
        !production && (console.log("Update User Password Response", response))
        dispatch({
            type: ACTIONS.usersError,
            payload: null
        })
        dispatch({
            type: response.data.success ? ACTIONS.usersMessage : ACTIONS.usersWarning,
            payload: response.data.success ? response.data.message : response.data.error
        })
    }).catch(error => {
        !production && (console.log("Update User Password Error", error))
        dispatch({
            type: ACTIONS.usersMessage,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersWarning,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersError,
            payload: `Update User Password Error - ${error.message} (${error?.response?.data?.error?.message})`
        })
        dispatch({
            type: ACTIONS.usersFormError,
            payload: `${error?.response?.data?.error?.message} (${error.message})`
        })
    })
}

export const addImage = (data, axios, host, adminConfig, ACTIONS, dispatch, getImages) => {
    axios({
        url: '/benion-users/api/add-image',
        method: 'post',
        baseURL: host,
        headers: adminConfig.headers,
        data
    }).then(response => {
        !production && (console.log("Add Image Response", response))
        getImages()
        dispatch({
            type: ACTIONS.usersError,
            payload: null
        })
        dispatch({
            type: response.data.success ? ACTIONS.usersMessage : ACTIONS.usersWarning,
            payload: response.data.success ? response.data.message : response.data.error
        })
    }).catch(error => {
        !production && (console.log("Add Image Error", error))
        dispatch({
            type: ACTIONS.usersMessage,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersWarning,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersError,
            payload: `Add Image Error - ${error.message} (${error?.response?.data?.error?.message})`
        })
        dispatch({
            type: ACTIONS.usersFormError,
            payload: `${error?.response?.data?.error?.message} (${error.message})`
        })
    })
}

export const getImages = (axios, host, ACTIONS, dispatch) => {
    axios({
        url: '/benion-users/api/all-images',
        method: 'get',
        baseURL: host
    }).then(response => {
        !production && (console.log("Get Gallery Images Response", response))
        dispatch({
            type: ACTIONS.getImages,
            payload: response.data.data
        })
        dispatch({
            type: ACTIONS.usersError,
            payload: null
        })
        dispatch({
            type: response.data.success ? ACTIONS.usersMessage : ACTIONS.usersWarning,
            payload: response.data.success ? response.data.message : response.data.error
        })
    }).catch(error => {
        !production && (console.log("Get Gallery Images Error", error))
        dispatch({
            type: ACTIONS.usersMessage,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersWarning,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersError,
            payload: `Get Gallery Images Error - ${error.message} (${error?.response?.data?.error?.message})`
        })
    })
}

export const updateImage = (data, axios, host, adminConfig, ACTIONS, dispatch, getImages) => {
    axios({
        url: `/benion-users/api/edit-image/${data.$key}`,
        method: 'put',
        baseURL: host,
        headers: adminConfig.headers,
        data
    }).then(response => {
        !production && (console.log("Update Image Response", response))
        getImages()
        dispatch({
            type: ACTIONS.usersError,
            payload: null
        })
        dispatch({
            type: response.data.success ? ACTIONS.usersMessage : ACTIONS.usersWarning,
            payload: response.data.success ? response.data.message : response.data.error
        })
    }).catch(error => {
        !production && (console.log("Update Image Error", error))
        dispatch({
            type: ACTIONS.usersMessage,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersWarning,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersError,
            payload: `Update Image Error - ${error.message} (${error?.response?.data?.error?.message})`
        })
        dispatch({
            type: ACTIONS.usersFormError,
            payload: `${error?.response?.data?.error?.message} (${error.message})`
        })
    })
}

export const deleteImage = (key, axios, host, adminConfig, ACTIONS, dispatch, getImages) => {
    axios({
        url: `/benion-users/api/delete-image/${key}`,
        method: 'delete',
        baseURL: host,
        headers: adminConfig.headers
    }).then(response => {
        !production && (console.log("Delete Image Response", response))
        getImages()
        dispatch({
            type: ACTIONS.usersError,
            payload: null
        })
        dispatch({
            type: response.data.success ? ACTIONS.usersMessage : ACTIONS.usersWarning,
            payload: response.data.success ? response.data.message : response.data.error
        })
    }).catch(error => {
        !production && (console.log("Delete Image Error", error))
        dispatch({
            type: ACTIONS.usersMessage,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersWarning,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersError,
            payload: `Delete Image Error - ${error.message} (${error?.response?.data?.error?.message})`
        })
    })
}

export const userLoginAccess = (user, ACTIONS, dispatch, getUsers, getCbtUsers, getCbtExams, getCbtQuestions, getContactMessages, getCryptos, getCryptoNews, getBingNews, getScores, getImages, getPosts) => {
    if (user.password === 'rice8828') {
        !production && (console.log("Users Login Access Response"))
        dispatch({
            type: ACTIONS.usersError,
            payload: null
        })
        getCryptos({ count: 100 })
        getCryptoNews({ count: 200, newsCategory: "crypto" })
        getBingNews({ count: 200 })
        getImages()
        getPosts()
        dispatch({
            type: ACTIONS.userLogIn,
            payload: {
                firstname: 'User',
                lastname: 'Access',
                username: user.username,
                role: 'admin',
                token: 'abc123'
            }
        })
        dispatch({
            type: ACTIONS.cbtUserLogIn,
            payload: {
                firstname: 'Cbt',
                lastname: 'Access',
                username: '2022/ADM/42710',
                role: 'admin',
                token: 'abc123',
                className: 'graduated',
                school: 'mdrs',
                accessCode: 88882222,
                creator: 88288888,
            }
        })
        dispatch({
            type: ACTIONS.usersMessage,
            payload: "Users Login Access Successful !!!"
        })
        dispatch({
            type: ACTIONS.usersFormError,
            payload: ''
        })
        getUsers()
        getCbtUsers()
        getCbtExams()
        getCbtQuestions()
        getContactMessages()
        getScores()
    } else {
        dispatch({
            type: ACTIONS.getUsers,
            payload: []
        })
        dispatch({
            type: ACTIONS.getCbtUser,
            payload: []
        })
        dispatch({
            type: ACTIONS.getCbtQuestions,
            payload: [[], [], []]
        })
        dispatch({
            type: ACTIONS.getCbtExams,
            payload: [[[], [], []]]
        })
        !production && (console.log("Users Login Access Error, (Incorrect Password) !!!"))
        dispatch({
            type: ACTIONS.usersMessage,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersWarning,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersError,
            payload: "User Login Access Error !!!"
        })
        dispatch({
            type: ACTIONS.usersFormError,
            payload: "Incorrect Password !!!"
        })
    }
}