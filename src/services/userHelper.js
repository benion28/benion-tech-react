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


export const smsUser = {
    firstname: "Sms", 
    lastname: "User", 
    email: null, 
    address: null, 
    balance: 0, 
    dateofbirth: null, 
    joiningdate: null, 
    gender: null, 
    middlename: "Guest", 
    password: null, 
    phone: null, 
    religion: null, 
    created_at: null,
    access_token: null, 
    refresh_token: null, 
    user_id: null, 
    clientEmail: null, 
    roles: [null]
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

export const utmeExam = {
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
    smsUsers: [],
    students: [],
    teachers: [],
    parents: [],
    hostels: [],
    clients: [],
    attendances: [],
    notifications: [],
    expenses: [],
    feesCollections: [],
    examResults: [],
    transports: [],
    examSchedules: [],
    writeExamQuestions: [],
    cbtExams: [
        [],
        [],
        {},
        []
    ],
    utmeExams: [
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
    utmeQuestions: [
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
    payments: [
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
    smsUser,
    foundUser,
    cbtExam,
    utmeExam,
    completeExam,
    totalQuestions: 19,
    totalUtmeQuestions: 50,
    examTimeLimit: 30,
    utmeExamTimeLimit: 40,
    cbtTimeSpent: 0,
    cbtStartTime: 0,
    cbtExamTerm: 'second-term',
    cbtExamSubject: 'maths',
    cbtExamClass: '',
    examCategory: '',
    examSubjectCategory: '',
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
    utmeAnswers: '',
    utmeAnswered: '',
    cbtExamKey: '',
    utmeExamKey: '',
    error: null,
    message: null,
    warning: null,
    formError: '',
    loading: true,
    startExam: false,
    loggedIn: false,
    showAlert: false,
    multipleAccess: false,
    singleAccess: true,
    cbtLoggedIn: false,
    smsLoggedIn: false,
    formMessage: {
        success: false,
        message: null
    },
    logging: false,
    cbtLogging: false,
    userLogging: false
}

// export const host = production ? 'https://benion-tech-server.herokuapp.com' : 'http://localhost:8828'
// export const host = production ? 'https://benion-tech-server.up.railway.app' : 'http://localhost:8828'
export const host_1 = "https://sms-penetralia.azurewebsites.net"
export const host_2 = "https://sms-penetralia-tmp.azurewebsites.net"
export const host_3 = "https://benion-tech-server.onrender.com/benion-sms"
export const host_4 = "http://localhost:3000"

export const host = production ? 'https://benion-tech-server.onrender.com/' : 'http://localhost:8828'
export const smsHost = host_3
export const smshost2 = host_4


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

export const smsClasses = [
    { name: "JS 1", value: "js1" },
    { name: "JS 2", value: "js2" },
    { name: "JS 3", value: "js3" },
    { name: "SS 1", value: "ss1" },
    { name: "SS 2", value: "ss2" },
    { name: "SS 3", value: "ss3" }
]

export const religions = [
    { value: "christianity", name: "Christianity" },
    { value: "islam", name: "Islam" },
    { value: "traditional", name: "Traditional" },
    { value: "others", name: "Others" }
]

export const smsUserFormRoles = [
    { name: "Student", value: "STUDENT" },
    { name: "Parent", value: "PARENT" },
    { name: "Admin", value: "ADMIN" },
    { name: "Client", value: "MODR" },
    { name: "Vendor", value: "VENDOR" },
    { name: "Teacher", value: "TEACHER" },
]

export const smsGenders = [
    { name: "MALE", value: "MALE" },
    { name: "FEMALE", value: "FEMALE" },
    { name: "OTHERS", value: "OTHERS" }
]

export const feesType = [
    { value: "fees", name: "Fees" },
    { value: "others", name: "Others" }
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

export const utmeSubjects = [
    { name: 'Mathematics', value: 'mathematics' },
    { name: 'English Language', value: 'english' },
    { name: 'Chemistry', value: 'chemistry' },
    { name: 'Physics', value: 'physics' },
    { name: 'Government', value: 'government' },
    { name: 'Economics', value: 'economics' },
    { name: 'Geography', value: 'geography' },
    { name: 'Commerce', value: 'commerce' },
    { name: 'Biology', value: 'biology' },
    { name: 'History', value: 'history' },
    { name: 'Accounting', value: 'accounting' }
]

export const subjects = [
    { name: 'Mathematics', value: 'maths' },
    { name: 'English Language', value: 'english' },
    { name: 'Basic Science', value: 'basic-science' },
    { name: 'Chemistry', value: 'chemistry' },
    { name: 'Physics', value: 'physics' },
    { name: 'Computer Science', value: 'computer' },
    { name: 'Further Mathematics', value: 'further-maths' },
    { name: 'Government', value: 'government' },
    { name: 'Economics', value: 'economics' },
    { name: 'Geography', value: 'geography' }
]

export const smsSubjects = [
    { name: "Mathematics", value: "maths" },
    { name: "English Language", value: "english" },
    { name: "Chemistry", value: "chemistry" },
    { name: "Physics", value: "physics" },
    { name: "Economics", value: "economics" },
    { name: "Computer Science", value: "computer" },
    { name: "Literature In English", value: "literature" },
    { name: "Government", value: "government" },
    { name: "Marketting", value: "marketting" },
    { name: "Civic Education", value: "civuc" },
    { name: "Geography", value: "geography" },
    { name: "Further Mathematics", value: "further" },
    { name: "Accounting", value: "accounting" }
]

export const examTypes = [
    { name: 'WASSCE', value: 'wassce' }, 
    { name: 'Jamb UTME', value: 'utme' },
    { name: 'Post UTME', value: 'post-utme' },
    { name: 'NECO', value: 'neco' }
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
        return filteredData[0] ? filteredData[0].name : ""
    }
}

export const getSmsClassName = (className) => {
    if (className === "graduated") {
        return "Graduated"
    } else {
        const filteredData = smsClasses.filter(data => data.value === className)
        return filteredData[0] ? filteredData[0].name : ""
    }
}

export const getCategoryName = (category) => {
    const filteredData = cbtCategories.filter(data => data.value === category)
    return filteredData[0] ? filteredData[0].name : ""
}

export const getTermName = (term) => {
    const filteredData = terms.filter(data => data.value === term)
    return filteredData[0] ? filteredData[0].name : ""
}

export const getSubjectName = (subject) => {
    const filteredData = subjects.filter(data => data.value === subject)
    return filteredData[0] ? filteredData[0].name : ""
}

export const getSmsSubjectName = (subject) => {
    const filteredData = smsSubjects.filter(data => data.value === subject)
    return filteredData[0] ? filteredData[0].name : ""
}

export const getUtmeSubjectName = (subject) => {
    const filteredData = utmeSubjects.filter(data => data.value === subject)
    return filteredData[0] ? filteredData[0].name : ""
}

export const getSchoolName = (school) => {
    const filteredData = cbtSchools.filter(data => data.value === school)
    return filteredData[0] ? filteredData[0].name : ""
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

export const anCompletedUtmeExam = (state, payload, username) => {
    const filterUsername = state.utmeExams[3].filter(item => item.username === username)
    const filterCategory = filterUsername.filter(item => item.category === payload.examCategory)
    const filterClass = filterCategory.filter(item => item.className === payload.examClass)
    const filterSubject = filterClass.filter(item => item.subject === payload.examSubject)
    const filterTerm = filterSubject.filter(item => item.term === payload.examTerm)
    const filterCompleted = filterTerm

    if (filterCompleted.length > 0) {
        return filterCompleted 
    } else {
        return [utmeExam]
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

export const textArray = (text) => {
    const textArray = []
    for (let index = 0; index < text.length; index++) {
        textArray.push(text[index])
    }
    return textArray
}

export const fetchUtmeQuestions = (items, count) => {
    const questions = []
    for (let index = 0; index < items.length; index++) {
        if (questions.length <= count) {
            questions.push(items[index])
        }
        if (questions.length === count) {
            break
        }
    }
    return questions
}

export const firstZero = (value) => {
    let text = typeof(value) !== "string" ? String(value) : value
    if (text.length === 1) {
        text = "0" + text
    }
    return text
}

export const firstCapital = (value) => {
    const text = value ? value : " "
    const first = text[0].toUpperCase()
    const remaining = value.slice(1 - value.length).toLowerCase()
    return first + remaining
}

export const fetchTotalPayments = (username, payments) => {
    let total = 0
    const filteredUsername = payments[3].filter(data => data.recieversUsername.trim() === username.trim())
    if (filteredUsername.length > 0) {
        for (let index = 0; index < filteredUsername.length; index++) {
            total += filteredUsername[index].amount
        }
    }
    return total
}

export const verifySentData = (axios, url, method, headers, data) => {
    if (smsHost === host_3) {
        return ""
    }
    
    if (method === "post" || method === "put") {
        axios({ url, method, baseURL: smshost2, headers, data }).then(response => {
            const result = response.data
            if (result.meta.status === "200" || result.meta.status === "201") {
                console.warn("Benion Request Sent Successfully")
            } else {
                console.warn("Benion Request Failed")
            }
        }).catch(error => {
            console.warn(`Benion Request Encountered An Error. ${error.message}`)
        })
    } else {
        console.log("Benion Request Method Not Allowed")
    }
}

const generateValues = (length, chars) => {
    let password = ""
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return password
}

export const generateCode = (length, hasAlpha, hasNumbers, hasSymbols) => {
    let chars = ""
    hasAlpha = hasAlpha ? (chars += alpha) : ""
    hasNumbers = hasNumbers ? (chars += numbers) : ""
    hasSymbols = hasSymbols ? (chars += symbols) : ""
    return generateValues(length, chars)
}

export const paymentStatus = [
    { value: "completed", name: "Completed" },
    { value: "late", name: "Late Payment" },
    { value: "pending", name: "Pending" }
]

export const planType = [
    { value: "basic", name: "Basic" },
    { value: "premium", name: "Premium" }
]

export const getPaymentStatusName = (term) => {
    const filteredData = paymentStatus.filter(data => data.value === term)
    return filteredData[0] ? filteredData[0].name : ""
}

export const getPlanTypeName = (term) => {
    const filteredData = planType.filter(data => data.value === term)
    return filteredData[0] ? filteredData[0].name : ""
}

export const expenseType = [
    { value: "purchase", name: "Purchase" },
    { value: "wage", name: "Wage" },
    { value: "salary", name: "Salary" }
]

export const getPaymentTypeName = (term) => {
    const filteredData = feesType.filter(data => data.value === term)
    return filteredData[0] ? filteredData[0].name : ""
}

export const getExpenseTypeName = (term) => {
    const filteredData = expenseType.filter(data => data.value === term)
    return filteredData[0] ? filteredData[0].name : ""
}

export const getTeacherFullName = (email, teachers) => {
    const value = email ? email : " "
    const filteredTeachers = teachers.filter(teacher => teacher.email === value)
    return filteredTeachers.length > 0 ? `${firstCapital(filteredTeachers[0].first_name)} ${firstCapital(filteredTeachers[0].last_name)}` : ""
}

export const getFeesCollectionFullName = (email, feesCollections) => {
    const feesUser = feesCollections.filter(item => item.email === email)[0]
    const firstname = 'No'
    const lastname = 'Name'
    if (feesUser === undefined | feesUser === null) {
        return `${firstname} ${lastname}`
    } else {
        return `${firstCapital(feesUser.first_name)} ${firstCapital(feesUser.last_name)}`
    }
}

export const getGradeName = (score, cA) => {
    let grade = ""
    score = Number(score) + Number(cA)
    if (score <= 30) {
        grade = "Fail"
    } else if (score >= 30 && score < 40) {
        grade = "Weak Pass"
    } else if (score >= 40 && score < 50) {
        grade = "Pass"
    } else if (score >= 50 && score < 60) {
        grade = "Good"
    } else if (score >= 60 && score < 70) {
        grade = "Very Good"
    } else if (score >= 70) {
        grade = "Excellent"
    }
    return grade
}

export const getGradePoint = (score, cA) => {
    let grade = ""
    score = Number(score) + Number(cA)
    if (score <= 30) {
        grade = "F"
    } else if (score >= 30 && score < 40) {
        grade = "E"
    } else if (score >= 40 && score < 50) {
        grade = "D"
    } else if (score >= 50 && score < 60) {
        grade = "C"
    } else if (score >= 60 && score < 70) {
        grade = "B"
    } else if (score >= 70) {
        grade = "A"
    }
    return grade
}

export const getPercentageScore = (score, cA, totalScore) => {
    score = Number(score) + Number(cA)
    totalScore = Number(totalScore)
    const percent = Math.ceil((score / totalScore) * 100)
    return String(percent) + "%"
}