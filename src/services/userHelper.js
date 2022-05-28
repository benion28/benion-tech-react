const alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
const numbers = "0123456789"
const symbols = "!@#$%^&*_-)(=+{}[];:><,./?~'`"

const generatePassword = (length, chars) => {
    let password = ""
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return password
}

export const initialState = {
    users: [],
    cbtUsers: [],
    cbtExams: [],
    cbtQuestions: [],
    user: {
        firstname: null,
        lastname: null,
        username: null,
        role: null,
        token: null,
        amountBalance: null
    },
    cbtUser: {
        firstname: 'Bemshima',
        lastname: 'Iorver',
        username: null,
        role: null,
        token: null,
        password: null,
        activeExam: 'khjhjkjk',
        examTime: 29
    },
    cbtExam: {
        category: 'science',
        activeExam: '',
        examTime: 29,
        examTimeLimit: 30,
        selected: 'maths',
        username: 'benion'
    },
    error: null,
    message: null,
    loading: true,
    loggedIn: false,
    cbtLoggedIn: true
}

export const host = 'http://localhost:8828' || 'https://benion-tech-server.herokuapp.com'

export const formatAmount = (value) => {
    const dollarRate = 512
    let amount = value.toString()
    let inDollar = (Math.floor(value/dollarRate)).toString()

    if (amount.length >= 10 && amount.length <= 12) {
        let first = amount.slice(0, -9)
        let second = amount.slice(amount.length-9, amount.length-6)
        let third = amount.slice(amount.length-6, amount.length-3)
        let fourth = amount.slice(amount.length-3, amount.length)
        amount = first+","+second+","+third+","+fourth
    } else if (amount.length >= 7 && amount.length <= 9) {
        let first = amount.slice(0, -6)
        let second = amount.slice(amount.length-6, amount.length-3)
        let third = amount.slice(amount.length-3, amount.length)
        amount = first+","+second+","+third
    } else if (amount.length >= 4 && amount.length <= 6) {
        let first = amount.slice(0, -3)
        let second = amount.slice(amount.length-3, amount.length)
        amount = first+","+second
    }

    if (inDollar.length >= 10 && inDollar.length <= 12) {
        let first = inDollar.slice(0, -9)
        let second = inDollar.slice(inDollar.length-9, inDollar.length-6)
        let third = inDollar.slice(inDollar.length-6, inDollar.length-3)
        let fourth = inDollar.slice(inDollar.length-3, inDollar.length)
        inDollar = first+","+second+","+third+","+fourth
    } else if (inDollar.length >= 7 && inDollar.length <= 9) {
        let first = inDollar.slice(0, -6)
        let second = inDollar.slice(inDollar.length-6, inDollar.length-3)
        let third = inDollar.slice(inDollar.length-3, inDollar.length)
        inDollar = first+","+second+","+third
    } else if (inDollar.length >= 4 && inDollar.length <= 6) {
        let first = inDollar.slice(0, -3)
        let second = inDollar.slice(inDollar.length-3, inDollar.length)
        inDollar = first+","+second
    }

    return `${inDollar} (N${amount})`
}

export const createPassword = (length, hasNumbers, hasSymbols) => {
    let chars = alpha
    hasNumbers = hasNumbers ? (chars += numbers) : ""
    hasSymbols = hasSymbols ? (chars += symbols) : ""
    return generatePassword(length, chars)
}

export const cbtClasses = [
    { name: 'JSS 1', value: 'jss-1' },
    { name: 'JSS 2', value: 'jss-2' },
    { name: 'JSS 3', value: 'jss-3' },
    { name: 'SSS 1', value: 'sss-1' },
    { name: 'SSS 2', value: 'sss-2' },
    { name: 'SSS 3', value: 'sss-3' },
    { name: 'Graduated', value: 'graduated' }
]

export const cbtSchools = [
    { name: 'Midland Rock Dynamic School', value: 'mrds' },
    { name: 'Great Bethel International School', value: 'gbis' },
    { name: 'Key Hope Comprehensive School', value: 'khcs' },
    { name: 'Others', value: 'others' }
]