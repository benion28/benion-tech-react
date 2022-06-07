export const registerCbtUser = (user, axios, host, config, ACTIONS, dispatch) => {
    axios({
        url: '/benion-cbt/api/register',
        method: 'post',
        baseURL: host,
        headers: config.headers,
        data: user
    }).then(response => {
        console.log(response)
        dispatch({
            type: ACTIONS.registerCbtUser,
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
            payload: `Register Cbt-User Error (${error.message})`
        })
    })
}

export const addCbtUser = (user, axios, host, adminConfig, ACTIONS, dispatch) => {
    axios({
        url: '/benion-cbt/api/add-user',
        method: 'post',
        baseURL: host,
        headers: adminConfig.headers,
        data: user
    }).then(response => {
        console.log(response)
        dispatch({
            type: ACTIONS.registerCbtUser,
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
            payload: `Add Cbt-User Error (${error.message})`
        })
    })
}

export const getCbtUsers = (axios, host, ACTIONS, dispatch) => {
    axios({
        url: '/benion-cbt/api/users',
        method: 'get',
        baseURL: host
    }).then(response => {
        dispatch({
            type: ACTIONS.getCbtUsers,
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
            payload: `Get Cbt-Users Error (${error.message})`
        })
    })
}

export const cbtUserLogin = (user, axios, host, config, ACTIONS, dispatch, getCbtUsers) => {
    axios({
        url: '/benion-cbt/api/login',
        method: 'post',
        baseURL: host,
        headers: config.headers,
        data: user
    }).then(response => {
        dispatch({
            type: ACTIONS.cbtUserLogIn,
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
            getCbtUsers()
        } else {
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
            payload: `Cbt-User Login Error (${error.message})`
        })
    })
}

export const deleteCbtUser = (id, axios, host, adminConfig, ACTIONS, dispatch) => {
    axios({
        url: `/benion-cbt/api/delete-user/${ id }`,
        method: 'delete',
        baseURL: host,
        headers: adminConfig.headers
    }).then(response => {
        console.log(response)
        dispatch({
            type: ACTIONS.deleteCbtUser,
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
            payload: `Delete Cbt-User Error (${error.message})`
        })
    })
}

export const deleteAllCbtUsers = (axios, host, adminConfig, ACTIONS, dispatch) => {
    axios({
        url: '/benion-cbt/api/delete-all-users',
        method: 'delete',
        baseURL: host,
        headers: adminConfig.headers
    }).then(response => {
        console.log(response)
        dispatch({
            type: ACTIONS.deleteAllCbtUsers,
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
            payload: `Delete Cbt-Users Error (${error.message})`
        })
    })
}

export const cbtUserLogout = (axios, host, ACTIONS, dispatch) => {
    axios({
        url: '/benion-cbt/api/logout',
        method: 'get',
        baseURL: host
    }).then(response => {
        dispatch({
            type: ACTIONS.cbtUserLogOut
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
            payload: `Cbt-User Logout Error (${error.message})`
        })
    })
}

export const updateCbtUser = (user, axios, host, adminConfig, ACTIONS, dispatch, getCbtUsers) => {
    const id = user._id
    axios({
        url: `/benion-cbt/api/edit-user/${id}`,
        method: 'put',
        baseURL: host,
        headers: adminConfig.headers,
        data: user
    }).then(response => {
        console.log(response)
        getCbtUsers()
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
            payload: `Update Cbt-User Error (${error.message})`
        })
    })
}

export const cbtUserFind = (user, state, ACTIONS, dispatch) => {
    let filteredUser = state.cbtUsers.filter(data => data.role === user.role)
    filteredUser.filter(data => data.school === user.school)
    filteredUser.filter(data => data.class === user.class)
    filteredUser.filter(data => data.lastname.toLowerCase() === user.lastname.toLowerCase())
    filteredUser.filter(data => data.firstname.toLowerCase() === user.firstname.toLowerCase())

    if (filteredUser.length > 0) {
        dispatch({
            type: ACTIONS.usersError,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersMessage,
            payload: `User with username (${filteredUser[0].username}) found!!`
        })

        return {
            success: true,
            data: filteredUser[0]
        }
    } else {
        dispatch({
            type: ACTIONS.usersMessage,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersError,
            payload: 'Cbt Find Username Error'
        })

        return {
            success: false,
            data: {}
        }
    }
}