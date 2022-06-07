import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AnimateText } from '../components'
import { Typography, Row, Col, Image, Alert, Tabs, Radio, Button, Form, Input  } from 'antd'
import Loader from 'react-loaders'
import benionTechIcon from '../images/benion-tech-icon.png'
import { GlobalContext } from '../app/GlobalState'
import '../styles/CbtExam.scss'

const { Title } = Typography
const { Item } = Form
const { Group } = Radio
const { TabPane } = Tabs

const CbtExam = () => {
    const [form] = Form.useForm()
    const { state } = useContext(GlobalContext)
    const [time, setTime] = useState(state.cbtExam.examTime)
    const [submitted, setSubmitted] = useState(false)
    const questionNumber = 1
    const question = "Exam Questions, Options and Buttons, Exam Questions, Options and Buttons, Exam Questions, Options and Buttons, Exam Questions, Options and Buttons,"

    const [ letterClass, setLetterClass ] = useState('text-animate')
    const nameArray = ['C', 'B', 'T', ' ', 'E', 'x', 'a', 'm', ' ', 'C', 'e', 'n', 't', 'e', 'r']
    const techArray = ['B', 'e', 'n', 'i', 'o', 'n', '-', 'T', 'e', 'c', 'h']
    const greeting1 = ['H', 'e', 'l', 'l', 'o', ',']
    const greeting2 = ['W', 'e', 'l', 'c', 'o', 'm', 'e', ' ', 't', 'o']

    setInterval(() => {
        setTime(time + 1)

        if (time >= state.cbtExam.examTimeLimit) {
            setSubmitted(true)
        }

        if (submitted && state.cbtLoggedIn) {
            submitAnswers()
        }
    }, 60000)

    useEffect(() => {
        setTimeout(() => {
            setLetterClass('text-animate-hover')
        }, 5000)
    }, [])

    const submitAnswers = () => {
        console.log("Answers submitted successfully")
    }

    const onFinish = async (values) => {
        console.log('Success:', values)

        // Submit Answers
        submitAnswers()
        setSubmitted(true)
        form.resetFields()
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo)
    }

    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: 'This is not a valid email!',
            number: 'This is not a valid number!',
        }
    }

    const onNext = () => {
        form.resetFields();
    }

     form.setFieldsValue({
        question: questionNumber
     })

    return (
        <React.Fragment>
             <Title level={2} className="text"><b>Exam Dashboard:</b> Welcome {state.cbtUser.activeExam !== '' ? "Back" : ""} ({ state.cbtLoggedIn ? `${state.cbtUser.firstname} ${state.cbtUser.lastname}` : 'Guest User' })</Title>
            <Row className="home-container">
                <Col className="home-items">
                    <Title className="text-title" level={2}><AnimateText letterClass={letterClass} stringArray={greeting1} index={7} /></Title>
                    <Title className="text-title" level={2}><AnimateText letterClass={letterClass} stringArray={greeting2} index={10} /></Title>
                    <Image className="image-title"src={benionTechIcon} />
                    <Title className="text-title" level={2}><AnimateText letterClass={letterClass} stringArray={techArray} index={15} /></Title>
                    <Title className="text-title" level={3}><AnimateText letterClass={letterClass} stringArray={nameArray} index={25} /></Title>
                </Col>
                {(state.cbtLoggedIn && state.cbtUser.activeExam !== '' && !submitted) && (
                    <Col className="exams-container">
                        <Tabs defaultActiveKey="1" className="tabs-form" type="card">
                            <TabPane className="tabs-panel" tab={ <span> <Title level={4}>CBT Exam In Progress</Title> </span> } key="1">
                                <div className="time-container">
                                    <Title className="time-left" level={3}>
                                        Time Left:
                                    </Title>
                                    <span className='text-span'>
                                        <Title level={1} className={ (time < Math.floor(state.cbtExam.examTimeLimit * 0.80) ) ? "text-avatar-green" : "text-avatar-red" }>
                                            { state.cbtExam.examTimeLimit - time }
                                        </Title>
                                    </span>
                                </div>
                                <Form name="basic" form={ form } validateMessages={ validateMessages } initialValues={{ remember: true }} onFinish={ onFinish } onFinishFailed={ onFinishFailed } autoComplete="off">
                                    <div className="form-controller">
                                        <Item className='form-item' name='question'>
                                            <h1>
                                                <b>({ questionNumber.toString() }):</b>  { question }
                                            </h1>
                                        </Item>
                                    </div>
                                    <div className="form-controller">
                                        <Item className='form-item' name="option" rules={[ { required: true } ]}>
                                            <Group>
                                                <Radio className='radio-option' value={'a'}><h3> <b>(a).</b> {'A'} </h3></Radio>
                                                <Radio className='radio-option' value={'b'}><h3> <b>(b).</b> {'B'} </h3></Radio>
                                                <Radio className='radio-option' value={'c'}><h3> <b>(c).</b> {'C'} </h3></Radio>
                                                <Radio className='radio-option' value={'d'}><h3> <b>(d).</b> {'D'} </h3></Radio>
                                            </Group>
                                        </Item>
                                    </div>
                                    <div className="button-controller">
                                        <Item>
                                            <Button className="previous-button" type="primary" onClick={ onNext }>
                                                Previous
                                            </Button>
                                        </Item>
                                        <Item>
                                            <Button className="next-button" type="primary" onClick={ onNext }>
                                                Next
                                            </Button>
                                        </Item>
                                        <Item>
                                            <Button className="submit-button" type="danger" htmlType="submit">
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

