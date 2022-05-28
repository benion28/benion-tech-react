export const getUsers = (state, action) => {
    return {
        ...state,
        users: action.payload,
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
        ...state,
        users: [
            ...state.users,
            action.payload
        ]
    }
}

export const userLogIn = (state, action) => {
    return {
        ...state,
        user: action.payload,
        loggedIn: true
    }
}

export const userLogOut = (state, action) => {
    return {
        ...state,
        users: [],
        user: {},
        loggedIn: false
    }
}

export const updateUser = (state, action) => {
    return {
        ...state,
        users: [
            ...state.users.filter(user => user._id !== action.payload.id),
            action.payload.user
        ]
    }
}
