import lodash from "lodash"
import { user } from "../services/userHelper"

export const getUsers = (state, action) => {
    return {
        ...state,
        users: action.payload.allUsers,
        loading: false
    }
}

export const getUser = (state, action) => {
    return {
        ...state,
        user: action.payload,
        loading: false
    }
}

export const usersError = (state, action) => {
    return {
        ...state,
        error: action.payload
    }
}

export const usersMessage = (state, action) => {
    return {
        ...state,
        message: action.payload
    }
}

export const usersWarning = (state, action) => {
    return {
        ...state,
        warning: action.payload
    }
}

export const usersFormError = (state, action) => {
    return {
        ...state,
        formError: action.payload
    }
}

export const deleteUser = (state, action) => {
    return {
        ...state,
        users: state.users.filter(user => user._id !== action.payload)
    }
}

export const deleteAllUsers = (state, action) => {
    return {
        ...state,
        users: action.payload
    }
}

export const addUser = (state, action) => {
    return {
        ...state
    }
}

export const userLogIn = (state, action) => {
    const payload = action.payload
    return {
        ...state,
        user: lodash.extend(state.user, payload),
        loggedIn: true
    }
}

export const userLogOut = (state) => {
    return {
        ...state,
        users: [],
        user,
        loggedIn: false
    }
}

export const showAlert = (state, action) => {
    return {
        ...state,
        showAlert: action.payload
    }
}

export const getContactMessages = (state, action) => {
    return {
        ...state,
        contactMessages: action.payload,
        loading: false
    }
}

export const deleteContactMessage = (state, action) => {
    return {
        ...state
    }
}

export const getImages = (state, action) => {
    return {
        ...state,
        galleryImages: action.payload,
        loading: false
    }
}

export const userLogging = (state, action) => {
    return {
        ...state,
        userLogging: action.payload
    }
}

export const getPayments = (state, action) => {
    return {
        ...state,
        payments: action.payload,
        loading: false
    }
}

export const deletePayment = (state, action) => {
    return {
        ...state
    }
}