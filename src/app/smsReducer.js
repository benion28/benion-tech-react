import * as _ from "lodash"

export const smsUserLogin = (state, action) => {
    const payload = action.payload
    const smsUser = _.extend(state.smsUser, payload)
    return { ...state, smsUser, smsLoggedIn: true }
}

export const getStudents = (state, action) => {
    return { ...state, students: action.payload }
}

export const getParents = (state, action) => {
    return { ...state, parents: action.payload }
}

export const getTeachers = (state, action) => {
    return { ...state, teachers: action.payload }
}

export const getNotifications = (state, action) => {
    return { ...state, notifications: action.payload }
}

export const getSmsUsers = (state, action) => {
    return { ...state, smsUsers: action.payload }
}

export const getFeesCollections = (state, action) => {
    return { ...state, feesCollections: action.payload }
}

export const getExpenses = (state, action) => {
    return { ...state, expenses: action.payload }
}

export const getExamResults = (state, action) => {
    return { ...state, examResults: action.payload }
}

export const getHostels = (state, action) => {
    return { ...state, hostels: action.payload }
}

export const getExamSchedules = (state, action) => {
    return { ...state, examSchedules: action.payload }
}

export const getAttendances = (state, action) => {
    return { ...state, attendances: action.payload }
}

export const smsUserLogout = (state, action) => {
    const payload = action.payload
    const smsUser = _.extend(state.smsUser, payload)
    return { ...state, smsUser, smsLoggedIn: false }
}

export const loggingIn = (state, action) => {
    return { ...state, logging: action.payload }
}

export const decryptState = (state, action) => {
    const modifiedState = _.extend(state, action.payload)
    delete modifiedState.exp
    delete modifiedState.iat
    return modifiedState
}

export const getTransports = (state, action) => {
    return { ...state, transports: action.payload }
}

export const getClients = (state, action) => {
    return { ...state, clients: action.payload }
}

export const setError = (state, action) => {
    return { ...state, error: action.payload }
}

export const setMessage = (state, action) => {
    return { ...state, message: action.payload }
}