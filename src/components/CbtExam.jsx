import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AnimateText } from '../components'
import { Typography, Row, Col, Image, Alert, Tabs, Radio, Button, Form  } from 'antd'
import Loader from 'react-loaders'
import benionTechIcon from '../images/benion-tech-icon.png'
import { GlobalContext } from '../app/GlobalState'
import { production } from '../services/userHelper'
import '../styles/CbtExam.scss'

const { Title } = Typography
const { Item } = Form
const { Group } = Radio
const { TabPane } = Tabs

 const examQuestions = [
         {
            id: '0', 
            question: 'asfgsdkjgdfjhjklfdhgawsdsdfgjklkmmbghfbnhfg',
            optionA: 'bfhgdf',
            optionB: 'gdsgfd',
            optionC: 'etergdf',
            optionD: 'asasfsdxcz',
            answer: 'bfhgdf'
        },
        {
            id: '1', 
            question: '1asfgsdhfgjfhdsfagdgjkfgjfgsdgdfvdffgdbvxdgvdxvxcbvcxzxvdfgdfvdvdfbvdfgvbdfv',
            optionA: '1bfhgdf',
            optionB: '1gdsgfd',
            optionC: '1etergdf',
            optionD: '1asasfsdxcz',
            answer: '1etergdf'
        },
        {
            id: '2', 
            question: '2asfgsdhfgjfhdsfagdgjkfgjfgsdgdfvdffgdbvxdgvdxvxcbvcxzxvdfgdfvdvdfbvdfgvbdfv',
            optionA: '2bfhgdf',
            optionB: '2gdsgfd',
            optionC: '2etergdf',
            optionD: '2asasfsdxcz',
            answer: '2bfhgdf'
        },
        {
            id: '3', 
            question: '3asfgsdhfgjfhdsfagdgjkfgjfgsdgdfvdffgdbvxdgvdxvxcbvcxzxvdfgdfvdvdfbvdfgvbdfv',
            optionA: '3bfhgdf',
            optionB: '3gdsgfd',
            optionC: '3etergdf',
            optionD: '3asasfsdxcz',
            answer: '3gdsgfd'
        }
     ]

const CbtExam = () => {
    const [form] = Form.useForm()
    const { state, createExam, updateExam } = useContext(GlobalContext)
    const [formMessage, setFormMessage] = useState('')
    const [examData, setExamData] = useState({})
    const [answered, setAnswered] = useState(state.cbtExam.answered.split(","))
    const [serialNo, setSerialNo] = useState(answered.length + 1)
    const [cbtExamQuestions, setCbtExamQuestions] = useState(examQuestions)
    const [answers, setAnswers] = useState(state.cbtExam.answers.split(","))
    const [answer, setAnswer] = useState('')
    const [formError, setFormError] = useState('')
    const [time, setTime] = useState(state.cbtExam.examTime)
    const [submitted, setSubmitted] = useState(false)

    const [ letterClass, setLetterClass ] = useState('text-animate')
    const nameArray = ['C', 'B', 'T', ' ', 'E', 'x', 'a', 'm', ' ', 'C', 'e', 'n', 't', 'e', 'r']
    const techArray = ['B', 'e', 'n', 'i', 'o', 'n', '-', 'T', 'e', 'c', 'h']
    const greeting1 = ['H', 'e', 'l', 'l', 'o', ',']
    const greeting2 = ['W', 'e', 'l', 'c', 'o', 'm', 'e', ' ', 't', 'o']

    setInterval(() => {
        setTime(time + 1)

        if (time >= state.examTimeLimit) {
            setSubmitted(true)
        }

        if (submitted && state.cbtLoggedIn) {
            onSubmit()
        }
    }, 60000)

    useEffect(() => {
        setTimeout(() => {
            setLetterClass('text-animate-hover')
        }, 5000)
        
        // const allQuestions = cbtExamQuestions.filter(exam => exam.category === state.examCategory)
        const allQuestions = examQuestions

        if (answered.length > 0) {
            let foundQuestions = []
            let otherQuestions = []
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
    }, [setCbtExamQuestions, setSerialNo, serialNo, state.cbtExam.category, answered, setAnswered, cbtExamQuestions, state.cbtExam.answered])

    const submitAnswers = () => {
        !production && (console.log("Answers submitted successfully"))
    }

    const onFinish = async (values) => {
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

    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: 'This is not a valid email!',
            number: 'This is not a valid number!',
        }
    }

    const onNext = () => {
        const answersArray = answers
        answersArray[serialNo - 1] = answer
        setAnswers(answersArray)

        if (answered[serialNo - 1] === undefined) {
            const answeredArray = answered
            answeredArray[serialNo - 1] = examData.id
            setAnswered(answeredArray)
        }

        form.resetFields()
        setSerialNo(serialNo + 1)
    }

    const onPrevious = () => {
        const answersArray = answers
        answersArray[serialNo - 1] = answer
        setAnswers(answersArray)

        const answeredArray = answered
        answeredArray[serialNo - 1] = examData.id
        setAnswered(answeredArray)

        form.resetFields()
        setSerialNo(serialNo - 1)
    }

    const onSubmit = () => {
        console.log("Cbt Answered", answered.toString())
        console.log("Cbt Answers", answers.toString())

        const data = {
            ...state.cbtExam,
            examTime: time,
            username: state.cbtUser.username,
            answered: answered.toString(),
            answers: answers.toString(),
            completed: true
        }

        if (state.cbtExam.id !== undefined) {
            const values = {
                ...data,
                id: state.cbtExam.id,
                activeExam: state.cbtExam.id
            }
            // Update Exam
            updateExam(values)
        } else {
            // Create Exam
            createExam(data)
        }
    }

    //  form.setFieldsValue({
    //     question: questionNumber
    //  })

    return (
        <React.Fragment>
             <Title level={2} className="text"><b>Exam Dashboard:</b> Welcome {!state.cbtUser.completed ? "Back" : ""} ({ state.cbtLoggedIn ? `${state.cbtUser.firstname} ${state.cbtUser.lastname}` : 'Guest User' })</Title>
            <Row className="home-container">
                <Col className="home-items">
                    <Title className="text-title" level={2}><AnimateText letterClass={letterClass} stringArray={greeting1} index={7} /></Title>
                    <Title className="text-title" level={2}><AnimateText letterClass={letterClass} stringArray={greeting2} index={10} /></Title>
                    <Image className="image-title"src={benionTechIcon} />
                    <Title className="text-title" level={2}><AnimateText letterClass={letterClass} stringArray={techArray} index={15} /></Title>
                    <Title className="text-title" level={3}><AnimateText letterClass={letterClass} stringArray={nameArray} index={25} /></Title>
                </Col>
                {(state.cbtLoggedIn && !state.cbtUser.completed && !submitted) && (
                    <Col className="exams-container">
                        <Tabs defaultActiveKey="1" className="tabs-form" type="card">
                            <TabPane className="tabs-panel" tab={ <span> <Title level={4}>CBT Exam In Progress</Title> </span> } key="1">
                                <div className="time-container">
                                    <Title className="time-left" level={3}>
                                        Time Left:
                                    </Title>
                                    <span className='text-span'>
                                        <Title level={1} className={ (time < Math.floor(state.examTimeLimit * 0.80) ) ? "text-avatar-green" : "text-avatar-red" }>
                                            { state.examTimeLimit - time }
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
                                <Form name="basic" form={ form } validateMessages={ validateMessages } initialValues={{ remember: true }} onFinish={ onFinish } onFinishFailed={ onFinishFailed } autoComplete="off">
                                    <div className="form-controller">
                                        <Item className='form-item' name='question'>
                                            <h1>
                                                <b>({ serialNo }):</b>  { examData.question }
                                            </h1>
                                        </Item>
                                    </div>
                                    <div className="form-controller">
                                        <Item className='form-item' name="option" rules={[ { required: true } ]}>
                                            <Group defaultValue={examData.answer} onChange={(value) => setAnswer(value.target.value)}>
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
                {(state.cbtLoggedIn && submitted) && (
                    <Col className="exams-container">
                        <Tabs defaultActiveKey="1" className="tabs-form" type="card">
                            <TabPane className="tabs-panel" tab={ <span> <Title level={4}>CBT Exam Completed</Title> </span> } key="1">
                                <Alert 
                                    className="information-alert-form" 
                                    message="Exam Submitted Successfully  !!!" 
                                    description={ `You scored ${state.cbtExam.examTimeLimit}%` } 
                                    type="info" 
                                    showIcon 
                                />
                                <h3 className="alert-link">
                                    You are now logged out, you can return back to the <Link to="/benion-cbt">Log In Page</Link> to take another exam
                                </h3>
                            </TabPane>
                        </Tabs>
                    </Col>
                )}
            </Row>
            <Loader type="pacman" />
        </React.Fragment>
    )
}

export default CbtExam

