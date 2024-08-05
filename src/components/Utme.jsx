import React, { useState, useEffect, useContext } from 'react'
import {  AnimateText, UtmeSelectExamForm, UtmeExam, LoginAccess, AuthAccess } from '../components'
import { BookOutlined  } from '@ant-design/icons'
import { Tabs, Typography, Row, Col, Image, Button, Alert  } from 'antd'
import Loader from 'react-loaders'
import { GlobalContext } from '../app/GlobalState'
import benionTechIcon from '../images/benion-tech-icon.png'
import '../styles/Cbt.scss'
import { textArray } from '../services/userHelper'

const { TabPane } = Tabs
const { Title } = Typography

const Utme = () => {
    const [ letterClass, setLetterClass ] = useState('text-animate')
    const nameArray = textArray("UTME Exam Center")
    const techArray = textArray("Benion-Tech")
    const greeting1 = textArray("Hello")
    const greeting2 = textArray("Welcome To")
    const { state, examCategory, examAnswered  } = useContext(GlobalContext)

    useEffect(() => {
        setTimeout(() => {
            setLetterClass('text-animate-hover')
        }, 5000)
    }, [])

    const handleContinueExams = () => {
        examCategory({
            examTerm: state.cbtExam.term,
            examCategory: state.cbtExam.category,
            examSubject: state.cbtExam.subject,
            examClass: state.cbtExam.className
        })
        examAnswered({
            answers: state.cbtExam.answers,
            answered: state.cbtExam.answered
        })
    }

    return (
        <React.Fragment>
            <Title level={2} className="heading">Electronic-Testing Center</Title>
            { state.cbtLoggedIn && (
                <Row className="home-container">
                    <Col className="home-items">
                        <Col className="home-items">
                            <Title className="text-title" level={2}><AnimateText letterClass={letterClass} stringArray={greeting1} index={7} /></Title>
                            <Title className="text-title" level={2}><AnimateText letterClass={letterClass} stringArray={greeting2} index={10} /></Title>
                            <Image className="image-title home-logo"src={benionTechIcon} />
                            <Title className="text-title" level={2}><AnimateText letterClass={letterClass} stringArray={techArray} index={15} /></Title>
                            <Title className="text-title" level={3}><AnimateText letterClass={letterClass} stringArray={nameArray} index={25} /></Title>
                        </Col>
                    </Col>
                    {(!state.completeExam.completed && (state.multipleAccess || state.singleAccess) && state.cbtLoggedIn && state.cbtExamCompleted && !state.startExam ) && (
                        <Col className="form-tabs">
                            <Tabs defaultActiveKey="1" className="tabs-form" type="card">
                                <TabPane className="tabs-panel" tab={ <span> <Title level={4}>CBT Exam Selector</Title> </span> } key="1">
                                    <UtmeSelectExamForm />
                                </TabPane>
                            </Tabs>
                        </Col>
                    )}
                    {(!state.completeExam.completed && (state.multipleAccess || state.singleAccess) && state.cbtLoggedIn && !state.cbtExamCompleted && !state.startExam ) && (
                        <Col className="form-tabs">
                            <Tabs defaultActiveKey="1" className="tabs-form" type="card">
                                <TabPane className="tabs-panel" tab={ <span> <Title level={4}>CBT Exam In Progress</Title> </span> } key="1">
                                    <div className="continue-exam-container">
                                        <Alert className="information-alert" message={`Welcome ${state.tempCbtFirstname.toUpperCase()} ${state.tempCbtLastname.toUpperCase()}, you currently have an examination in progress !!`} description={`Finish your exams in order to start a new one, you have spent ${state.cbtTimeSpent} minute${state.cbtTimeSpent > 1 ? 's' : ''} already and answered  ${state.cbtAnswered.split(",").length} question${state.cbtAnswered.split(",").length > 1 ? 's' : ''} only.`} type="info" showIcon />
                                        <Button type="primary" onClick={ () => handleContinueExams() } className="login-form-button">
                                            Continue Exams <BookOutlined />
                                        </Button>
                                    </div>
                                </TabPane>
                            </Tabs>
                        </Col>
                    )}
                    {(!state.completeExam.completed && (state.multipleAccess || state.singleAccess) && state.cbtLoggedIn && state.startExam) && (
                        <div className="exams">
                            <UtmeExam />
                        </div>
                    )}
                    {(state.completeExam.completed && !state.multipleAccess && state.cbtLoggedIn && !state.startExam) && (
                        <div className="exams">
                            <Tabs defaultActiveKey="1" className="tabs-form" type="card">
                                <TabPane className="tabs-panel" tab={ <span> <Title level={4}>CBT Exam Completed</Title> </span> } key="1">
                                    <Alert 
                                        className="information-alert-form" 
                                        message="Exam Already Accessed  !!!" 
                                        description={ `DEAR ${state.tempCbtFirstname} ${state.tempCbtLastname} !!! You have already written this exam, answered ${state.completeExam.answers.split(",").length} question${state.completeExam.answers.split(",").length > 1 ? 's' : ''} and scored ${state.completeExam.score} in ${state.completeExam.examTime} minute${state.completeExam.examTime > 1 ? 's' : ''}` } 
                                        type="warning" 
                                        showIcon 
                                    />
                                    <h3 className="alert-link">
                                        You can check back later to take another available exam
                                    </h3>
                                </TabPane>
                            </Tabs>
                        </div>
                    )}
                </Row>
            )}
            {( !state.cbtLoggedIn ) && (
                <LoginAccess />
            )}
            {( state.cbtLoggedIn && state.cbtUser.role === "student" ) && (
                <AuthAccess />
            )}
            <Loader type="pacman" />
        </React.Fragment>
    )
}

export default Utme
