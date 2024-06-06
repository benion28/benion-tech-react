import lodash from "lodash"
import { anExam, cbtExam, cbtUser, completeExam, anCompletedExam } from "../services/userHelper"

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

export const findCbtUser = (state, action) => {
    return {
        ...state,
        foundUser: lodash.extend(state.foundUser, action.payload)
    }
}

export const getCbtQuestions = (state, action) => {
    return {
        ...state,
        cbtQuestions: action.payload,
        writeExamQuestions: action.payload[3].sort(() => Math.random() - 0.5),
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

export const examCategory = (state, action) => {
    const exams = anCompletedExam(state, action.payload, state.tempCbtUsername)
    const exam = exams[0]
    const completedExam = {
        examTime: exam.examTime,
        answers: exam.answers,
        completed: exam.completed,
        score: exam.score
    }

    return {
        ...state,
        cbtExam: lodash.extend(state.cbtExam, {completed: false}),
        cbtExamTerm: action.payload.examTerm,
        examCategory: action.payload.examCategory,
        cbtExamSubject: action.payload.examSubject,
        cbtExamClass: action.payload.examClass,
        startExam: exam.$key !== null && exam.completed ? false : true,
        completeExam: exam.$key !== null && exam.completed ? lodash.extend(state.completeExam, completedExam) : completeExam
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
    const loggedUser = lodash.extend(state.cbtUser, payload)

    return {
        ...state,
        cbtUser: loggedUser,
        cbtExam: lodash.extend(state.cbtExam, exam),
        cbtExamCompleted: exam.completed,
        cbtTimeSpent: exam.examTime,
        cbtLoggedIn: true,
        tempCategory: payload.className[0] === 'j' ? state.juniorExamCategory : state.seniorExamCategory,
        tempClassName: payload.className === 'graduated' ? 'sss-3' : payload.className,
        tempCbtRole: payload.role,
        tempCbtFirstname: payload.firstname,
        tempCbtLastname: payload.lastname,
        tempCbtUsername: payload.username,
        tempCbtSchool: payload.school
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

export const addQuestion = (state, action) => {
    return {
        ...state,
        cbtQuestions: [
            ...state.cbtQuestions,
            action.payload
        ]
    }
}

export const getScores = (state, action) => {
    return {
        ...state,
        scores: action.payload,
        loading: false
    }
}