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
        case ACTIONS.usersFormError:
            return USERS_REDUCER.usersFormError(state, action)
        case ACTIONS.usersMessage:
            return USERS_REDUCER.usersMessage(state, action)
        case ACTIONS.usersWarning:
            return USERS_REDUCER.usersWarning(state, action)
        case ACTIONS.deleteUser:
            return USERS_REDUCER.deleteUser(state, action)
        case ACTIONS.deleteAllUsers:
            return USERS_REDUCER.deleteAllUsers(state, action)
        case ACTIONS.userLogIn:
            return USERS_REDUCER.userLogIn(state, action)
        case ACTIONS.userLogOut:
            return USERS_REDUCER.userLogOut(state)
        case ACTIONS.showAlert:
            return USERS_REDUCER.showAlert(state, action)
        case ACTIONS.getContactMessages:
            return USERS_REDUCER.getContactMessages(state, action)
        case ACTIONS.deleteContactMessage:
            return USERS_REDUCER.deleteContactMessage(state, action)
        case ACTIONS.getImages:
            return USERS_REDUCER.getImages(state, action)
        // Cbt
        case ACTIONS.getCbtUsers:
            return CBT_REDUCER.getCbtUsers(state, action)
        case ACTIONS.cbtUserLogIn:
            return CBT_REDUCER.cbtUserLogIn(state, action)
        case ACTIONS.cbtUserLogOut:
            return CBT_REDUCER.cbtUserLogOut(state, action)
        case ACTIONS.getCbtUser:
            return CBT_REDUCER.getCbtUser(state, action)
        case ACTIONS.findCbtUser:
            return CBT_REDUCER.findCbtUser(state, action)
        case ACTIONS.deleteCbtUser:
            return CBT_REDUCER.deleteCbtUser(state, action)
        case ACTIONS.deleteAllCbtUsers:
            return CBT_REDUCER.deleteAllCbtUsers(state, action)
        case ACTIONS.getCbtExams:
            return CBT_REDUCER.getCbtExams(state, action)
        case ACTIONS.getCbtQuestions:
            return CBT_REDUCER.getCbtQuestions(state, action)
        case ACTIONS.getScores:
            return CBT_REDUCER.getScores(state, action)
        case ACTIONS.createExam:
            return CBT_REDUCER.createExam(state, action)
        case ACTIONS.updateExam:
            return CBT_REDUCER.updateExam(state, action)
        case ACTIONS.addQuestion:
            return CBT_REDUCER.addQuestion(state, action)
        case ACTIONS.examCategory:
            return CBT_REDUCER.examCategory(state, action)
        // News
        case ACTIONS.getCryptos:
            return NEWS_REDUCER.getCryptos(state, action)
        case ACTIONS.getCryptoNews:
            return NEWS_REDUCER.getCryptoNews(state, action)
        case ACTIONS.getCrypto:
            return NEWS_REDUCER.getCrypto(state, action)
        case ACTIONS.getCryptoHistory:
            return NEWS_REDUCER.getCryptoHistory(state, action)
        case ACTIONS.getPosts:
            return NEWS_REDUCER.getPosts(state, action)
        default:
            return state
    }
}

export default AppReducer
