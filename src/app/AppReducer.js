import * as ACTIONS from '../services/actions'
import * as USERS_REDUCER from './userReducer'
import * as CBT_REDUCER from './cbtReducer'
import * as NEWS_REDUCER from './newsReducer'

const AppReducer = (state, action) => {
    switch(action.type) {
        // Users
        case ACTIONS.getUsers:
            return USERS_REDUCER.getUsers(state, action)
        case ACTIONS.getUser:
            return USERS_REDUCER.getUser(state, action)
        case ACTIONS.usersError:
            return USERS_REDUCER.usersError(state, action)
        case ACTIONS.usersMessage:
            return USERS_REDUCER.usersMessage(state, action)
        case ACTIONS.deleteUser:
            return USERS_REDUCER.deleteUser(state, action)
        case ACTIONS.deleteAllUsers:
            return USERS_REDUCER.deleteAllUsers(state, action)
        case ACTIONS.addUser:
            return USERS_REDUCER.addUser(state, action)
        case ACTIONS.userLogIn:
            return USERS_REDUCER.userLogIn(state, action)
        case ACTIONS.userLogOut:
            return USERS_REDUCER.userLogOut(state, action)
        // Cbt
        case ACTIONS.getCbtUsers:
            return CBT_REDUCER.getCbtUsers(state, action)
        case ACTIONS.cbtUserLogIn:
            return CBT_REDUCER.cbtUserLogIn(state, action)
        case ACTIONS.cbtUserLogOut:
            return CBT_REDUCER.cbtUserLogOut(state, action)
        case ACTIONS.registerCbtUser:
            return CBT_REDUCER.registerCbtUser(state, action)
        case ACTIONS.addCbtUser:
            return CBT_REDUCER.addCbtUser(state, action)
        case ACTIONS.getCbtUser:
            return CBT_REDUCER.getCbtUser(state, action)
        case ACTIONS.deleteCbtUser:
            return CBT_REDUCER.deleteCbtUser(state, action)
        case ACTIONS.deleteAllCbtUsers:
            return CBT_REDUCER.deleteAllCbtUsers(state, action)
        // News
        case ACTIONS.getCryptos:
            return NEWS_REDUCER.getCryptos(state, action)
        case ACTIONS.getCryptoNews:
            return NEWS_REDUCER.getCryptoNews(state, action)
        case ACTIONS.getCrypto:
            return NEWS_REDUCER.getCrypto(state, action)
        case ACTIONS.getCryptoHistory:
            return NEWS_REDUCER.getCryptoHistory(state, action)
        default:
            return state
    }
}

export default AppReducer
