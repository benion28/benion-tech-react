import millify from "millify"

const alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
const numbers = "0123456789"
const symbols = "!@#$%^&*_-)(=+{}[];:><,./?~'`"

export const production = true

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
    cryptos: { 
        stats: {
            totalCoins: null, 
            totalExchanges: null, 
            totalMarketCap: null, 
            total24hVolume: null, 
            totalMarkets: null
        }, 
        coins: []
    },
    news: {
        cryptoNews: {
            value: []
        },
        bingNews: {
            value: []
        }
    },
    crypto: {
        name: "Crypto",
        description: "Hello Crypto",
        symbol: "SYM",
        price: 0,
        marketCap: 0,
        rank: 0,
        "24hVolume": 0,
        allTimeHigh: {
            price: 0
        },
        supply: { 
            total: 0, 
            circulating: 0 
        },
        links: []
    },
    cryptoHistory: [],
    user: {
        firstname: null,
        lastname: null,
        username: null,
        role: null,
        token: null,
        amountBalance: null
    },
    cbtUser: {
        firstname: null,
        lastname: null,
        username: null,
        role: null,
        token: null,
        creator: null,
        accessCode: null,
        password: null,
        activeExam: null,
        completed: false
    },
    cbtExam: {
        category: 'science',
        id: 'jhgfjh',
        examTime: 10,
        selected: 'maths',
        username: 'benion',
        answered: '1,3',
        answers: '1vghfhfghn,3gfghfhgg',
        completed: false
    },
    totalQuestions: 20,
    examTimeLimit: 30,
    examCategory: 'science',
    error: null,
    message: null,
    loading: true,
    loggedIn: false,
    showAlert: false,
    cbtLoggedIn: false
}

export const host = production ? 'https://benion-tech-server.herokuapp.com' : 'http://localhost:8828'

export const formatAmountMillify = (value) => {
    const dollarRate = 512
    let inDollar = (Math.floor(value/dollarRate))

    return `${millify(inDollar)} (N${millify(value)})`
}

export const formatAmountManually = (value) => {
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

export const createPassword = (length, hasAlpha, hasNumbers, hasSymbols) => {
    let chars = ""
    hasAlpha = hasAlpha ? (chars += alpha) : ""
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
    { name: 'SSS 3', value: 'sss-3' }
]

export const cbtSchools = [
    { name: 'Midland Rock Dynamic School', value: 'mrds' },
    { name: 'Great Bethel International School', value: 'gbis' },
    { name: 'Key Hope Comprehensive School', value: 'khcs' },
    { name: 'Others', value: 'others' }
]

export const cbtRoles = [
    { name: 'Admin', value: 'admin' },
    { name: 'Moderator', value: 'moderator' },
    { name: 'Student', value: 'student' }
]

export const userRoles = [
    { name: 'Admin', value: 'admin' },
    { name: 'Guest', value: 'guest' }
]

export const cbtCategories = [
    { name: 'General', value: 'general' },
    { name: 'Junior', value: 'junior' },
    { name: 'Science', value: 'science' },
    { name: 'Arts', value: 'arts' },
    { name: 'Commercial', value: 'commercial' }
]

export const genders = [
    { name: 'Male', value: 'male' },
    { name: 'Female', value: 'female' },
    { name: 'Others', value: 'others' }
]

export const terms = [
    { name: '1st Term', value: 'first-term' },
    { name: '2nd Term', value: 'second-term' },
    { name: '3rd Term', value: 'third-term' }
]

export const subjects = [
    { name: 'Mathematics', value: 'maths' },
    { name: 'English Language', value: 'english' },
    { name: 'Chemistry', value: 'chemistry' },
    { name: 'Physics', value: 'physics' },
    { name: 'Basic Science', value: 'b-science' },
    { name: 'Government', value: 'government' },
    { name: 'Economics', value: 'economics' }
]