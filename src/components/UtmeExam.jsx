import React, { useState, useEffect, useContext } from 'react'
import { Typography, Row, Col, Alert, Tabs, Radio, Button, Form  } from 'antd'
import Loader from 'react-loaders'
import HTMLReactParser from "html-react-parser"
import { GlobalContext } from '../app/GlobalState'
import { createPassword, fetchUtmeQuestions, firstZero, getUtmeSubjectName, production } from '../services/userHelper'
import '../styles/CbtExam.scss'

const { Fragment } = React
const { Title } = Typography
const { Item } = Form
const { Group } = Radio
const { TabPane } = Tabs

const UtmeExam = () => {
    const [form] = Form.useForm()
    const { state, createUtmeExam, userContact, cbtUserLogout } = useContext(GlobalContext)
    const [formMessage, setFormMessage] = useState('')
    const [examData, setExamData] = useState({ question: "", optionA: "", optionB: "", optionC: "", optionD: "", answer: "", subject: ""})
    const [answered, setAnswered] = useState(state.cbtAnswered.split(","))
    const [serialNo, setSerialNo] = useState(state.cbtAnswered !== '' ? answered.length + 1 : 1)
    const [cbtExamQuestions, setCbtExamQuestions] = useState(state?.writeExamQuestions)
    const [answers, setAnswers] = useState(state.cbtAnswers.split(","))
    const [answer, setAnswer] = useState('')
    const [score, setScore] = useState({ mark: 0, mark1: 0, mark2: 0, mark3: 0, mark4: 0 })
    const [key, setKey] = useState('')
    const [formError, setFormError] = useState('')
    const [time, setTime] = useState(state.cbtTimeSpent)
    const [submitted, setSubmitted] = useState(false)
    const [updated, setUpdated] = useState(false)

    const { examSubjectCategory, cbtStartTime  } = state

    setInterval(() => {
        const currentTime = new Date().getTime()
        const timeDifference = Math.floor((currentTime - cbtStartTime) / 60000)
        setTime(timeDifference)
    }, 60000)

    useEffect(() => {
        const englishFilter = cbtExamQuestions.filter(exam => exam.subject === examSubjectCategory.subject1)
        const subject2Filter = cbtExamQuestions.filter(exam => exam.subject === examSubjectCategory.subject2)
        const subject3Filter = cbtExamQuestions.filter(exam => exam.subject === examSubjectCategory.subject3)
        const subject4Filter = cbtExamQuestions.filter(exam => exam.subject === examSubjectCategory.subject4)

        const englishQuestions = fetchUtmeQuestions(englishFilter, 20)
        const subject2Questions = fetchUtmeQuestions(subject2Filter, 10)
        const subject3Questions = fetchUtmeQuestions(subject3Filter, 10)
        const subject4Questions = fetchUtmeQuestions(subject4Filter, 10)

        let allQuestions = [...englishQuestions, ...subject2Questions, ...subject3Questions, ...subject4Questions]  

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
            setCbtExamQuestions(allQuestions)
        }
        
        setExamData(cbtExamQuestions[serialNo - 1])

        const getExamData = (mark, mark1, mark2, mark3, mark4) => {
            return {
                ...state.cbtExam,
                id: state.cbtExam.id !== null ? state.cbtExam.id : createPassword(10, true, true, false),
                examTime: time,
                username: state.tempCbtUsername,
                answered: answered.toString(),
                answers: answers.toString(),
                completed: submitted ? true : false,
                timeLimit: state.examTimeLimit,
                score: mark,
                score1: mark1,
                score2: mark2,
                score3: mark3,
                score4: mark4,
                subject1: examSubjectCategory.subject1,
                subject2: examSubjectCategory.subject2,
                subject3: examSubjectCategory.subject3,
                subject4: examSubjectCategory.subject4
            }
        }

        if (state.cbtLoggedIn && (time >= state.examTimeLimit)) {
            if (!submitted && ((state.cbtTimeSpent - time) > 0)) {
                const answersArray = answers
                answersArray[serialNo - 1] = answer
                setAnswers(answersArray)

                if (answered[serialNo - 1] === undefined) {
                    const answeredArray = answered
                    answeredArray[serialNo - 1] = key
                    setAnswered(answeredArray)
                }
                
                let mark = 0
                let mark1 = 0
                let mark2 = 0
                let mark3 = 0
                let mark4 = 0
                 for (let index = 0; index < answered.length; index++) {
                    const question = cbtExamQuestions.filter(item => item.$key === answered[index])
                    if(answers[index].trim() === question[0].answer.trim()) {
                        if (question[0].subject === examSubjectCategory.subject1) {
                            mark1 = mark1 + 1
                        }
                        if (question[0].subject === examSubjectCategory.subject2) {
                            mark2 = mark2 + 1
                        }
                        if (question[0].subject === examSubjectCategory.subject3) {
                            mark3 = mark3 + 1
                        }
                        if (question[0].subject === examSubjectCategory.subject4) {
                            mark4 = mark4 + 1
                        }
                        mark = mark + 1
                    }
                }
                setSubmitted(true)

                const data = getExamData(mark, mark1, mark2, mark3, mark4)

                // if (updated) {
                //     // Update
                //     updateExam(state.cbtExamKey, data)
                // } else {
                //     // Save
                //     createExam(data)
                // }

                createUtmeExam(data)

                userContact({
                    fullname: `${state.tempCbtFirstname} ${state.tempCbtLastname}`,
                    title: 'Benion-Tech-CBT',
                    email: `${state.tempCbtFirstname.trim().toLowerCase()}-${state.tempCbtLastname.trim().toLowerCase()}-cbt@exams.com`,
                    message: `I just concluded the UTME Test Exams from Penetralia Hub, and i answered ${answered.length} questions and scored ${mark} (${Math.floor((mark/state.totalQuestions) * 100)}%).
                    Aggregate score as follows ${getUtmeSubjectName(examSubjectCategory.subject1)}: ${data.mark1}, ${getUtmeSubjectName(examSubjectCategory.subject2)}: ${data.mark2}, ${getUtmeSubjectName(examSubjectCategory.subject3)}: ${data.mark3}, ${getUtmeSubjectName(examSubjectCategory.subject4)}: ${data.mark4}.`
                })

                cbtUserLogout()
            }
        } else {
            // if (!submitted && ((time - state.cbtTimeSpent) > 0)) {
            //     let mark = 0
            //     let mark1 = 0
            //     let mark2 = 0
            //     let mark3 = 0
            //     let mark4 = 0
            //      for (let index = 0; index < answered.length; index++) {
            //         const question = cbtExamQuestions.filter(item => item.$key === answered[index])
            //         if(answers[index].trim() === question[0].answer.trim()) {
            //             if (question[0].subject === examSubjectCategory.subject1) {
            //                 mark1 = mark1 + 1
            //             }
            //             if (question[0].subject === examSubjectCategory.subject2) {
            //                 mark2 = mark2 + 1
            //             }
            //             if (question[0].subject === examSubjectCategory.subject3) {
            //                 mark3 = mark3 + 1
            //             }
            //             if (question[0].subject === examSubjectCategory.subject4) {
            //                 mark4 = mark4 + 1
            //             }
            //             mark = mark + 1
            //         }
            //     }
            //     const data = getExamData(mark, mark1, mark2, mark3, mark4)

            //     if (updated) {
            //         // Update
            //         // updateExam(state.cbtExamKey, data)
            //     } else {
            //         // Save
            //         // setUpdated(true)
            //         // createExam({...data,  score: 404404})
            //     }
            //     cbtUserLogout()
            // }
        }
    }, [
        setCbtExamQuestions, setSerialNo, serialNo, state.cbtExam.category, answered, setAnswered, answer, score, state.tempCbtLastname,
        cbtExamQuestions, state.cbtExam.answered, form, state.cbtAnswered, answers, key, createUtmeExam, state.tempCbtUsername, examSubjectCategory,
        state.cbtExamSubject, state.cbtExamTerm, state.examCategory, state.cbtExamClass, state.cbtUser.firstname, cbtUserLogout,
        state.cbtUser.username, state.cbtUser.lastname, state.cbtExam, state.cbtLoggedIn, state.examTimeLimit, state.cbtTimeSpent,
        state.totalQuestions, submitted, time, userContact, updated, state.cbtAnswers, state.cbtExamKey, state.tempCbtFirstname
    ])

    // const initialOption = {
    //     option: answers[serialNo - 1] !== null ? answers[serialNo - 1] : ''
    // }

    // form.setFields(initialOption)
    
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
        form.resetFields()
        // form.setFields({
        //     option: answers[serialNo - 1] !== null ? answers[serialNo - 1] : ''
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
        form.resetFields()
        // form.setFields({
        //     option: answers[serialNo - 1] !== null ? answers[serialNo - 1] : ''
        // })
    }

    const examScore = () => {
        let mark = 0
        let mark1 = 0
        let mark2 = 0
        let mark3 = 0
        let mark4 = 0
        for (let index = 0; index < answered.length; index++) {
            const question = cbtExamQuestions.filter(item => item.$key === answered[index])
            if(answers[index].trim() === question[0].answer.trim()) {
                if (question[0].subject === examSubjectCategory.subject1) {
                    mark1 = mark1 + 1
                }
                if (question[0].subject === examSubjectCategory.subject2) {
                    mark2 = mark2 + 1
                }
                if (question[0].subject === examSubjectCategory.subject3) {
                    mark3 = mark3 + 1
                }
                if (question[0].subject === examSubjectCategory.subject4) {
                    mark4 = mark4 + 1
                }
                mark = mark + 1
            }
        }
        const markData = { mark, mark1, mark2, mark3, mark4}
        setScore(markData)
        return markData
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
            username: state.tempCbtUsername,
            answered: answered.toString(),
            answers: answers.toString(),
            completed: true,
            timeLimit: state.examTimeLimit,
            score: examScore().mark,
            score1: examScore().mark1,
            score2: examScore().mark2,
            score3: examScore().mark3,
            score4: examScore().mark4,
            subject1: examSubjectCategory.subject1,
            subject2: examSubjectCategory.subject2,
            subject3: examSubjectCategory.subject3,
            subject4: examSubjectCategory.subject4
        }

        // if (updated) {
        //     // Update
        //     updateExam(state.cbtExamKey, data)
        // } else {
        //     // Save
        //     createExam(data)
        // }

        createUtmeExam(data)

        userContact({
            fullname: `${state.tempCbtFirstname} ${state.tempCbtLastname}`,
            email: `${state.tempCbtFirstname.trim().toLowerCase()}-${state.tempCbtLastname.trim().toLowerCase()}-cbt@exams.com`,
            message: `I just concluded the UTME Test Exams from Penetralia Hub, and i answered ${answered.length} questions and scored ${examScore().mark} (${Math.floor((examScore().mark/state.totalQuestions) * 100)}%).
            Aggregate score as follows ${getUtmeSubjectName(data.subject1)}: ${data.score1}, ${getUtmeSubjectName(data.subject2)}: ${data.score2}, ${getUtmeSubjectName(data.subject3)}: ${data.score3}, ${getUtmeSubjectName(data.subject4)}: ${data.score4}.`
        })

        // cbtUserLogout()
    }

    return (
        <Fragment>
            <Row className="home-container">
                {(state.cbtLoggedIn && !state.cbtExam.completed && !submitted) && (
                    <Col className="exams-container">
                        <Tabs defaultActiveKey="1" className="tabs-form" type="card">
                            <TabPane className="tabs-panel" tab={ <span> <Title level={5}><b>Welcome {!state.cbtExam.completed ? "Back" : ""} ({ state.cbtLoggedIn ? `${state.tempCbtFirstname} ${state.tempCbtLastname}` : 'Guest User' }) - { examData.subject.toLocaleUpperCase() } Exam In Progress</b></Title> </span> } key="1">
                                <div className="time-container">
                                    <Title className="time-left" level={3}>
                                        Time Left:
                                    </Title>
                                    <span className='text-span'>
                                        <Title level={5} className={ (time < Math.floor(state.examTimeLimit * 0.80) ) ? "text-avatar-green" : "text-avatar-red" }>
                                            { `${firstZero(state.examTimeLimit - time)} M` }
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
                                <Form name="basic" form={ form } onFinish={ onFinish } onFinishFailed={ onFinishFailed } autoComplete="off">
                                    <div className="form-controller">
                                        <Item className='form-item' name='question'>
                                            { examData.image !== "" && (
                                                <img src={examData.image} className='question-logo' alt={examData.question} />
                                            )}
                                            <h2>
                                                <b>({ serialNo }):</b>  { HTMLReactParser(examData.question) }
                                            </h2>
                                            <h3>
                                                (<b><i> {examData.examType } {examData.examYear} </i></b>):
                                            </h3>
                                        </Item>
                                    </div>
                                    <div className="form-controller">
                                        <Item className='form-item' name="option">
                                            <Group value={answers[serialNo - 1]} onChange={(value) => setValues(value.target.value)}>
                                                <Radio className='radio-option' value="a"><h3> <b>(a).</b> {HTMLReactParser(examData.optionA)} </h3></Radio>
                                                <Radio className='radio-option' value="b"><h3> <b>(b).</b> {HTMLReactParser(examData.optionB)} </h3></Radio>
                                                <Radio className='radio-option' value="c"><h3> <b>(c).</b> {HTMLReactParser(examData.optionC)} </h3></Radio>
                                                <Radio className='radio-option' value="d"><h3> <b>(d).</b> {HTMLReactParser(examData.optionD)} </h3></Radio>
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
                                            <Button disabled={(serialNo !== state.totalQuestions) && time < Math.floor(state.examTimeLimit * 0.80)} className="submit-button" type="primary" danger onClick={ onSubmit }>
                                                Submit
                                            </Button>
                                        </Item>
                                    </div>
                                </Form>
                            </TabPane>
                        </Tabs>
                    </Col>
                )}
                {(state.cbtLoggedIn && submitted) && (
                    <Col className="exams-container">
                        <Tabs defaultActiveKey="1" className="tabs-form" type="card">
                            <TabPane className="tabs-panel" tab={ <span> <Title level={4}>CBT Exam Completed</Title> </span> } key="1">
                                <Alert 
                                    className="information-alert-form" 
                                    message="Exam Submitted Successfully  !!!" 
                                    description={ `CONGRATULATIONS ${state.tempCbtFirstname.toUpperCase()} ${state.tempCbtLastname.toUpperCase()} !!! You answered ${answered.length} questions and scored ${score.mark} (${Math.floor((score.mark/state.totalQuestions) * 100)}%) in ${time} minutes.
                                    Aggregate score as follows ${getUtmeSubjectName(examSubjectCategory.subject1)}: ${score.mark1}, ${getUtmeSubjectName(examSubjectCategory.subject2)}: ${score.mark2}, ${getUtmeSubjectName(examSubjectCategory.subject3)}: ${score.mark3}, ${getUtmeSubjectName(examSubjectCategory.subject4)}: ${score.mark4}.` } 
                                    type="info" 
                                    showIcon 
                                />
                                <h3 className="alert-link">
                                    You are now logged out, you can return back to the <a href="/">Log In Page</a> to take another exam
                                </h3>
                            </TabPane>
                        </Tabs>
                    </Col>
                )}
            </Row>
            <Loader type="pacman" />
        </Fragment>
    )
}

export default UtmeExam

