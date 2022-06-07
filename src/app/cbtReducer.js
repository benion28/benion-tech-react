export const getCbtUsers = (state, action) => {
    return {
        ...state,
        cbtUsers: action.payload.allCbtUsers,
        loading: false
    }
}

export const cbtUserLogIn = (state, action) => {
    return {
        ...state,
        cbtUser: action.payload,
        cbtLoggedIn: true
    }
}

export const cbtUserLogOut = (state, action) => {
    return {
        ...state,
        cbtUsers: [],
        cbtUser: {},
        cbtLoggedIn: false
    }
}

export const registerCbtUser = (state, action) => {
    return {
        ...state,
        cbtUsers: [
            ...state.cbtUsers,
            action.payload.user
        ]
    }
}

export const addCbtUser = (state, action) => {
    return {
        ...state,
        cbtUsers: [
            ...state.cbtUsers,
            action.payload.user
        ]
    }
}

export const getCbtUser = (state, action) => {
    return {
        ...state,
        cbtUser: action.payload,
        loading: false
    }
}

export const deleteCbtUser = (state, action) => {
    return {
        ...state,
        cbtUsers: state.cbtUsers.filter(user => user._id !== action.payload)
    }
}

export const deleteAllCbtUsers = (state, action) => {
    return {
        ...state,
        cbtUsers: action.payload
    }
}