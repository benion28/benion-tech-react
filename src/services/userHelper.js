export const initialState = {
    users: [],
    user: {
        firstname: null,
        lastname: null,
        username: null,
        role: null,
        token: null
    },
    error: null,
    message: null,
    loading: true,
    loggedIn: false
}

export const host = 'https://benion-tech-server.herokuapp.com' || 'http://localhost:8828'