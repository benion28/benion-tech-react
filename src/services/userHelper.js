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

export const user = {
    firstname: null,
    lastname: null,
    username: null,
    role: null,
    token: null,
    amountBalance: null
}

export const cbtUser = {
    firstname: 'Cbt',
    lastname: 'User',
    username: 'cbt-user',
    category: null,
    className: 'jss-sss',
    role: 'student',
    school: 'none',
    token: null,
    creator: null,
    accessCode: null,
    password: null,
    activeExam: null,
    completed: true
}

export const cbtExam = {
    $key: null,
    category: null,
    id: null,
    className: null,
    examTime: 0,
    subject: null,
    username: null,
    answered: '',
    answers: '',
    term: null,
    completed: true,
    score: 404404
}

export const completeExam = {
    examTime: 0,
    answers: '',
    completed: false,
    score: 0
}

export const foundUser = {
    username: null,
    role: null,
    className: null,
    school: null,
    firstname: null,
    lastname: null
}

export const initialState = {
    users: [],
    cbtUsers: [],
    cbtExams: [
        [],
        [],
        {},
        []
    ],
    cbtQuestions: [
        [],
        [],
        {},
        []
    ],
    contactMessages: [
        [],
        [],
        {},
        []
    ],
    scores: [
        [],
        [],
        {},
        []
    ],
    galleryImages: [
        [],
        [],
        {},
        []
    ],
    posts: [
        [],
        [],
        {},
        []
    ],
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
    user,
    cbtUser,
    foundUser,
    cbtExam,
    completeExam,
    totalQuestions: 19,
    examTimeLimit: 30,
    cbtTimeSpent: 0,
    cbtExamTerm: 'second-term',
    cbtExamSubject: 'maths',
    cbtExamClass: '',
    examCategory: '',
    seniorExamCategory: 'general',
    juniorExamCategory: 'junior',
    tempCategory: 'jse',
    tempClassName: 'jss-1',
    tempCbtRole: 'student',
    tempCbtFirstname: 'Cbt',
    tempCbtLastname: 'User',
    tempCbtUsername: 'cbt-user',
    tempCbtSchool: 'none',
    cbtExamCompleted: true,
    advanceExam: false,
    cbtAnswers: '',
    cbtAnswered: '',
    cbtExamKey: '',
    error: null,
    message: null,
    warning: null,
    formError: '',
    loading: true,
    startExam: false,
    loggedIn: false,
    showAlert: false,
    cbtLoggedIn: false
}

// export const host = production ? 'https://benion-tech-server.herokuapp.com' : 'http://localhost:8828'
// export const host = production ? 'https://benion-tech-server.up.railway.app' : 'http://localhost:8828'
export const host = production ? 'https://benion-tech-server.onrender.com/' : 'http://localhost:8828'


export const formatAmountMillify = (value) => {
    const dollarRate = 605
    const inDollar = (Math.floor(value/dollarRate))

    return `${millify(inDollar)} (N${millify(value)})`
}

export const formatAmountManually = (value) => {
    const dollarRate = 605
    const inDollar = (Math.floor(value/dollarRate))

    return `${inDollar.toLocaleString()} (N${value.toLocaleString()})`
}

export const formatAmountManuallyOld = (value) => {
    const dollarRate = 605
    let amount = value.toString()
    let inDollar = (Math.floor(value/dollarRate)).toString()

    if (amount.length >= 10 && amount.length <= 12) {
        const first = amount.slice(0, -9)
        const second = amount.slice(amount.length-9, amount.length-6)
        const third = amount.slice(amount.length-6, amount.length-3)
        const fourth = amount.slice(amount.length-3, amount.length)
        amount = first+","+second+","+third+","+fourth
    } else if (amount.length >= 7 && amount.length <= 9) {
        const first = amount.slice(0, -6)
        const second = amount.slice(amount.length-6, amount.length-3)
        const third = amount.slice(amount.length-3, amount.length)
        amount = first+","+second+","+third
    } else if (amount.length >= 4 && amount.length <= 6) {
        const first = amount.slice(0, -3)
        const second = amount.slice(amount.length-3, amount.length)
        amount = first+","+second
    }

    if (inDollar.length >= 10 && inDollar.length <= 12) {
        const first = inDollar.slice(0, -9)
        const second = inDollar.slice(inDollar.length-9, inDollar.length-6)
        const third = inDollar.slice(inDollar.length-6, inDollar.length-3)
        const fourth = inDollar.slice(inDollar.length-3, inDollar.length)
        inDollar = first+","+second+","+third+","+fourth
    } else if (inDollar.length >= 7 && inDollar.length <= 9) {
        const first = inDollar.slice(0, -6)
        const second = inDollar.slice(inDollar.length-6, inDollar.length-3)
        const third = inDollar.slice(inDollar.length-3, inDollar.length)
        inDollar = first+","+second+","+third
    } else if (inDollar.length >= 4 && inDollar.length <= 6) {
        const first = inDollar.slice(0, -3)
        const second = inDollar.slice(inDollar.length-3, inDollar.length)
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
    { name: 'Government Secondary School TV', value: 'gsst' },
    { name: 'Victory Secondary School', value: 'vss' },
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

export const sessions = [
    { name: '2021/2022 Academic Year', value: '2021/2022' },
    { name: '2022/2023 Academic Year', value: '2022/2023' },
    { name: '2023/2024 Academic Year', value: '2023/2024' },
    { name: '2024/2025 Academic Year', value: '2024/2025' },
    { name: '2025/2026 Academic Year', value: '2025/2026' }
]

export const subjects = [
    { name: 'Mathematics', value: 'maths' },
    { name: 'English Language', value: 'english' },
    { name: 'Basic Science', value: 'basic-science' },
    { name: 'Chemistry', value: 'chemistry' },
    { name: 'Physics', value: 'physics' },
    { name: 'Further Mathematics', value: 'further-maths' },
    { name: 'Government', value: 'government' },
    { name: 'Economics', value: 'economics' },
    { name: 'Geography', value: 'geography' }
]

export const postTags = [
    { name: 'Entertainment', value: 'entertainment' }, 
    { name: 'Business', value: 'business' },
    { name: 'Culture', value: 'culture' },
    { name: 'Sport', value: 'sport' },
    { name: 'Food', value: 'food' },
    { name: 'Politics', value: 'politics' },
    { name: 'Technology', value: 'technology' },
    { name: 'Celebrity', value: 'celebrity' },
    { name: 'Travel', value: 'travel' },
    { name: 'Wildlife', value: 'wildlife' },
    { name: 'Programming', value: 'programming'},
    { name: 'Lifestyle', value: 'lifestyle' }
]

export const postCategories = [
    { name: 'News', value: 'news' }, 
    { name: 'Blog', value: 'blog' }
]

export const getClassName = (className) => {
    if (className === "graduated") {
        return "Graduated"
    } else {
        const filteredData = cbtClasses.filter(data => data.value === className)
        return filteredData[0].name
    }
}

export const getCategoryName = (category) => {
    const filteredData = cbtCategories.filter(data => data.value === category)
    return filteredData[0].name
}

export const getTermName = (term) => {
    const filteredData = terms.filter(data => data.value === term)
    return filteredData[0].name
}

export const getSubjectName = (subject) => {
    const filteredData = subjects.filter(data => data.value === subject)
    return filteredData[0].name
}

export const getSchoolName = (school) => {
    const filteredData = cbtSchools.filter(data => data.value === school)
    return filteredData[0].name
}

export const getFullName = (username, users) => {
    const cbtUser = users.filter(user => user.username === username)[0]
    const firstname = 'No'
    const lastname = 'Name'
    if (cbtUser === undefined | cbtUser === null) {
        return `${firstname} ${lastname}`
    } else {
        return `${cbtUser.firstname} ${cbtUser.lastname}`
    }
}

export const anExam = (state, payload) => {
    const filterUsername = state.cbtExams[3].filter(item => item.username === payload.username)
    const filterCompleted = filterUsername.filter(item => !item.completed)
    if (filterCompleted.length > 0) {
        return filterCompleted
    } else {
        return [cbtExam]
    }
}

export const anCompletedExam = (state, payload, username) => {
    const filterUsername = state.cbtExams[3].filter(item => item.username === username)
    const filterCategory = filterUsername.filter(item => item.category === payload.examCategory)
    const filterClass = filterCategory.filter(item => item.className === payload.examClass)
    const filterSubject = filterClass.filter(item => item.subject === payload.examSubject)
    const filterTerm = filterSubject.filter(item => item.term === payload.examTerm)
    const filterCompleted = filterTerm

    if (filterCompleted.length > 0) {
        return filterCompleted 
    } else {
        return [cbtExam]
    }
}

export const cbtUserFind = (user, state) => {
    const roleFilter = state.cbtUsers.filter(data => data.role === user.role)
    const schoolFilter = roleFilter.filter(data => data.school === user.school)
    const classFilter = schoolFilter.filter(data => data.class === user.class)
    const lastNameFilter = classFilter.filter(data => data.lastname.toLowerCase() === user.lastname.toLowerCase())
    const firstNameFilter = lastNameFilter.filter(data => data.firstname.toLowerCase() === user.firstname.toLowerCase())
    const filteredUser = firstNameFilter
    let data = {}

    if (filteredUser.length > 0) {
        data = {
            success: true,
            data: filteredUser[0]
        }
    } else {
        data = {
            success: false,
            data: {}
        }
    }

    return data
}

export const truncatePost = (post, total) => {
    const text = post.slice(0, total) + '...'
    return text
}

export const limitPosts = (posts, total) => {
    let items = []
    if (posts.length > total) {
        for (let index = 0; index < total; index++) {
            const element = posts[index]
            items.push(element)
        }
    } else {
        items = posts
    }
    return items
}