import * as _ from "lodash"

const tokenExpTime = "30m"

export const smsUserLogin = (state, action) => {
    const payload = action.payload
    const modifiedState = _.extend(state, { smsUser: payload, smsLoggedIn: true })
    return modifiedState
}

export const getStudents = (state, action) => {
    const modifiedState = _.extend(state, { loggedIn: !state.user.id, students: action.payload })
    return modifiedState
}

export const getParents = (state, action) => {
    const modifiedState = _.extend(state, { loggedIn: !state.user.id, parents: action.payload })
    return modifiedState
}

export const getTeachers = (state, action) => {
    const modifiedState = _.extend(state, { loggedIn: !state.user.id, teachers: action.payload })
    return modifiedState
}

export const getNotifications = (state, action) => {
    const modifiedState = _.extend(state, { loggedIn: !state.user.id, notifications: action.payload })
    return modifiedState
}

export const getSmsUsers = (state, action) => {
    const modifiedState = _.extend(state, { loggedIn: !state.user.id, smsUsers: action.payload })
    return modifiedState
}

export const getFeesCollections = (state, action) => {
    const modifiedState = _.extend(state, { loggedIn: !state.user.id, feesCollections: action.payload })
    return modifiedState
}

export const getExpenses = (state, action) => {
    const modifiedState = _.extend(state, { loggedIn: !state.user.id, expenses: action.payload })
    return modifiedState
}

export const getExamResults = (state, action) => {
    const modifiedState = _.extend(state, { loggedIn: !state.user.id, examResults: action.payload })
    return modifiedState
}

export const getHostels = (state, action) => {
    const modifiedState = _.extend(state, { loggedIn: !state.user.id, hostels: action.payload })
    return modifiedState
}

export const getExamSchedules = (state, action) => {
    const modifiedState = _.extend(state, { loggedIn: !state.user.id, examSchedules: action.payload })
    return modifiedState
}

export const getAttendances = (state, action) => {
    const modifiedState = _.extend(state, { loggedIn: !state.user.id, attendances: action.payload })
    return modifiedState
}

export const smsUserLogout = (state, action) => {
    const payload = action.payload
    payload.loggedIn = false
    localStorage.removeItem("userAuth")
    localStorage.removeItem("userState")
    localStorage.clear()
    return _.extend(state, payload)
}

export const loggingIn = (state, action) => {
    const modifiedState = _.extend(state, { loggedIn: !state.user.id, logging: action.payload  })
    return modifiedState
}

export const decryptState = (state, action) => {
    const modifiedState = _.extend(state, action.payload)
    delete modifiedState.exp
    delete modifiedState.iat
    return modifiedState
}

export const getTransports = (state, action) => {
    const modifiedState = _.extend(state, { loggedIn: !state.user.id, transports: action.payload })
    return modifiedState
}

export const getClients = (state, action) => {
    const modifiedState = _.extend(state, { loggedIn: !state.user.id, clients: action.payload })
    return modifiedState
}

export const setError = (state, action) => {
    const modifiedState = _.extend(state, { loggedIn: !state.user.id, error: action.payload, message: null  })
    return modifiedState
}

export const setMessage = (state, action) => {
    const modifiedState = _.extend(state, { loggedIn: !state.user.id, error: null, message: action.payload  })
    return modifiedState
}