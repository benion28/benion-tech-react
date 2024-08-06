import axios from "axios"
import { smsHost, initialState, verifySentData } from "../services/userHelper"
import * as ACTIONS from "../services/actions"

let request = {
    meta: {
        action: "0",
        source: "web",
    },
    data: null,
};

export const smsUserLogin = (user, dispatch, config, getStudents, getParents, getTeachers, getNotifications, getSmsUsers, getFeesCollections, getExpenses, getExamResults, getHostels, toast, getTransports, getExamSchedules, getAttendances, getClients) => {
    const url = '/api/auth/login'
    request.data = user
    dispatch({
        type: ACTIONS.loggingIn,
        payload: true
    })

    axios({
        url,
        method: 'post',
        baseURL: smsHost,
        headers: config.headers,
        data: request
    }).then(response => {
        const result = response.data
        console.warn("Login Result: ", result)
        if (result.meta.status === "200" || result.meta.status === "201" || result.meta.status === "OK") {
            const responseUser = result.data
            responseUser.role = responseUser.roles[0]
            dispatch({
                type: ACTIONS.smsUserLogin,
                payload: responseUser
            })
            getParents()
            getTeachers()
            getSmsUsers()
            getClients()
            getNotifications()
            getStudents()
            getExamResults()
            getExpenses()
            getHostels()
            getTransports()
            getFeesCollections()
            getExamSchedules()
            getAttendances()
            console.log("responseUser", responseUser)
            dispatch({
                type: ACTIONS.loggingIn,
                payload: false
            })
            toast.success("You are now logged succcessfully")
            
        } else {
            toast.error(`Unable to authenticate your email and password. (${result.error})`)
            dispatch({
                type: ACTIONS.loggingIn,
                payload: false
            })
            
        }
    }).catch(error => {
        toast.error('An error occurred during sign in. Please check your credentials and try again.')
        dispatch({
            type: ACTIONS.loggingIn,
            payload: false
        })
        console.log(`An error occurred during sign in. Please check your credentials and try again. (${error.message})`)
        
    })
}

export const getStudents = (dispatch, config, setError) => {
    const url = "/api/student/student_list"
    setError(null)

    axios({
        url,
        method: 'get',
        headers: config.headers,
       baseURL: smsHost 
    }).then(response => {
        const result = response.data
        if (result.meta.status === "200") {
            dispatch({
                type: ACTIONS.getStudents,
                payload: result.data
            })
        } else {
            setError(`Unable to fetch data.`)
            console.log(`Unable to fetch data. (${result.meta.message})`)
        }
    }).catch(error => {
        setError('An error occurred. Please reload your browser or sign out and log in again.')
        console.log(`An error occurred. Please try again. (${error.message})`)
    })
}

export const getParents = (dispatch, config, setError) => {
    const url = "/api/parent/parent_list"
    setError(null)

    axios({
        url,
        method: 'get',
        headers: config.headers,
       baseURL: smsHost 
    }).then(response => {
        const result = response.data
        if (result.meta.status === "200") {
            dispatch({
                type: ACTIONS.getParents,
                payload: result.data
            })
        } else {
            setError(`Unable to fetch data.`)
            console.log(`Unable to fetch data. (${result.meta.message})`)
        }
    }).catch(error => {
        setError('An error occurred. Please reload your browser or sign out and log in again.')
        console.log(`An error occurred. Please try again. (${error.message})`)
    })
}

export const getTeachers = (dispatch, config, setError) => {
    const url = "/api/teacher/teacher_list"
    setError(null)

    axios({
        url,
        method: 'get',
        headers: config.headers,
       baseURL: smsHost 
    }).then(response => {
        const result = response.data
        if (result.meta.status === "200") {
            dispatch({
                type: ACTIONS.getTeachers,
                payload: result.data
            })
        } else {
            setError(`Unable to fetch data.`)
            console.log(`Unable to fetch data. (${result.meta.message})`)
        }
    }).catch(error => {
        setError('An error occurred. Please reload your browser or sign out and log in again.')
        console.log(`An error occurred. Please try again. (${error.message})`)
    })
}

export const getNotifications = (dispatch, config, setError) => {
    const url = "/api/notice/notice_list"
    setError(null)

    axios({
        url,
        method: 'get',
        headers: config.headers,
       baseURL: smsHost 
    }).then(response => {
        const result = response.data
        if (result.meta.status === "200") {
            dispatch({
                type: ACTIONS.getNotifications,
                payload: result.data
            })
        } else {
            setError(`Unable to fetch data.`)
            console.log(`Unable to fetch data. (${result.meta.message})`)
        }
    }).catch(error => {
        setError('An error occurred. Please reload your browser or sign out and log in again.')
        console.log(`An error occurred. Please try again. (${error.message})`)
    })
}

export const getSmsUsers = (dispatch, config, setError) => {
    const url = "/api/user/all-user"
    setError(null)

    axios({
        url,
        method: 'get',
        headers: config.headers,
       baseURL: smsHost 
    }).then(response => {
        const result = response.data
        if (result.meta.status === "200") {
            dispatch({
                type: ACTIONS.getSmsUsers,
                payload: result.data
            })
        } else {
            setError(`Unable to fetch data.`)
            console.log(`Unable to fetch data. (${result.meta.message})`)
        }
    }).catch(error => {
        setError('An error occurred. Please reload your browser or sign out and log in again.')
        console.log(`An error occurred. Please try again. (${error.message})`)
    })
}

export const getFeesCollections = (dispatch, config, setError) => {
    const url = "/api/account/account_list"
    setError(null)

    axios({
        url,
        method: 'get',
        headers: config.headers,
       baseURL: smsHost 
    }).then(response => {
        const result = response.data
        if (result.meta.status === "200") {
            dispatch({
                type: ACTIONS.getFeesCollections,
                payload: result.data
            })
        } else {
            setError(`Unable to fetch data.`)
            console.log(`Unable to fetch data. (${result.meta.message})`)
        }
    }).catch(error => {
        setError('An error occurred. Please reload your browser or sign out and log in again.')
        console.log(`An error occurred. Please try again. (${error.message})`)
    })
}

export const getExpenses = (dispatch, config, setError) => {
    const url = "/api/account/account_expense_list"
    setError(null)

    axios({
        url,
        method: 'get',
        headers: config.headers,
       baseURL: smsHost 
    }).then(response => {
        const result = response.data
        if (result.meta.status === "200") {
            dispatch({
                type: ACTIONS.getExpenses,
                payload: result.data
            })
        } else {
            setError(`Unable to fetch data.`)
            console.log(`Unable to fetch data. (${result.meta.message})`)
        }
    }).catch(error => {
        setError('An error occurred. Please reload your browser or sign out and log in again.')
        console.log(`An error occurred. Please try again. (${error.message})`)
    })
}

export const getExamResults = (dispatch, config, setError) => {
    const url = "/api/exam_result/exam_result_list"
    setError(null)

    axios({
        url,
        method: 'get',
        headers: config.headers,
       baseURL: smsHost 
    }).then(response => {
        const result = response.data
        if (result.meta.status === "200") {
            dispatch({
                type: ACTIONS.getExamResults,
                payload: result.data
            })
        } else {
            setError(`Unable to fetch data.`)
            console.log(`Unable to fetch data. (${result.meta.message})`)
        }
    }).catch(error => {
        setError('An error occurred. Please reload your browser or sign out and log in again.')
        console.log(`An error occurred. Please try again. (${error.message})`)
    })
}

export const getHostels = (dispatch, config, setError) => {
    const url = "/api/hostel/hostel_list"
    setError(null)

    axios({
        url,
        method: 'get',
        headers: config.headers,
       baseURL: smsHost 
    }).then(response => {
        const result = response.data
        if (result.meta.status === "200") {
            dispatch({
                type: ACTIONS.getHostels,
                payload: result.data
            })
        } else {
            setError(`Unable to fetch data.`)
            console.log(`Unable to fetch data. (${result.meta.message})`)
        }
    }).catch(error => {
        setError('An error occurred. Please reload your browser or sign out and log in again.')
        console.log(`An error occurred. Please try again. (${error.message})`)
    })
}

export const getExamSchedules = (dispatch, config, setError) => {
    const url = "/api/exam_shedule/exam_schedule_list"
    setError(null)

    axios({
        url,
        method: 'get',
        headers: config.headers,
       baseURL: smsHost 
    }).then(response => {
        const result = response.data
        if (result.meta.status === "200") {
            dispatch({
                type: ACTIONS.getExamSchedules,
                payload: result.data
            })
        } else {
            setError(`Unable to fetch data.`)
            console.log(`Unable to fetch data. (${result.meta.message})`)
        }
    }).catch(error => {
        setError('An error occurred. Please reload your browser or sign out and log in again.')
        console.log(`An error occurred. Please try again. (${error.message})`)
    })
}

export const smsUserLogout = (data, dispatch, config, toast) => {
    const url = "/api/auth/logout"
    request.data = data

    dispatch({
        type: ACTIONS.smsUserLogout,
        payload: initialState
    })

    axios({
        url,
        method: 'post',
        baseURL: smsHost,
        headers: config.headers,
        data: request
    }).then(response => {
        const result = response.data
        console.log("Logout Result: ", result)
        dispatch({
            type: ACTIONS.smsUserLogout,
            payload: initialState.smsUser
        })
        toast.success('Successfully logged out!')
        
    }).catch(error => {
        dispatch({
            type: ACTIONS.smsUserLogout,
            payload: initialState
        })
        toast.error('An error occurred while logging out. Please try again.')
        console.log(`An error occurred while logging out. Please try again. (${error.message})`)
        
    })
}

export const decryptState = (state, dispatch) => {
    dispatch({
        type: ACTIONS.decryptState,
        payload: state
    })
}

export const getTransports = (dispatch, config, setError) => {
    const url = "/api/transport/transport_list"
    setError(null)

    axios({
        url,
        method: 'get',
        headers: config.headers,
       baseURL: smsHost 
    }).then(response => {
        const result = response.data
        if (result.meta.status === "200") {
            dispatch({
                type: ACTIONS.getTransports,
                payload: result.data
            })
        } else {
            setError(`Unable to fetch data.`)
            console.log(`Unable to fetch data. (${result.meta.message})`)
        }
    }).catch(error => {
        setError('An error occurred. Please reload your browser or sign out and log in again.')
        console.log(`An error occurred. Please try again. (${error.message})`)
    })
}

export const getAttendances = (dispatch, config, setError) => {
    const url = "/api/attendance/attendances"
    setError(null)

    axios({
        url,
        method: 'get',
        headers: config.headers,
       baseURL: smsHost 
    }).then(response => {
        const result = response.data
        if (result.meta.status === "200") {
            dispatch({
                type: ACTIONS.getAttendances,
                payload: result.data
            })
        } else {
            setError(`Unable to fetch data.`)
            console.log(`Unable to fetch data. (${result.meta.message})`)
        }
    }).catch(error => {
        setError('An error occurred. Please reload your browser or sign out and log in again.')
        console.log(`An error occurred. Please try again. (${error.message})`)
    })
}


export const getClients = (dispatch, config, setError) => {
    const url = "/api/client/clients"
    setError(null)

    axios({
        url,
        method: 'get',
        headers: config.headers,
       baseURL: smsHost 
    }).then(response => {
        const result = response.data
        if (result.meta.status === "200") {
            dispatch({
                type: ACTIONS.getClients,
                payload: result.data
            })
        } else {
            setError(`Unable to fetch data.`)
            console.log(`Unable to fetch data. (${result.meta.message})`)
        }
    }).catch(error => {
        setError('An error occurred. Please reload your browser or sign out and log in again.')
        console.log(`An error occurred. Please try again. (${error.message})`)
    })
}

export const registerSmsUser = (user, authConfig, getUsers, toast) => {
    const url = `/api/user/${user.id ? `update/${user.id}` : 'signup'}`
    request.data = user

    console.warn("Request Data: ", { url, data: user })

    const headers = authConfig.headers
    const method = `${user.id ? 'put' : 'post'}`
    const data = request

    axios({ url, method, baseURL: smsHost, headers, data }).then(response => {
        const result = response.data
        console.warn("Register Result: ", result)
        if (result.meta.status === "201" || result.meta.status === "200" || result.meta.status === "OK") {
            toast.success(`Well done! You successfully ${user.id ? "edited" : "registered"} a user.`)
            verifySentData(axios, url, method, headers, data)
            getUsers()
            
        } else {
            toast.error(`Unable to ${user.id ? "edit" : "register"} a user.`)
            console.log(`Unable to ${user.id ? "edit" : "register"} a user. (${result.meta.message})`)
            
        }
    }).catch(error => {
        toast.error('An error occurred while registering a user. Please try again.')
        console.log(`An error occurred while registering a user. Please try again. (${error.message})`)
        
    })
}

export const admitStudent = (student, authConfig, getStudents, toast) => {
    const url = `/api/student/${student.id ? `update/${student.id}` : 'student_form'}`
    request.data = student

    console.warn("Request Data: ", { url, data: student })

    const headers = authConfig.headers
    const method = `${student.id ? 'put' : 'post'}`
    const data = request

    axios({ url, method, baseURL: smsHost, headers, data }).then(response => {
        const result = response.data
        console.warn("Admit Result: ", result)
        if (result.meta.status === "201" || result.meta.status === "200" || result.meta.status === "OK") {
            toast.success(`Well done! You successfully ${student.id ? "edited" : "added"} a student.`)
            verifySentData(axios, url, method, headers, data)
            getStudents()
            
        } else {
            console.log(`Unable to ${student.id ? "edit" : "admit"} a student.`)
            toast.error(`Unable to ${student.id ? "edit" : "admit"} a student. (${result.meta.message})`)
            
        }
    }).catch(error => {
        toast.error('An error occurred while trying to admit a student. Please try again.')
        console.log(`An error occurred while trying to admit a student. Please try again. (${error.message})`)
        
    })
}

export const addParent = (parent, authConfig, getParents, toast) => {
    const url = `/api/parent/${parent.id ? `${parent.id}` : 'parent_form'}`
    request.data = parent

    console.warn("Request Data: ", { url, data: parent })

    const headers = authConfig.headers
    const method = `${parent.id ? 'put' : 'post'}`
    const data = request

    axios({ url, method, baseURL: smsHost, headers, data }).then(response => {
        const result = response.data
        console.warn("Add Parent Result: ", result)
        if (result.meta.status === "201" || result.meta.status === "200" || result.meta.status === "OK") {
            toast.success(`Well done! You successfully ${parent.id ? "edited" : "added"} a parent.`)
            verifySentData(axios, url, method, headers, data)
            getParents()
            
        } else {
            console.log(`Unable to add a ${parent.id ? "edit" : "add"} a parent. (${result.meta.message})`)
            toast.error(`Unable to add a ${parent.id ? "edit" : "add"} a parent.`)
            
        }
    }).catch(error => {
        toast.error('An error occurred while trying to add a parent. Please try again.')
        console.log(`An error occurred while trying to add a parent. Please try again. (${error.message})`)
        
    })
}

export const addTeacher = (teacher, authConfig, getTeachers, toast) => {
    const url = `/api/teacher/${teacher.id ? `update/${teacher.id}` : 'teacher_form'}`
    request.data = teacher

    console.warn("Request Data: ", { url, data: teacher })

    const headers = authConfig.headers
    const method = `${teacher.id ? 'put' : 'post'}`
    const data = request

    axios({ url, method, baseURL: smsHost, headers, data }).then(response => {
        const result = response.data
        console.warn("Add Teacher Result: ", result)
        if (result.meta.status === "201" || result.meta.status === "200" || result.meta.status === "OK") {
            toast.success(`Well done! You successfully ${teacher.id ? "edited" : "added"} a teacher.`)
            verifySentData(axios, url, method, headers, data)
            getTeachers()
            
        } else {
            toast.error(`Unable to ${teacher.id ? "edit" : "add"} a teacher.`)
            console.log(`Unable to ${teacher.id ? "edit" : "add"} a teacher. (${result.meta.message})`)
            
        }
    }).catch(error => {
        toast.error('An error occurred while trying to add a teacher. Please try again.')
        console.log(`An error occurred while trying to add a teacher. Please try again. (${error.message})`)
        
    })
}

export const addFeesCollection = (item, authConfig, getFeesCollections, toast) => {
    const url = `/api/account/${item.id ? `update_account/${item.id}` : 'account_form'}`
    request.data = item

    console.warn("Request Data: ", { url, data: item })

    const headers = authConfig.headers
    const method = `${item.id ? 'put' : 'post'}`
    const data = request

    axios({ url, method, baseURL: smsHost, headers, data }).then(response => {
        const result = response.data
        console.warn("Add Fees Collection Result: ", result)
        if (result.meta.status === "201" || result.meta.status === "200" || result.meta.status === "OK") {
            toast.success(`Well done! You successfully ${item.id ? "edited" : "added"} a fees collection.`)
            verifySentData(axios, url, method, headers, data)
            getFeesCollections()
            
        } else {
            toast.error(`Unable to ${item.id ? "edit" : "add"} a fees collection.`)
            console.log(`Unable to ${item.id ? "edit" : "add"} a fees collection. (${result.meta.message})`)
            
        }
    }).catch(error => {
        toast.error('An error occurred while trying to add a fees collection. Please try again.')
        console.log(`An error occurred while trying to add a fees collection. Please try again. (${error.message})`)
        
    })
}

export const addExpense = (item, authConfig, getExpenses, toast) => {
    const url = `/api/account/${item.id ? `update_expense/${item.id}` : 'expense_account_form'}`
    request.data = item

    console.warn("Request Data: ", { url, data: item })

    const headers = authConfig.headers
    const method = `${item.id ? 'put' : 'post'}`
    const data = request

    axios({ url, method, baseURL: smsHost, headers, data }).then(response => {
        const result = response.data
        console.warn("Add Expenses Result: ", result)
        if (result.meta.status === "201" || result.meta.status === "200" || result.meta.status === "OK") {
            toast.success(`Well done! You successfully ${item.id ? "edited" : "added"} an expense.`)
            verifySentData(axios, url, method, headers, data)
            getExpenses()
            
        } else {
            console.log(`Unable to ${item.id ? "edit" : "add"} an expense. (${result.meta.message})`)
            toast.error(`Unable to ${item.id ? "edit" : "add"} an expense.`)
            
        }
    }).catch(error => {
        toast.error('An error occurred while trying to add an expense. Please try again.')
        console.log(`An error occurred while trying to add an expense. Please try again. (${error.message})`)
        
    })
}

export const addExamSchedule = (item, authConfig, getExamSchedules, toast) => {
    const url = `/api/exam_shedule/${item.id ? `update_exam_schedule/${item.id}` : 'exam_schedule_form'}`
    request.data = item

    console.warn("Request Data: ", { url, data: item })

    const headers = authConfig.headers
    const method = `${item.id ? 'put' : 'post'}`
    const data = request

    axios({ url, method, baseURL: smsHost, headers, data }).then(response => {
        const result = response.data
        console.warn("Add Exam Schedule Result: ", result)
        if (result.meta.status === "201" || result.meta.status === "200" || result.meta.status === "OK") {
            toast.success(`Well done! You successfully ${item.id ? "edited" : "added"} an exam schedule.`)
            verifySentData(axios, url, method, headers, data)
            getExamSchedules()
            
        } else {
            console.log(`Unable to ${item.id ? "edit" : "add"} an exam schedule. (${result.meta.message})`)
            toast.error(`Unable to ${item.id ? "edit" : "add"} an exam schedule.`)
            
        }
    }).catch(error => {
        toast.error('An error occurred while trying to add an exam schedule. Please try again.')
        console.log(`An error occurred while trying to add an exam schedule. Please try again. (${error.message})`)
        
    })
}

export const addExamResult = (item, authConfig, getExamResults, toast) => {
    const url = `/api/exam_result/${item.id ? `update/${item.id}` : 'create'}`
    request.data = item

    console.warn("Request Data: ", { url, data: item })

    const headers = authConfig.headers
    const method = `${item.id ? 'put' : 'post'}`
    const data = request

    axios({ url, method, baseURL: smsHost, headers, data }).then(response => {
        const result = response.data
        console.warn("Add Result Result: ", result)
        if (result.meta.status === "201" || result.meta.status === "200" || result.meta.status === "OK") {
            toast.success(`Well done! You successfully ${item.id ? "edited" : "added"} an exam result.`)
            verifySentData(axios, url, method, headers, data)
            getExamResults()
            
        } else {
            console.log(`Unable to ${item.id ? "edit" : "add"} an exam result. (${result.meta.message})`)
            toast.error(`Unable to ${item.id ? "edit" : "add"} an exam result.`)
            
        }
    }).catch(error => {
        toast.error('An error occurred while trying to add an exam result. Please try again.')
        console.log(`An error occurred while trying to add an exam result. Please try again. (${error.message})`)
        
    })
}

export const addNotification = (item, authConfig, getNotifications, toast) => {
    const url = `/api/notice/${item.id ? `update_notice/${item.id}` : 'notice_form'}`
    request.data = item

    console.warn("Request Data: ", { url, data: item })

    const headers = authConfig.headers
    const method = `${item.id ? 'put' : 'post'}`
    const data = request

    axios({ url, method, baseURL: smsHost, headers, data }).then(response => {
        const result = response.data
        console.warn("Add Notification Result: ", result)
        if (result.meta.status === "201" || result.meta.status === "200" || result.meta.status === "OK") {
            toast.success(`Well done! You successfully ${item.id ? "edited" : "added"} a notification.`)
            verifySentData(axios, url, method, headers, data)
            getNotifications()
            
        } else {
            console.log(`Unable to ${item.id ? "edit" : "add"} a notification. (${result.meta.message})`)
            toast.error(`Unable to ${item.id ? "edit" : "add"} a notification.`)
            
        }
    }).catch(error => {
        toast.error('An error occurred while trying to add a notification. Please try again.')
        console.log(`An error occurred while trying to add a notification. Please try again. (${error.message})`)
        
    })
}

export const sendMail = (item, authConfig, toast, setError, setMessage) => {
    const url = `/api/message/message_form`
    request.data = item
    setError(null)

    const headers = authConfig.headers
    const method = 'post'
    const data = request

    axios({ url, method, baseURL: smsHost, headers, data }).then(response => {
        const result = response.data
        if (result.meta.status === "200") {
            toast.success(`Well done! You successfully sent a mail.`)
            setMessage(`Well done! You successfully sent a mail.`)
            verifySentData(axios, url, method, headers, data)
            
        } else {
            console.logsetError(`Unable to send a mail. (${result.statusText})`)
            toast.error(`Unable to send a mail.`)
            setError(`Unable to send a mail.`)
            
        }
    }).catch(error => {
        toast.error('An error occurred while trying to send mail. Please try again.')
        setError('An error occurred while trying to send mail. Please try again.')
        console.log(`An error occurred. Please try again. (${error.message})`)
        
    })
}

export const addHostel = (item, authConfig, getHostels, toast) => {
    const url = `/api/hostel/${item.id ? `update_hostel/${item.id}` : 'hostel_form'}`
    request.data = item

    console.warn("Request Data: ", { url, data: item })

    const headers = authConfig.headers
    const method = `${item.id ? 'put' : 'post'}`
    const data = request

    axios({ url, method, baseURL: smsHost, headers, data }).then(response => {
        const result = response.data
        console.warn("Add Hostel Result: ", result)
        if (result.meta.status === "201" || result.meta.status === "200" || result.meta.status === "OK") {
            toast.success(`Well done! You successfully ${item.id ? "edited" : "added"} a hostel.`)
            verifySentData(axios, url, method, headers, data)
            getHostels()
            
        } else {
            console.log(`Unable to ${item.id ? "edit" : "add"} a hostel. (${result.meta.message})`)
            toast.error(`Unable to ${item.id ? "edit" : "add"} a hostel.`)
            
        }
    }).catch(error => {
        toast.error('An error occurred while trying to add a hostel. Please try again.')
        console.log(`An error occurred while trying to add a hostel. Please try again. (${error.message})`)
        
    })
}

export const addTransport = (item, authConfig, getTransports, toast) => {
    const url = `/api/transport/${item.id ? `update_transport/${item.id}` : 'transport_form'}`
    request.data = item

    console.warn("Request Data: ", { url, data: item })

    const headers = authConfig.headers
    const method = `${item.id ? 'put' : 'post'}`
    const data = request

    axios({ url, method, baseURL: smsHost, headers, data }).then(response => {
        const result = response.data
        console.warn("Add Transport Result: ", result)
        if (result.meta.status === "201" || result.meta.status === "200" || result.meta.status === "OK") {
            toast.success(`Well done! You successfully ${item.id ? "edited" : "added"} a transport.`)
            verifySentData(axios, url, method, headers, data)
            getTransports()
            
        } else {
            console.log(`Unable to ${item.id ? "edit" : "add"} a transport. (${result.meta.message})`)
            toast.error(`Unable to ${item.id ? "edit" : "add"} a transport.`)
            
        }
    }).catch(error => {
        toast.error('An error occurred while trying to add a transport. Please try again.')
        console.log(`An error occurred while trying to add a transport. Please try again. (${error.message})`)
        
    })
}

export const addAttendance = (item, authConfig, getTransports, toast) => {
    const url = `/api/attendance/${item.id ? `edit/${item.id}` : 'create_attendance'}`
    request.data = item

    console.warn("Request Data: ", { url, data: item })

    const headers = authConfig.headers
    const method = `${item.id ? 'put' : 'post'}`
    const data = request

    axios({ url, method, baseURL: smsHost, headers, data }).then(response => {
        const result = response.data
        console.warn("Add Attendance Result: ", result)
        if (result.meta.status === "201" || result.meta.status === "200" || result.meta.status === "OK") {
            toast.success(`Well done! You successfully ${item.id ? "edited" : "added"} an attendance.`)
            verifySentData(axios, url, method, headers, data)
            getTransports()
            
        } else {
            console.log(`Unable to ${item.id ? "edit" : "add"} an attendance. (${result.meta.message})`)
            toast.error(`Unable to ${item.id ? "edit" : "add"} an attendance.`)
            
        }
    }).catch(error => {
        toast.error('An error occurred while trying to add an attendance. Please try again.')
        console.log(`An error occurred while trying to add an attendance. Please try again. (${error.message})`)
        
    })
}

export const addClient = (item, authConfig, getClients, toast) => {
    const url = `/api/client/${item.id ? `edit/${item.id}` : 'create_client'}`
    request.data = item

    console.warn("Request Data: ", { url, data: item })

    const headers = authConfig.headers
    const method = `${item.id ? 'put' : 'post'}`
    const data = request

    axios({ url, method, baseURL: smsHost, headers, data }).then(response => {
        const result = response.data
        console.warn("Add Client Result: ", result)
        if (result.meta.status === "201" || result.meta.status === "200" || result.meta.status === "OK") {
            toast.success(`Well done! You successfully ${item.id ? "edited" : "added"} a client.`)
            verifySentData(axios, url, method, headers, data)
            getClients()
            
        } else {
            console.log(`Unable to ${item.id ? "edit" : "add"} a client. (${result.meta.message})`)
            toast.error(`Unable to ${item.id ? "edit" : "add"} a client.`)
            
        }
    }).catch(error => {
        toast.error('An error occurred while trying to add a client. Please try again.')
        console.log(`An error occurred while trying to add a client. Please try again. (${error.message})`)
        
    })
}

export const changePassword = (item, authConfig, toast) => {
    const url = "/api/user/password-change"
    request.data = item

    console.warn("Request Data: ", { url, data: item })

    const headers = authConfig.headers
    const method = 'put'
    const data = request

    axios({ url, method, baseURL: smsHost, headers, data }).then(response => {
        const result = response.data
        console.warn("Change Password Result: ", result)
        if (result.meta.status === "201" || result.meta.status === "200" || result.meta.status === "OK") {
            toast.success("Well done! You successfully change your password")
            verifySentData(axios, url, method, headers, data)
            
        } else {
            console.log(`Unable to change password. (${result.meta.message})`)
            toast.error("Unable to change password.")
            
        }
    }).catch(error => {
        toast.error('An error occurred while trying to change password. Please try again.')
        console.log(`An error occurred while trying to change password. Please try again. (${error.message})`)
        
    })
}

export const forgetPassword = (item, authConfig, setError, setMessage, toast) => {
    const url = "/api/user/password-reset"
    request.data = item
    setError(null)

    console.warn("Request Data: ", { url, data: item })

    const headers = authConfig.headers
    const method = 'post'
    const data = request

    axios({ url, method, baseURL: smsHost, headers, data }).then(response => {
        const result = response.data
        console.warn("Forget Password Result: ", result)
        if (result.meta.status === "201" || result.meta.status === "200" || result.meta.status === "OK") {
            toast.success("Well done! A new password has been sent to your email")
            setMessage("Well done! A new password has been sent to your email")
            verifySentData(axios, url, method, headers, data)
            
        } else {
            console.log(`Unable to reset password. Try again (${result.meta.message})`)
            toast.error("Unable to reset password. Try again")
            setError("Unable to reset password.")
            
        }
    }).catch(error => {
        toast.error('An error occurred while trying to reset password. Please try again.')
        setError('An error occurred while trying to reset password. Please try again.')
        console.log(`An error occurred while trying to reset password. Please try again. (${error.message})`)
        
    })
}

export const deleteSmsUser = (id, authConfig, getUsers, toast) => {
    const url = `/api/user/delete/${id}`

    console.warn("Request Data: ", { url, data: id })

    axios({
        url,
        method: 'delete',
        baseURL: smsHost,
        headers: authConfig.headers
    }).then(response => {
        const result = response.data
        console.warn("Delete User Result: ", result)
        if (result.meta.status === "200" || result.meta.status === "202") {
            toast.success(`Well done! You successfully deleted a user.`)
            getUsers()
            
        } else {
            console.log(`Unable to delete a user. (${result.meta.message})`)
            toast.error(`Unable to delete a user.`)
            
        }
    }).catch(error => {
        toast.error('An error occurred while trying to delete a user. Please try again.')
        console.log(`An error occurred while trying to delete a user. Please try again. (${error.message})`)
        
    })
}

export const deleteStudent = (id, authConfig, getStudents, toast) => {
    const url = `/api/student/delete/${id}`

    console.warn("Request Data: ", { url, data: id })

    axios({
        url,
        method: 'delete',
        baseURL: smsHost,
        headers: authConfig.headers
    }).then(response => {
        const result = response.data
        console.warn("Delete Student Result: ", result)
        if (result.meta.status === "200" || result.meta.status === "202") {
            toast.success(`Well done! You successfully deleted a student.`)
            getStudents()
            
        } else {
            toast.error(`Unable to delete a student.`)
            console.log(`Unable to delete a student. (${result.meta.message})`)
            
        }
    }).catch(error => {
        toast.error('An error occurred while trying to delete a student. Please try again.')
        console.log(`An error occurred while trying to delete a student. Please try again. (${error.message})`)
        
    })
}

export const deleteParent = (id, authConfig, getParents, toast) => {
    const url = `/api/parent/delete/${id}`

    console.warn("Request Data: ", { url, data: id })

    axios({
        url,
        method: 'delete',
        baseURL: smsHost,
        headers: authConfig.headers
    }).then(response => {
        const result = response.data
        console.warn("Delete Parent Result: ", result)
        if (result.meta.status === "200" || result.meta.status === "202") {
            toast.success(`Well done! You successfully deleted a parent.`)
            getParents()
            
        } else {
            console.log(`Unable to delete a parent. (${result.meta.message})`)
            toast.error(`Unable to delete a parent.`)
            
        }
    }).catch(error => {
        toast.error('An error occurred while trying to delete a parent. Please try again.')
        console.log(`An error occurred while trying to delete a parent. Please try again. (${error.message})`)
        
    })
}

export const deleteTeacher = (id, authConfig, getTeachers, toast) => {
    const url = `/api/teacher/delete/${id}`

    console.warn("Request Data: ", { url, data: id })

    axios({
        url,
        method: 'delete',
        baseURL: smsHost,
        headers: authConfig.headers
    }).then(response => {
        const result = response.data
        console.warn("Delete Teacher Result: ", result)
        if (result.meta.status === "200" || result.meta.status === "202") {
            toast.success(`Well done! You successfully deleted a teacher.`)
            getTeachers()
            
        } else {
            console.log(`Unable to delete a teacher. (${result.meta.message})`)
            toast.error(`Unable to delete a teacher.`)
            
        }
    }).catch(error => {
        toast.error('An error occurred while trying to delete a teacher. Please try again.')
        console.log(`An error occurred while trying to delete a teacher. Please try again. (${error.message})`)
        
    })
}

export const deleteFeesCollection = (id, authConfig, getFeesCollections, toast) => {
    const url = `/api/account/delete/${id}`

    console.warn("Request Data: ", { url, data: id })

    axios({
        url,
        method: 'delete',
        baseURL: smsHost,
        headers: authConfig.headers
    }).then(response => {
        const result = response.data
        console.warn("Delete Fees Collection Result: ", result)
        if (result.meta.status === "200" || result.meta.status === "202") {
            toast.success(`Well done! You successfully deleted a fees collection.`)
            getFeesCollections()
            
        } else {
            console.log(`Unable to delete a fees collection. (${result.meta.message})`)
            toast.error(`Unable to delete a fees collection.`)
            
        }
    }).catch(error => {
        toast.error('An error occurred while trying to delete a fees collection. Please try again.')
        console.log(`An error occurred while trying to delete a fees collection. Please try again. (${error.message})`)
        
    })
}

export const deleteExpense = (id, authConfig, getExpenses, toast) => {
    const url = `/api/account/expense/delete/${id}`

    console.warn("Request Data: ", { url, data: id })

    axios({
        url,
        method: 'delete',
        baseURL: smsHost,
        headers: authConfig.headers
    }).then(response => {
        const result = response.data
        console.warn("Delete Expense Result: ", result)
        if (result.meta.status === "200" || result.meta.status === "202") {
            toast.success(`Well done! You successfully deleted an expense.`)
            getExpenses()
            
        } else {
            console.log(`Unable to delete an expense. (${result.meta.message})`)
            toast.error(`Unable to delete an expense.`)
            
        }
    }).catch(error => {
        toast.error('An error occurred while trying to delete an expense. Please try again.')
        console.log(`An error occurred while trying to delete an expense. Please try again. (${error.message})`)
        
    })
}

export const deleteExamSchedule = (id, authConfig, getExamSchedules, toast) => {
    const url = `/api/exam_shedule/delete/${id}`

    console.warn("Request Data: ", { url, data: id })

    axios({
        url,
        method: 'delete',
        baseURL: smsHost,
        headers: authConfig.headers
    }).then(response => {
        const result = response.data
        console.warn("Delete Exam Schedule Result: ", result)
        if (result.meta.status === "200" || result.meta.status === "202") {
            toast.success(`Well done! You successfully deleted an exam schedule.`)
            getExamSchedules()
            
        } else {
            console.log(`Unable to delete an exam schedule. (${result.meta.message})`)
            toast.error(`Unable to delete an exam schedule.`)
            
        }
    }).catch(error => {
        toast.error('An error occurred while trying to delete an exam schedule. Please try again.')
        console.log(`An error occurred while trying to delete an exam schedule. Please try again. (${error.message})`)
        
    })
}

export const deleteExamResult = (id, authConfig, getExamResults, toast) => {
    const url = `/api/exam_result/delete/${id}`

    console.warn("Request Data: ", { url, data: id })

    axios({
        url,
        method: 'delete',
        baseURL: smsHost,
        headers: authConfig.headers
    }).then(response => {
        const result = response.data
        console.warn("Delete Exam Result Result: ", result)
        if (result.meta.status === "200" || result.meta.status === "202") {
            toast.success(`Well done! You successfully deleted an exam result.`)
            getExamResults()
            
        } else {
            console.log(`Unable to delete an exam result. (${result.meta.message})`)
            toast.error(`Unable to delete an exam result.`)
            
        }
    }).catch(error => {
        toast.error('An error occurred while trying to delete an exam result. Please try again.')
        console.log(`An error occurred while trying to delete an exam result. Please try again. (${error.message})`)
        
    })
}

export const deleteNotification = (id, authConfig, getNotifications, toast) => {
    const url = `/api/notice/delete/${id}`

    console.warn("Request Data: ", { url, data: id })

    axios({
        url,
        method: 'delete',
        baseURL: smsHost,
        headers: authConfig.headers
    }).then(response => {
        const result = response.data
        console.warn("Delete Notification Result: ", result)
        if (result.meta.status === "200" || result.meta.status === "202") {
            toast.success(`Well done! You successfully deleted a notification.`)
            getNotifications()
            
        } else {
            console.log(`Unable to delete a notification. (${result.meta.message})`)
            toast.error(`Unable to delete a notification.`)
            
        }
    }).catch(error => {
        toast.error('An error occurred while trying to delete a notification. Please try again.')
        console.log(`An error occurred while trying to delete a notification. Please try again. (${error.message})`)
        
    })
}

export const deleteHostel = (id, authConfig, getHostels, toast) => {
    const url = `/api/hostel/delete/${id}`

    console.warn("Request Data: ", { url, data: id })

    axios({
        url,
        method: 'delete',
        baseURL: smsHost,
        headers: authConfig.headers
    }).then(response => {
        const result = response.data
        console.warn("Delete Hostel Result: ", result)
        if (result.meta.status === "200" || result.meta.status === "202") {
            toast.success(`Well done! You successfully deleted a hostel.`)
            getHostels()
            
        } else {
            console.log(`Unable to delete a hostel. (${result.meta.message})`)
            toast.error(`Unable to delete a hostel.`)
            
        }
    }).catch(error => {
        toast.error('An error occurred while trying to delete a hostel. Please try again.')
        console.log(`An error occurred while trying to delete a hostel. Please try again. (${error.message})`)
        
    })
}

export const deleteTransport = (id, authConfig, getTransports, toast) => {
    const url = `/api/transport/delete/${id}`

    console.warn("Request Data: ", { url, data: id })

    axios({
        url,
        method: 'delete',
        baseURL: smsHost,
        headers: authConfig.headers
    }).then(response => {
        const result = response.data
        console.warn("Delete Transport Result: ", result)
        if (result.meta.status === "200" || result.meta.status === "202") {
            toast.success(`Well done! You successfully deleted a transport.`)
            getTransports()
            
        } else {
            toast.error(`Unable to delete a transport.`)
            console.log(`Unable to delete a transport. (${result.meta.message})`)
            
        }
    }).catch(error => {
        toast.error('An error occurred while trying to delete a transport. Please try again.')
        console.log(`An error occurred while trying to delete a transport. Please try again. (${error.message})`)
        
    })
}

export const deleteClient = (id, authConfig, getClients, toast) => {
    const url = `/api/client/delete/${id}`

    console.warn("Request Data: ", { url, data: id })

    axios({
        url,
        method: 'delete',
        baseURL: smsHost,
        headers: authConfig.headers
    }).then(response => {
        const result = response.data
        console.warn("Delete Client Result: ", result)
        if (result.meta.status === "200" || result.meta.status === "202") {
            toast.success(`Well done! You successfully deleted a client.`)
            getClients()
            
        } else {
            console.log(`Unable to delete a client. (${result.meta.message})`)
            toast.error(`Unable to delete a client.`)
            
        }
    }).catch(error => {
        toast.error('An error occurred while trying to delete a client. Please try again.')
        console.log(`An error occurred while trying to delete a client. Please try again. (${error.message})`)
        
    })
}

export const deleteAttendance = (id, authConfig, getAttendances, toast) => {
    const url = `/api/attendance/delete/${id}`

    console.warn("Request Data: ", { url, data: id })

    axios({
        url,
        method: 'delete',
        baseURL: smsHost,
        headers: authConfig.headers
    }).then(response => {
        const result = response.data
        console.warn("Delete Attendance Result: ", result)
        if (result.meta.status === "200" || result.meta.status === "202") {
            toast.success(`Well done! You successfully deleted an attendance.`)
            getAttendances()
            
        } else {
            console.log(`Unable to delete an attendance. (${result.meta.message})`)
            toast.error(`Unable to delete an attendance.`)
            
        }
    }).catch(error => {
        toast.error('An error occurred while trying to delete an attendance. Please try again.')
        console.log(`An error occurred while trying to delete an attendance. Please try again. (${error.message})`)
        
    })
}

export const setError = (message, dispatch) => {
    dispatch({
        type: ACTIONS.setError,
        payload: message
    })
}

export const setMessage = (message, dispatch) => {
    dispatch({
        type: ACTIONS.setMessage,
        payload: message
    })
}