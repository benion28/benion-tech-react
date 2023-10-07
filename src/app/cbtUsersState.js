import { production } from '../services/userHelper'

export const registerCbtUser = (user, axios, host, config, ACTIONS, dispatch, getContactMessages) => {
    axios({
        url: '/benion-cbt/api/register',
        method: 'post',
        baseURL: host,
        headers: config.headers,
        data: user
    }).then(response => {
        !production && (console.log("Register Cbt Response", response))
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
        !production && (console.log("Register Cbt Error", error))
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
            payload: `Register Cbt-User Error - ${error.message} (${error?.response?.data?.error?.message})` 
        })
        dispatch({
            type: ACTIONS.usersFormError,
            payload: `${error?.response?.data?.error?.message} (${error.message})`
        })
    })
}

export const addCbtUser = (user, axios, host, adminConfig, ACTIONS, dispatch, getCbtUsers, getContactMessages) => {
    axios({
        url: '/benion-cbt/api/add-user',
        method: 'post',
        baseURL: host,
        headers: adminConfig.headers,
        data: user
    }).then(response => {
        !production && (console.log("Add Cbt Response", response))
        getCbtUsers()
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
        !production && (console.log("Add Cbt Response", error))
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
            payload: `Add Cbt-User Error - ${error.message} (${error?.response?.data?.error?.message})` 
        })
        dispatch({
            type: ACTIONS.usersFormError,
            payload: `${error?.response?.data?.error?.message} (${error.message})`
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
            type: response.data.success ? ACTIONS.usersMessage : ACTIONS.usersWarning,
            payload: response.data.success ? response.data.message : response.data.error
        })
    }).catch(error => {
        !production && (console.log("Get Cbt Users Error", error))
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
            payload: `Get Cbt-Users Error - ${error.message} (${error?.response?.data?.error?.message})` 
        })
    })
}

export const cbtUserLogin = (user, axios, host, config, ACTIONS, dispatch, getCbtUsers, getCbtExams, getCbtQuestions, getScores) => {
    axios({
        url: '/benion-cbt/api/login',
        method: 'post',
        baseURL: host,
        headers: config.headers,
        data: user
    }).then(response => {
        !production && (console.log("Cbt User Login Response", response))
        dispatch({
            type: ACTIONS.usersError,
            payload: null
        })
        if (response.data.success) {
            dispatch({
                type: ACTIONS.cbtUserLogIn,
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
                getCbtUsers()
            } else {
                dispatch({
                    type: ACTIONS.getCbtUser,
                    payload: []
                })
            }
            getCbtExams()
            getCbtQuestions()
            getScores()
        } else {
            dispatch({
                type: ACTIONS.usersWarning,
                payload: response.data.error
            })
                dispatch({
                type: ACTIONS.usersMessage,
                payload: null
            })
        }
    }).catch(error => {
        !production && (console.log("Cbt User Login Error", error))
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
            payload: `Cbt-User Login Error - ${error.message} (${error?.response?.data?.error?.message})` 
        })
        dispatch({
            type: ACTIONS.usersFormError,
            payload: `${error?.response?.data?.error?.message} (${error.message})`
        })
    })
}

export const findCbtUser = (user, axios, host, config, ACTIONS, dispatch) => {
    axios({
        url: '/benion-cbt/api/find-username',
        method: 'post',
        baseURL: host,
        headers: config.headers,
        data: user
    }).then(response => {
        !production && (console.log("Find Cbt User Response", response))
        dispatch({
            type: ACTIONS.findCbtUser,
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
        dispatch({
            type: ACTIONS.usersFormError,
            payload: !response.data.success ? response.data.error : ''
        })
    }).catch(error => {
        !production && (console.log("Find Cbt User Error", error))
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
            payload: `Find Cbt User Error - ${error.message} (${error?.response?.data?.error?.message})`
        })
        dispatch({
            type: ACTIONS.usersFormError,
            payload: `${error?.response?.data?.error?.message} (${error.message})`
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
            type: response.data.success ? ACTIONS.usersMessage : ACTIONS.usersWarning,
            payload: response.data.success ? response.data.message : response.data.error
        })
    }).catch(error => {
        !production && (console.log("Delete Cbt User Error", error))
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
            payload: `Delete Cbt-User Error - ${error.message} (${error?.response?.data?.error?.message})` 
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
            type: response.data.success ? ACTIONS.usersMessage : ACTIONS.usersWarning,
            payload: response.data.success ? response.data.message : response.data.error
        })
    }).catch(error => {
        !production && (console.log("Delete All Cbt Users Error", error))
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
            payload: `Delete Cbt-Users Error - ${error.message} (${error?.response?.data?.error?.message})`
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
            type: response.data.success ? ACTIONS.usersMessage : ACTIONS.usersWarning,
            payload: response.data.success ? response.data.message : response.data.error
        })
    }).catch(error => {
        !production && (console.log("Cbt User Logout Error", error))
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
            payload: `Cbt-User Logout Error - ${error.message} (${error?.response?.data?.error?.message})`
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
        !production && (console.log("Update Cbt User Response", response))
        getCbtUsers()
        dispatch({
            type: ACTIONS.usersError,
            payload: null
        })
        dispatch({
            type: response.data.success ? ACTIONS.usersMessage : ACTIONS.usersWarning,
            payload: response.data.success ? response.data.message : response.data.error
        })
    }).catch(error => {
        !production && (console.log("Update Cbt User Error", error))
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
            payload: `Update Cbt-User Error - ${error.message} (${error?.response?.data?.error?.message})`
        })
        dispatch({
            type: ACTIONS.usersFormError,
            payload: `${error?.response?.data?.error?.message} (${error.message})`
        })
    })
}

export const promoteCbtUsers = (user, axios, host, adminConfig, ACTIONS, dispatch, getCbtUsers) => {
    axios({
        url: `/benion-cbt/api/promote-users`,
        method: 'put',
        baseURL: host,
        headers: adminConfig.headers,
        data: user
    }).then(response => {
        !production && (console.log("Promote Cbt Users Response", response))
        getCbtUsers()
        dispatch({
            type: ACTIONS.usersError,
            payload: null
        })
        dispatch({
            type: response.data.success ? ACTIONS.usersMessage : ACTIONS.usersWarning,
            payload: response.data.success ? response.data.message : response.data.error
        })
    }).catch(error => {
        !production && (console.log("Promote Cbt Users Error", error))
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
            payload: `Promote Cbt-Users Error - ${error.message} (${error?.response?.data?.error?.message})`
        })
        dispatch({
            type: ACTIONS.usersFormError,
            payload: `${error?.response?.data?.error?.message} (${error.message})`
        })
    })
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
            type: ACTIONS.usersError,
            payload: null
        })
        dispatch({
            type: response.data.success ? ACTIONS.usersMessage : ACTIONS.usersWarning,
            payload: response.data.success ? response.data.message : response.data.error
        })
    }).catch(error => {
        !production && (console.log("Delete Cbt Exam Response", error))
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
            payload: `Delete Cbt-Exam Error - ${error.message} (${error?.response?.data?.error?.message})`
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
            type: response.data.success ? ACTIONS.usersMessage : ACTIONS.usersWarning,
            payload: response.data.success ? response.data.message : response.data.error
        })
    }).catch(error => {
        !production && (console.log("Update Cbt Exam Error", error))
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
            payload: `Update Cbt-Exam Error - ${error.message} (${error?.response?.data?.error?.message})`
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
            type: response.data.success ? ACTIONS.usersMessage : ACTIONS.usersWarning,
            payload: response.data.success ? response.data.message : response.data.error
        })
    }).catch(error => {
        !production && (console.log("Create Cbt-Exam Error", error))
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
            payload: `Create Cbt-Exam Error - ${error.message} (${error?.response?.data?.error?.message})`
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
            type: response.data.success ? ACTIONS.usersMessage : ACTIONS.usersWarning,
            payload: response.data.success ? response.data.message : response.data.error
        })
    }).catch(error => {
        !production && (console.log("Get Cbt-Exams Error", error))
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
            payload: `Get Cbt-Exams Error - ${error.message} (${error?.response?.data?.error?.message})`
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
            type: response.data.success ? ACTIONS.usersMessage : ACTIONS.usersWarning,
            payload: response.data.success ? response.data.message : response.data.error
        })
    }).catch(error => {
        !production && (console.log("Get Cbt-Questions Error", error))
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
            payload: `Get Cbt-Questions Error - ${error.message} (${error?.response?.data?.error?.message})`
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

export const addQuestion = (object, axios, host, adminConfig, ACTIONS, dispatch, getCbtExams, getCbtQuestions) => {
    axios({
        url: '/benion-cbt/api/add-question',
        method: 'post',
        baseURL: host,
        headers: adminConfig.headers,
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
            type: response.data.success ? ACTIONS.usersMessage : ACTIONS.usersWarning,
            payload: response.data.success ? response.data.message : response.data.error
        })
    }).catch(error => {
        !production && (console.log("Add Question Error", error))
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
            payload: `Add Question Error - ${error.message} (${error?.response?.data?.error?.message})`
        })
        dispatch({
            type: ACTIONS.usersFormError,
            payload: `${error?.response?.data?.error?.message} (${error.message})`
        })
    })
}

export const editQuestion = (object, key, axios, host, adminConfig, ACTIONS, dispatch, getCbtQuestions) => {
    axios({
        url: `/benion-cbt/api/edit-question/${key}`,
        method: 'put',
        baseURL: host,
        headers: adminConfig.headers,
        data: object
    }).then(response => {
        !production && (console.log("Edit Question Response", response))
        getCbtQuestions()
        dispatch({
            type: ACTIONS.usersError,
            payload: null
        })
        dispatch({
            type: response.data.success ? ACTIONS.usersMessage : ACTIONS.usersWarning,
            payload: response.data.success ? response.data.message : response.data.error
        })
    }).catch(error => {
        !production && (console.log("Edit Question Error", error))
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
            payload: `Edit Question Error - ${error.message} (${error?.response?.data?.error?.message})`
        })
        dispatch({
            type: ACTIONS.usersFormError,
            payload: `${error?.response?.data?.error?.message} (${error.message})`
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
            type: ACTIONS.usersError,
            payload: null
        })
        dispatch({
            type: response.data.success ? ACTIONS.usersMessage : ACTIONS.usersWarning,
            payload: response.data.success ? response.data.message : response.data.error
        })
    }).catch(error => {
        !production && (console.log("Delete Exam-Question Error", error))
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
            payload: `Delete Exam-Question Error - ${error.message} (${error?.response?.data?.error?.message})`
        })
    })
}

export const updateCbtUserPassword = (user, axios, host, adminConfig, ACTIONS, dispatch) => {
    axios({
        url: "/benion-cbt/api/edit-user-password",
        method: 'put',
        baseURL: host,
        headers: adminConfig.headers,
        data: user
    }).then(response => {
        !production && (console.log("Update Cbt User Password Response", response))
        dispatch({
            type: ACTIONS.usersError,
            payload: null
        })
        dispatch({
            type: response.data.success ? ACTIONS.usersMessage : ACTIONS.usersWarning,
            payload: response.data.success ? response.data.message : response.data.error
        })
    }).catch(error => {
        !production && (console.log("Update Cbt User Password Error", error))
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
            payload: `Update Cbt User Password Error - ${error.message} (${error?.response?.data?.error?.message})`
        })
        dispatch({
            type: ACTIONS.usersFormError,
            payload: `${error?.response?.data?.error?.message} (${error.message})`
        })
    })
}

export const getScores = (axios, host, ACTIONS, dispatch) => {
    axios({
        url: '/benion-cbt/api/cbt-scores',
        method: 'get',
        baseURL: host
    }).then(response => {
        !production && (console.log("Get Scores Response", response))
        dispatch({
            type: ACTIONS.getScores,
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
        !production && (console.log("Get Scores Error", error))
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
            payload: `Get Scores Error - ${error.message} (${error?.response?.data?.error?.message})`
        })
    })
}

export const addScore = (object, axios, host, adminConfig, ACTIONS, dispatch, getScores) => {
    axios({
        url: '/benion-cbt/api/add-cbt-score',
        method: 'post',
        baseURL: host,
        headers: adminConfig.headers,
        data: object
    }).then(response => {
        !production && (console.log("Add Score Response", response))
        getScores()
        dispatch({
            type: ACTIONS.usersError,
            payload: null
        })
        dispatch({
            type: response.data.success ? ACTIONS.usersMessage : ACTIONS.usersWarning,
            payload: response.data.success ? response.data.message : response.data.error
        })
    }).catch(error => {
        !production && (console.log("Add Score Error", error))
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
            payload: `Add Score Error - ${error.message} (${error?.response?.data?.error?.message})`
        })
        dispatch({
            type: ACTIONS.usersFormError,
            payload: `${error?.response?.data?.error?.message} (${error.message})`
        })
    })
}

export const editScore = (object, key, axios, host, adminConfig, ACTIONS, dispatch, getScores) => {
    axios({
        url: `/benion-cbt/api/edit-cbt-score/${key}`,
        method: 'put',
        baseURL: host,
        headers: adminConfig.headers,
        data: object
    }).then(response => {
        !production && (console.log("Edit Score Response", response))
        getScores()
        dispatch({
            type: ACTIONS.usersError,
            payload: null
        })
        dispatch({
            type: response.data.success ? ACTIONS.usersMessage : ACTIONS.usersWarning,
            payload: response.data.success ? response.data.message : response.data.error
        })
    }).catch(error => {
        !production && (console.log("Edit Score Error", error))
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
            payload: `Edit Score Error - ${error.message} (${error?.response?.data?.error?.message})`
        })
        dispatch({
            type: ACTIONS.usersFormError,
            payload: `${error?.response?.data?.error?.message} (${error.message})`
        })
    })
}

export const deleteScore = (key, axios, host, adminConfig, ACTIONS, dispatch, getCbtQuestions) => {
    axios({
        url: `/benion-cbt/api/delete-cbt-score/${ key }`,
        method: 'delete',
        baseURL: host,
        headers: adminConfig.headers
    }).then(response => {
        !production && (console.log("Delete Score Response", response))
        getCbtQuestions()
        dispatch({
            type: ACTIONS.usersError,
            payload: null
        })
        dispatch({
            type: response.data.success ? ACTIONS.usersMessage : ACTIONS.usersWarning,
            payload: response.data.success ? response.data.message : response.data.error
        })
    }).catch(error => {
        !production && (console.log("Delete Score Error", error))
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
            payload: `Delete Score Error - ${error.message} (${error?.response?.data?.error?.message})`
        })
    })
}