import React, { useState, useEffect, useContext } from 'react'
import { Typography, Row, Col, Alert, Tabs, Radio, Button, Form  } from 'antd'
import Loader from 'react-loaders'
import { GlobalContext } from '../app/GlobalState'
import { createPassword, getCategoryName, getClassName, getSubjectName, production } from '../services/userHelper'
import {
    Works, AddScoreForm, ScoresTable, EditScoreForm, Scores, GenerateCodeForm, 
    ImageGallaryForm, AddPostForm, CbtAddForm, CbtPromoteForm
} from '../components'
import '../styles/ContactMessagesTable.scss'
import '../styles/CbtExam.scss'
import '../styles/Scores.scss'

const { Text } = Typography;
const { Title } = Typography
const { Item } = Form
const { Group } = Radio
const { TabPane } = Tabs

const items = [
    {}, [], [],
    [
        {
            $key: 'jghf56iop',
            name: 'Bernard Iorver',
            session: '2021/2022',
            className: 'sss-1',
            username: '2022/ADM/7345',
            subject: 'maths',
            term: 'third-term',
            exam: 50,
            total: 73,
            grade: 'A',
            comment: 'Very Good',
            firstCA: 12,
            secondCA: 11
        },
        {
            $key: 'jghf56fjytft6iop',
            name: 'Bemshima Iorver',
            session: '2021/2022',
            className: 'sss-2',
            username: '2022/ADM/62345',
            subject: 'maths',
            term: 'third-term',
            exam: 40,
            total: 63,
            grade: 'B',
            comment: 'Good',
            firstCA: 12,
            secondCA: 11
        }
    ]
]

const cbtUserUsername = '2022/ADM/62345'

 const examQuestions = [
    {
        $key: '0', 
        question: 'asfgsdkjgdfjhjklfdhgawsdsdfgjklkmmbghfbnhfg',
        optionA: 'bfhgdf',
        optionB: 'gdsgfd',
        optionC: 'etergdf',
        optionD: 'asasfsdxcz',
        answer: 'bfhgdf'
    },
    {
        $key: '1', 
        question: '1asfgsdhfgjfhdsfagdgjkfgjfgsdgdfvdffgdbvxdgvdxvxcbvcxzxvdfgdfvdvdfbvdfgvbdfv',
        optionA: '1bfhgdf',
        optionB: '1gdsgfd',
        optionC: '1etergdf',
        optionD: '1asasfsdxcz',
        answer: '1etergdf'
    },
    {
        $key: '2', 
        question: '2asfgsdhfgjfhdsfagdgjkfgjfgsdgdfvdffgdbvxdgvdxvxcbvcxzxvdfgdfvdvdfbvdfgvbdfv',
        optionA: '2bfhgdf',
        optionB: '2gdsgfd',
        optionC: '2etergdf',
        optionD: '2asasfsdxcz',
        answer: '2bfhgdf'
    },
    {
        $key: '3', 
        question: '3asfgsdhfgjfhdsfagdgjkfgjfgsdgdfvdffgdbvxdgvdxvxcbvcxzxvdfgdfvdvdfbvdfgvbdfv',
        optionA: '3bfhgdf',
        optionB: '3gdsgfd',
        optionC: '3etergdf',
        optionD: '3asasfsdxcz',
        answer: '3gdsgfd'
    }
]

const contactMessages = [
    {
        $key: '0', 
        message: 'Hello i have something to say to you 1',
        fullname: 'Bernard Iorver',
        email: 'bernard.iorver@example.com',
        date: '1/12/1992',
        time: '1:50'
    },
    {
        $key: '1', 
        message: 'Hello i have something to say to you 2',
        fullname: 'Benion Iorver',
        email: 'benion.iorver@example.com',
        date: '20/11/1995',
        time: '13:00'
    },
    {
        $key: '2', 
        message: 'Hello i have something to say to you 3',
        fullname: 'Bemshima Iorver',
        email: 'bemshima.iorver@example.com',
        date: '15/6/1993',
        time: '10:22'
    }
]

const cbtLoggedIn = true
const examTimeLimit = 30
const cbtTimeSpent = 0
const completed = false

const TestArea = () => {
    const [form] = Form.useForm()
    const { state, createExam, updateExam, userContact, cbtUserLogout } = useContext(GlobalContext)
    const [formMessage, setFormMessage] = useState('')
    const [examData, setExamData] = useState({})
    const [answered, setAnswered] = useState(state.cbtAnswered.split(","))
    const [serialNo, setSerialNo] = useState(state.cbtAnswered !== '' ? answered.length + 1 : 1)
    const [cbtExamQuestions, setCbtExamQuestions] = useState(examQuestions)
    const [answers, setAnswers] = useState(state.cbtAnswers.split(","))
    const [answer, setAnswer] = useState('')
    const [score, setScore] = useState(0)
    const [key, setKey] = useState('')
    const [formError, setFormError] = useState('')
    const [time, setTime] = useState(state.cbtTimeSpent)
    const [submitted, setSubmitted] = useState(false)
    const [updated, setUpdated] = useState(false)

    const dateTime = new Date().getTime()

    // setInterval(() => {
    //     const newTime = new Date().getTime()
    //     console.log("Old Time", dateTime)
    //     console.log("New Time", newTime)
    //     const calculatedTime = Math.floor((newTime - dateTime)/10000)
    //     setTime(calculatedTime)
    // }, 60000)

    useEffect(() => {
        const subjectFilter = cbtExamQuestions.filter(exam => exam.subject === state.cbtExamSubject)
        let allQuestions = subjectFilter
        if (state.examCategory === "sse") {
            const categoryFilter = subjectFilter.filter(exam => exam.category === "general")
            allQuestions = categoryFilter
        } else if (state.examCategory === "jse") {
            const categoryFilter = subjectFilter.filter(exam => exam.category === "junior")
            allQuestions = categoryFilter
        } else {
            const termFilter = subjectFilter.filter(exam => exam.term === state.cbtExamTerm)
            const categoryFilter = termFilter.filter(exam => exam.category === state.examCategory)
            const classFilter = categoryFilter.filter(exam => exam.className === state.cbtExamClass)
            allQuestions = classFilter
        }

        if (answered.length > 0 && state.cbtAnswered !== '') {
            const foundQuestions = []
            const otherQuestions = []
            let found = false
            for (let index = 0; index < allQuestions.length; index++) {
                for (let index2 = 0; index2 < answered.length; index2++) {
                    if (allQuestions[index].id === answered[index2]) {
                        found = true
                    }
                }
                if (!found) {
                    otherQuestions.push(allQuestions[index])
                } else {
                    foundQuestions.push(allQuestions[index])
                }

                found = false
            }

            const totalQuestions = foundQuestions.concat(otherQuestions)
            setCbtExamQuestions(totalQuestions)
        } else {
            setCbtExamQuestions(examQuestions)
        }
        
        setExamData(cbtExamQuestions[serialNo - 1])

        if (state.cbtLoggedIn && (time >= examTimeLimit)) {
            if (!submitted && ((cbtTimeSpent - time) > 0)) {
                const answersArray = answers
                answersArray[serialNo - 1] = answer
                setAnswers(answersArray)

                if (answered[serialNo - 1] === undefined) {
                    const answeredArray = answered
                    answeredArray[serialNo - 1] = key
                    setAnswered(answeredArray)
                }
                
                let mark = 0
                 for (let index = 0; index < answered.length; index++) {
                    const question = cbtExamQuestions.filter(item => item.$key === answered[index])
                    if(answers[index] === question[0].answer) {
                        mark = mark + 1
                    }
                }
                setSubmitted(true)

                const data = {
                    ...state.cbtExam,
                    id: state.cbtExam.id !== null ? state.cbtExam.id : createPassword(10, true, true, false),
                    examTime: time,
                    username: state.cbtUser.username,
                    answered: answered.toString(),
                    answers: answers.toString(),
                    completed: true,
                    timeLimit: state.examTimeLimit,
                    score: mark,
                    subject: state.cbtExamSubject,
                    term: state.cbtExamTerm,
                    className: state.cbtExamClass,
                    category: state.examCategory
                }

                if (updated) {
                    // Update
                    // updateExam(state.cbtExamKey, data)
                } else {
                    // Save
                    // createExam(data)
                }
                
                // userContact({
                //     fullname: `${state.cbtUser.firstname} ${state.cbtUser.lastname}`,
                //     email: `${state.cbtUser.firstname.toLowerCase()}-${state.cbtUser.lastname.toLowerCase()}-cbt@exams.com`,
                //     message: `I just concluded the ${getSubjectName(state.cbtExamSubject)} exams for ${getClassName(state.cbtExamClass)} of ${getCategoryName(state.examCategory)} category, i answered ${answered.length} questions and scored ${mark} (${Math.floor((mark/state.totalQuestions) * 100)}%)`
                // })
            }
        } else {
            if (!submitted && ((time - cbtTimeSpent) > 0)) {
                const data = {
                    ...state.cbtExam,
                    id: state.cbtExam.id !== null ? state.cbtExam.id : createPassword(10, true, true, false),
                    examTime: time,
                    username: state.cbtUser.username,
                    answered: answered.toString(),
                    answers: answers.toString(),
                    completed: submitted ? true : false,
                    timeLimit: state.examTimeLimit,
                    subject: state.cbtExamSubject,
                    term: state.cbtExamTerm,
                    className: state.cbtExamClass,
                    category: state.examCategory
                }
                
                if (updated) {
                    // Update
                    // updateExam(state.cbtExamKey, data)
                } else {
                    // Save
                    setUpdated(true)
                    // createExam({...data,  score: 404404})
                }
            }
        }
    }, [
        setCbtExamQuestions, setSerialNo, serialNo, state.cbtExam.category, answered, setAnswered, answer, score,
        cbtExamQuestions, state.cbtExam.answered, examData.answer, form, state.cbtAnswered, answers, key, createExam,
        state.cbtExamSubject, state.cbtExamTerm, state.examCategory, state.cbtExamClass, state.cbtUser.firstname, cbtUserLogout,
        state.cbtUser.username, state.cbtUser.lastname, state.cbtExam, state.cbtLoggedIn, state.examTimeLimit, state.cbtTimeSpent,
        state.totalQuestions, submitted, time, updateExam, userContact, updated, state.cbtAnswers, state.cbtExamKey
    ])

    const initialOption = {
        option: answers[serialNo - 1] !== null ? answers[serialNo - 1] : ''
    }
    
    const setValues = (value) => {
        setAnswer(value)
        setKey(examData.$key)
    }

    const submitAnswers = () => {
        !production && (console.log("Answers submitted successfully"))
    }

    const onFinish = (values) => {
        !production && (console.log("Cbt Exam data accepted", values))
        setFormError('')
        setFormMessage("Cbt Exam data accepted")

        // Submit Answers
        submitAnswers()
        setSubmitted(true)
        form.resetFields()
    }

    const onFinishFailed = (errorInfo) => {
        !production && (console.log("Cbt Exam data rejected", errorInfo))
        setFormMessage('')
        setFormError("Cbt Exam data rejected")
    }

    const onNext = () => {
        const answersArray = answers
        answersArray[serialNo - 1] = answer
        setAnswers(answersArray)

        const answeredArray = answered
        answeredArray[serialNo - 1] = key
        setAnswered(answeredArray)

        setSerialNo(serialNo + 1)
        // form.setFieldsValue({
        //     option: answers[serialNo] !== null ? answers[serialNo] : ''
        // })
    }

    const onPrevious = () => {
        const answersArray = answers
        answersArray[serialNo - 1] = answer
        setAnswers(answersArray)

        const answeredArray = answered
        answeredArray[serialNo - 1] = key
        setAnswered(answeredArray)

        setSerialNo(serialNo - 1)
        // form.setFieldsValue({
        //     option: answers[serialNo - 1] !== null ? answers[serialNo - 1] : ''
        // })
    }

    const examScore = () => {
        let mark = 0
        for (let index = 0; index < answered.length; index++) {
            const question = cbtExamQuestions.filter(item => item.$key === answered[index])
            if(answers[index] === question[0].answer) {
                mark = mark + 1
            }
        }
        setScore(mark)
        return mark
    }

    const onSubmit = () => {
        const answersArray = answers
        answersArray[serialNo - 1] = answer
        setAnswers(answersArray)

        if (answered[serialNo - 1] === undefined) {
            const answeredArray = answered
            answeredArray[serialNo - 1] = key
            setAnswered(answeredArray)
        }
        setSubmitted(true)

        const data = {
            ...state.cbtExam,
            id: state.cbtExam.id !== null ? state.cbtExam.id : createPassword(10, true, true, false),
            examTime: time,
            username: state.cbtUser.username,
            answered: answered.toString(),
            answers: answers.toString(),
            completed: true,
            timeLimit: state.examTimeLimit,
            score: examScore(),
            subject: state.cbtExamSubject,
            term: state.cbtExamTerm,
            className: state.cbtExamClass,
            category: state.examCategory
        }

        if (updated) {
            // Update
            // updateExam(state.cbtExamKey, data)
        } else {
            // Save
            // createExam(data)
        }
        
        // userContact({
        //     fullname: `${state.cbtUser.firstname} ${state.cbtUser.lastname}`,
        //     email: `${state.cbtUser.firstname.toLowerCase()}-${state.cbtUser.lastname.toLowerCase()}-cbt@exams.com`,
        //     message: `I just concluded the ${getSubjectName(state.cbtExamSubject)} exams for ${getClassName(state.cbtExamClass)} of ${getCategoryName(state.examCategory)} category, i answered ${answered.length} questions and scored ${examScore()} (${Math.floor((examScore()/state.totalQuestions) * 100)}%)`
        // })
    }

    return (
        <React.Fragment>
            <Row className="home-container">
                {/* {(cbtLoggedIn && !completed && !submitted) && (
                    <Col className="exams-container">
                        <Tabs defaultActiveKey="1" className="tabs-form" type="card">
                            <TabPane className="tabs-panel" tab={ <span> <Title level={5}><b>Welcome {!state.cbtExam.completed ? "Back" : ""} ({ cbtLoggedIn ? `${state.cbtUser.firstname} ${state.cbtUser.lastname}` : 'Guest User' }) - CBT Exam In Progress</b></Title> </span> } key="1">
                                <div className="time-container">
                                    <Title className="time-left" level={3}>
                                        Time Left:
                                    </Title>
                                    <span className='text-span'>
                                        <Title level={1} className={ (time < Math.floor(examTimeLimit * 0.80) ) ? "text-avatar-green" : "text-avatar-red" }>
                                            { examTimeLimit - time }
                                        </Title>
                                    </span>
                                </div>
                                { (!production || (state.user.role === 'admin' && state.showAlert)) && (
                                    <div className="form-alert">
                                        { formMessage !== '' && (
                                            <Alert message={formMessage} type="success" showIcon closable />
                                        )}
                                        { formError !== '' && (
                                            <Alert message={formError} type="error" showIcon closable />
                                        )}
                                    </div>
                                )}
                                <Form name="basic" form={ form } onFinish={ onFinish } onFinishFailed={ onFinishFailed } initialValues={initialOption} autoComplete="off">
                                    <div className="form-controller">
                                        <Item className='form-item' name='question'>
                                            <h1>
                                                <b>({ serialNo }):</b>  { examData.question }
                                            </h1>
                                        </Item>
                                    </div>
                                    <div className="form-controller">
                                        <Item className='form-item' name="option">
                                            <Group initialValue={initialOption.option} onChange={(value) => setValues(value.target.value)}>
                                                <Radio className='radio-option' value={examData.optionA}><h3> <b>(a).</b> {examData.optionA} </h3></Radio>
                                                <Radio className='radio-option' value={examData.optionB}><h3> <b>(b).</b> {examData.optionB} </h3></Radio>
                                                <Radio className='radio-option' value={examData.optionC}><h3> <b>(c).</b> {examData.optionC} </h3></Radio>
                                                <Radio className='radio-option' value={examData.optionD}><h3> <b>(d).</b> {examData.optionD} </h3></Radio>
                                            </Group>
                                        </Item>
                                    </div>
                                    <div className="button-controller">
                                        <Item>
                                            <Button disabled={serialNo <= 1} className="previous-button" type="primary" onClick={ onPrevious }>
                                                Previous
                                            </Button>
                                        </Item>
                                        <Item>
                                            <Button disabled={serialNo === state.totalQuestions} className="next-button" type="primary" onClick={ onNext }>
                                                Next
                                            </Button>
                                        </Item>
                                        <Item>
                                            <Button disabled={(serialNo !== state.totalQuestions) && time < 5} className="submit-button" type="danger" onClick={ onSubmit }>
                                                Submit
                                            </Button>
                                        </Item>
                                    </div>
                                </Form>
                            </TabPane>
                        </Tabs>
                    </Col>
                )}
                <div className="exams-container">
                    <Tabs defaultActiveKey="1" className="tabs-form" type="card">
                        <TabPane className="tabs-panel" tab={ <span> <Title level={4}>CBT Exam Completed</Title> </span> } key="1">
                            <Alert 
                                className="information-alert-form" 
                                message="Exam Submitted Successfully  !!!" 
                                description={ `CONGRATULATIONS Benion Benifresh !!! You answered 99 questions and scored 70 96% in 10 minutes` } 
                                type="info" 
                                showIcon 
                            />
                            <h3 className="alert-link">
                                You are now logged out, you can return back to the <a href="/benion-cbt">Log In Page</a> to take another exam
                            </h3>
                        </TabPane>
                    </Tabs>
                </div>
                {(cbtLoggedIn && submitted) && (
                    <Col className="exams-container">
                        <Tabs defaultActiveKey="1" className="tabs-form" type="card">
                            <TabPane className="tabs-panel" tab={ <span> <Title level={4}>CBT Exam Completed</Title> </span> } key="1">
                                <Alert 
                                    className="information-alert-form" 
                                    message="Exam Submitted Successfully  !!!" 
                                    description={ `CONGRATULATIONS ${state.cbtUser.firstname} ${state.cbtUser.lastname} !!! You answered ${answered.length} questions and scored ${score} (${Math.floor((score/state.totalQuestions) * 100)}%) in ${time} minutes` } 
                                    type="info" 
                                    showIcon 
                                />
                                <h3 className="alert-link">
                                    You are now logged out, you can return back to the <a href="/benion-cbt">Log In Page</a> to take another exam
                                </h3>
                            </TabPane>
                        </Tabs>
                    </Col>
                )} */}
            </Row>
            {/* <Works /> */}
            {/* <ScoresTable /> */}
            {/* <AddScoreForm /> */}
            {/* <EditScoreForm /> */}
            {/* <Scores /> */}
            {/* <GenerateCodeForm /> */}
            {/* <ImageGallaryForm /> */}
            {/* <AddPostForm />
            <CbtAddForm /> */}
            <CbtPromoteForm />
            <Loader type="pacman" />
        </React.Fragment>
    )
}
export default TestArea

