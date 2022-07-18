import { production } from '../services/userHelper'

export const registerCbtUser = (user, axios, host, config, ACTIONS, dispatch) => {
    axios({
        url: '/benion-cbt/api/register',
        method: 'post',
        baseURL: host,
        headers: config.headers,
        data: user
    }).then(response => {
        !production && (console.log("Register Cbt Response", response))
        getCbtUsers()
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
        !production && (console.log("Register Cbt Error", error))
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
        !production && (console.log("Add Cbt Response", response))
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
        !production && (console.log("Add Cbt Response", error))
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
        !production && (console.log("Get Cbt Users Response", response))
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
        !production && (console.log("Get Cbt Users Error", error))
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

export const cbtUserLogin = (user, axios, host, config, ACTIONS, dispatch, getCbtUsers, getCbtExams, getCbtQuestions) => {
    axios({
        url: '/benion-cbt/api/login',
        method: 'post',
        baseURL: host,
        headers: config.headers,
        data: user
    }).then(response => {
        !production && (console.log("Cbt User Login Response", response))
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
        getCbtExams()
        getCbtQuestions()
    }).catch(error => {
        !production && (console.log("Cbt User Login Error", error))
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
        !production && (console.log("Delete Cbt User Response", response))
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
        !production && (console.log("Delete Cbt User Error", error))
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
        !production && (console.log("Delete All Cbt Users Response", response))
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
        !production && (console.log("Delete All Cbt Users Error", error))
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
        !production && (console.log("Cbt User Logout Response", response))
        dispatch({
            type: ACTIONS.cbtUserLogOut,
            payload: null
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
        !production && (console.log("Cbt User Logout Error", error))
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

export const updateCbtUser = (user, axios, host, adminConfig, ACTIONS, dispatch, getCbtUsers, getCbtExams) => {
    const id = user._id
    axios({
        url: `/benion-cbt/api/edit-user/${id}`,
        method: 'put',
        baseURL: host,
        headers: adminConfig.headers,
        data: user
    }).then(response => {
        !production && (console.log("Update Cbt User Response", response))
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
        !production && (console.log("Update Cbt User Error", error))
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

export const deleteCbtExam = (key, axios, host, adminConfig, ACTIONS, dispatch, getCbtExams) => {
    axios({
        url: `/benion-cbt/api/delete-exam/${key}`,
        method: 'delete',
        baseURL: host,
        headers: adminConfig.headers
    }).then(response => {
        !production && (console.log("Delete Cbt Exam Response", response))
        getCbtExams()
        dispatch({
            type: ACTIONS.deleteCbtExam,
            payload: key
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
        !production && (console.log("Delete Cbt Exam Response", error))
        dispatch({
            type: ACTIONS.usersMessage,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersError,
            payload: `Delete Cbt-Exam Error (${error.message})`
        })
    })
}

export const updateExam = (values, key, axios, host, config, ACTIONS, dispatch, getCbtUsers, getCbtExams) => {
    axios({
        url: `/benion-cbt/api/edit-exam/${key}`,
        method: 'put',
        baseURL: host,
        headers: config.headers,
        data: values
    }).then(response => {
        !production && (console.log("Update Cbt-Exam Response", response))
        getCbtExams()
        getCbtUsers()
        dispatch({
            type: ACTIONS.updateExam,
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
        !production && (console.log("Update Cbt Exam Error", error))
        dispatch({
            type: ACTIONS.usersMessage,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersError,
            payload: `Update Cbt-Exam Error (${error.message})`
        })
    })
}

export const createExam = (values, axios, host, config, ACTIONS, dispatch, getCbtUsers, getCbtExams) => {
    axios({
        url: '/benion-cbt/api/add-exam',
        method: 'post',
        baseURL: host,
        headers: config.headers,
        data: values
    }).then(response => {
        !production && (console.log("Create Cbt-Exam Response", response))
        getCbtUsers()
        getCbtExams()
        dispatch({
            type: ACTIONS.createExam,
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
        !production && (console.log("Create Cbt-Exam Error", error))
        dispatch({
            type: ACTIONS.usersMessage,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersError,
            payload: `Create Cbt-Exam Error (${error.message})`
        })
    })
}

export const getCbtExams = (axios, host, ACTIONS, dispatch) => {
    axios({
        url: '/benion-cbt/api/cbt-exam-data',
        method: 'get',
        baseURL: host
    }).then(response => {
        !production && (console.log("Get Cbt-Exams Response", response))
        dispatch({
            type: ACTIONS.getCbtExams,
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
        !production && (console.log("Get Cbt-Exams Error", error))
        dispatch({
            type: ACTIONS.usersMessage,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersError,
            payload: `Get Cbt-Exams Error (${error.message})`
        })
    })
}

export const getCbtQuestions = (axios, host, ACTIONS, dispatch) => {
    axios({
        url: '/benion-cbt/api/cbt-exam-questions',
        method: 'get',
        baseURL: host
    }).then(response => {
        !production && (console.log("Get Cbt-Exams-Questions Response", response))
        dispatch({
            type: ACTIONS.getCbtQuestions,
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
        !production && (console.log("Get Cbt-Questions Error", error))
        dispatch({
            type: ACTIONS.usersMessage,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersError,
            payload: `Get Cbt-Questions Error (${error.message})`
        })
    })
}

export const examCategory = (values, ACTIONS, dispatch) => {
    dispatch({
        type: ACTIONS.examCategory,
        payload: values
    })
}

export const examAnswered = (values, ACTIONS, dispatch) => {
    dispatch({
        type: ACTIONS.examAnswered,
        payload: values
    })
}

export const addQuestion = (object, axios, host, config, ACTIONS, dispatch, getCbtExams, getCbtQuestions) => {
    axios({
        url: '/benion-cbt/api/add-question',
        method: 'post',
        baseURL: host,
        headers: config.headers,
        data: object
    }).then(response => {
        !production && (console.log("Add Question Response", response))
        getCbtExams()
        getCbtQuestions()
        dispatch({
            type: ACTIONS.addQuestion,
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
        !production && (console.log("Add Question Error", error))
        dispatch({
            type: ACTIONS.usersMessage,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersError,
            payload: `Add Question Error (${error.message})`
        })
    })
}

export const editQuestion = (object, key, axios, host, config, ACTIONS, dispatch, getCbtQuestions) => {
    axios({
        url: `/benion-cbt/api/edit-question/${key}`,
        method: 'put',
        baseURL: host,
        headers: config.headers,
        data: object
    }).then(response => {
        !production && (console.log("Edit Question Response", response))
        getCbtQuestions()
        dispatch({
            type: ACTIONS.usersError,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersMessage,
            payload: response.data.message
        })
    }).catch(error => {
        !production && (console.log("Edit Question Error", error))
        dispatch({
            type: ACTIONS.usersMessage,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersError,
            payload: `Edit Question Error (${error.message})`
        })
    })
}

export const deleteQuestion = (key, axios, host, adminConfig, ACTIONS, dispatch, getCbtQuestions) => {
    axios({
        url: `/benion-cbt/api/delete-question/${ key }`,
        method: 'delete',
        baseURL: host,
        headers: adminConfig.headers
    }).then(response => {
        !production && (console.log("Delete Exam-Question Response", response))
        getCbtQuestions()
        dispatch({
            type: ACTIONS.deleteQuestion,
            payload: key
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
        !production && (console.log("Delete Exam-Question Error", error))
        dispatch({
            type: ACTIONS.usersMessage,
            payload: null
        })
        dispatch({
            type: ACTIONS.usersError,
            payload: `Delete Exam-Question Error (${error.message})`
        })
    })
}