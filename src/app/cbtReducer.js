import lodash from "lodash"
import { anExam, cbtExam, cbtUser } from "../services/userHelper"

export const getCbtUsers = (state, action) => {
    return {
        ...state,
        cbtUsers: action.payload.allCbtUsers,
        loading: false
    }
}

export const getCbtExams = (state, action) => {
    return {
        ...state,
        cbtExams: action.payload,
        loading: false
    }
}

export const getCbtQuestions = (state, action) => {
    return {
        ...state,
        cbtQuestions: action.payload,
        loading: false
    }
}

export const createExam = (state, action) => {
    return {
        ...state,
        cbtExam: action.payload,
        cbtAnswers: action.payload.answers,
        cbtAnswered: action.payload.answered,
        cbtExamKey: action.payload.$key
    }
}

export const updateExam = (state, action) => {
    return {
        ...state,
        cbtExam: action.payload,
        cbtAnswers: action.payload.answers,
        cbtAnswered: action.payload.answered
    }
}

export const deleteExam = (state, action) => {
    return {
        ...state,
        cbtExams: state.cbtExams[3].filter(data => data.$key !== action.payload)
    }
}

export const examCategory = (state, action) => {
    return {
        ...state,
        cbtExam: lodash.extend(state.cbtExam, {completed: false}),
        cbtExamTerm: action.payload.examTerm,
        examCategory: action.payload.examCategory,
        cbtExamSubject: action.payload.examSubject,
        cbtExamClass: action.payload.examClass,
        startExam: true
    }
}

export const examAnswered = (state, action) => {
    return {
        ...state,
        cbtAnswers: action.payload.answers,
        cbtAnswered: action.payload.answered
    }
}

export const cbtUserLogIn = (state, action) => {
    const exams = anExam(state, action.payload)
    const exam = exams[0]
    const payload = action.payload
    return {
        ...state,
        cbtUser: lodash.extend(state.cbtUser, payload),
        cbtExam: lodash.extend(state.cbtExam, exam),
        cbtExamCompleted: exam.completed,
        cbtTimeSpent: exam.examTime,
        cbtLoggedIn: true
    }
}

export const cbtUserLogOut = (state, action) => {
    return {
        ...state,
        cbtUser,
        cbtExam,
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

export const deleteQuestion = (state, action) => {
    return {
        ...state,
        cbtQuestions: state.cbtQuestions[3].filter(question => question.$key !== action.payload)
    }
}

export const addQuestion = (state, action) => {
    return {
        ...state,
        cbtQuestions: [
            ...state.cbtQuestions,
            action.payload
        ]
    }
}