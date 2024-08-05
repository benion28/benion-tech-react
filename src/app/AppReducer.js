import * as ACTIONS from '../services/actions'
import * as USERS_REDUCER from './userReducer'
import * as SMS_REDUCER from './smsReducer'
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
        case ACTIONS.userLogging:
            return USERS_REDUCER.userLogging(state, action)
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
        case ACTIONS.getUtmeQuestions:
            return CBT_REDUCER.getUtmeQuestions(state, action)
        case ACTIONS.getUtmeExams:
            return CBT_REDUCER.getUtmeExams(state, action)
        case ACTIONS.createUtmeExam:
            return CBT_REDUCER.createUtmeExam(state, action)
        case ACTIONS.updateUtmeExam:
            return CBT_REDUCER.updateUtmeExam(state, action)
        case ACTIONS.cbtLogging:
            return CBT_REDUCER.cbtLogging(state, action)
        case ACTIONS.utmeExamSubjectCategory:
            return CBT_REDUCER.utmeExamSubjectCategory(state, action)
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
        // SMS
        case ACTIONS.smsUserLogin:
            return SMS_REDUCER.smsUserLogin(state, action)
        case ACTIONS.getStudents:
            return SMS_REDUCER.getStudents(state, action)
        case ACTIONS.getParents:
            return SMS_REDUCER.getParents(state, action)
        case ACTIONS.getTeachers:
            return SMS_REDUCER.getTeachers(state, action)
        case ACTIONS.getNotifications:
            return SMS_REDUCER.getNotifications(state, action)
        case ACTIONS.getSmsUsers:
            return SMS_REDUCER.getSmsUsers(state, action)
        case ACTIONS.getFeesCollections:
            return SMS_REDUCER.getFeesCollections(state, action)
        case ACTIONS.getExpenses:
            return SMS_REDUCER.getExpenses(state, action)
        case ACTIONS.getExamResults:
            return SMS_REDUCER.getExamResults(state, action)
        case ACTIONS.getHostels:
            return SMS_REDUCER.getHostels(state, action)
        case ACTIONS.smsUserLogout:
            return SMS_REDUCER.smsUserLogout(state, action)
        case ACTIONS.setError:
            return SMS_REDUCER.setError(state, action)
        case ACTIONS.setMessage:
            return SMS_REDUCER.setMessage(state, action)
        case ACTIONS.decryptState:
            return SMS_REDUCER.decryptState(state, action)
        case ACTIONS.getExamSchedules:
            return SMS_REDUCER.getExamSchedules(state, action)
        case ACTIONS.getTransports:
            return SMS_REDUCER.getTransports(state, action)
        case ACTIONS.getClients:
            return SMS_REDUCER.getClients(state, action)
        case ACTIONS.getAttendances:
            return SMS_REDUCER.getAttendances(state, action)
        case ACTIONS.loggingIn:
            return SMS_REDUCER.loggingIn(state, action)
        default:
            return state
    }
}

export default AppReducer
