import React, { useState, useEffect, useContext } from 'react'
import { 
    CbtLoginForm, AnimateText, CbtRegisterForm, CbtFindUserForm, ExamsTable, ScoresTable,
    CbtSelectExamForm, Questions, CbtExam, UsersTable, CbtUsersTable, ContactMessagesTable, Scores
} from '../components'
import { BookOutlined, EyeInvisibleOutlined, EyeOutlined  } from '@ant-design/icons'
import { Tabs, Typography, Row, Col, Image, Button, Alert  } from 'antd'
import Loader from 'react-loaders'
import { GlobalContext } from '../app/GlobalState'
import benionTechIcon from '../images/benion-tech-icon.png'
import '../styles/Cbt.scss'

const { TabPane } = Tabs
const { Title } = Typography

const Cbt = () => {
    const [ letterClass, setLetterClass ] = useState('text-animate')
    const nameArray = ['C', 'B', 'T', ' ', 'E', 'x', 'a', 'm', ' ', 'C', 'e', 'n', 't', 'e', 'r']
    const techArray = ['B', 'e', 'n', 'i', 'o', 'n', '-', 'T', 'e', 'c', 'h']
    const greeting1 = ['H', 'e', 'l', 'l', 'o', ',']
    const greeting2 = ['W', 'e', 'l', 'c', 'o', 'm', 'e', ' ', 't', 'o']
    const [showTable, setShowTable] = useState(false)
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
            <Row className="home-container">
                <Col className="home-items">
                    <Col className="home-items">
                        <Title className="text-title" level={2}><AnimateText letterClass={letterClass} stringArray={greeting1} index={7} /></Title>
                        <Title className="text-title" level={2}><AnimateText letterClass={letterClass} stringArray={greeting2} index={10} /></Title>
                        <Image className="image-title"src={benionTechIcon} />
                        <Title className="text-title" level={2}><AnimateText letterClass={letterClass} stringArray={techArray} index={15} /></Title>
                        <Title className="text-title" level={3}><AnimateText letterClass={letterClass} stringArray={nameArray} index={25} /></Title>
                    </Col>
                </Col>
                {(!state.cbtLoggedIn && !state.startExam)  && (
                    <Col className="form-tabs">
                        <Tabs defaultActiveKey="1" className="tabs-form" type="card">
                            <TabPane className="tabs-panel" tab={ <span> <Title level={4}>CBT Log In</Title> </span> } key="1">
                                <CbtLoginForm />
                            </TabPane>
                            <TabPane className="tabs-panel" tab={ <span> <Title level={4}>CBT Register</Title> </span> } key="2">
                                <CbtRegisterForm />
                            </TabPane>
                            <TabPane className="tabs-panel" tab={ <span> <Title level={4}>Find Username</Title> </span> } key="3">
                                <CbtFindUserForm />
                            </TabPane>
                        </Tabs>
                    </Col>
                )}
                {(!state.completeExam.completed && state.cbtLoggedIn && state.cbtExamCompleted && !state.startExam ) && (
                    <Col className="form-tabs">
                        <Tabs defaultActiveKey="1" className="tabs-form" type="card">
                            <TabPane className="tabs-panel" tab={ <span> <Title level={4}>CBT Exam Selector</Title> </span> } key="1">
                                <CbtSelectExamForm />
                            </TabPane>
                        </Tabs>
                    </Col>
                )}
                {(!state.completeExam.completed && state.cbtLoggedIn && !state.cbtExamCompleted && !state.startExam ) && (
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
                {(!state.completeExam.completed && state.cbtLoggedIn && state.startExam) && (
                    <div className="exams">
                        <CbtExam />
                    </div>
                )}
                {(state.completeExam.completed && state.cbtLoggedIn && !state.startExam) && (
                    <div className="exams">
                        <Tabs defaultActiveKey="1" className="tabs-form" type="card">
                            <TabPane className="tabs-panel" tab={ <span> <Title level={4}>CBT Exam Completed</Title> </span> } key="1">
                                <Alert 
                                    className="information-alert-form" 
                                    message="Exam Already Accessed  !!!" 
                                    description={ `DEAR ${state.cbtUser.firstname} ${state.cbtUser.lastname} !!! You have already written this exam, answered ${state.completeExam.answers.split(",").length} question${state.completeExam.answers.split(",").length > 1 ? 's' : ''} and scored ${state.completeExam.score} in ${state.completeExam.examTime} minute${state.completeExam.examTime > 1 ? 's' : ''}` } 
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
                { (state.cbtLoggedIn && state.tempCbtRole !== "student") && (
                    <div className="toggle-container">
                        <Button className='toggle-button' onClick={ () => setShowTable(!showTable) }>
                            {showTable ? <EyeInvisibleOutlined  /> : <EyeOutlined  />} {showTable ? "Hide" : "Show"} Tables
                        </Button>
                    </div>
                )}
                { (showTable && (state.loggedIn || state.cbtLoggedIn)) && (
                    <div className="tables">
                        <Tabs defaultActiveKey="1" className="tabs-form" type="card">
                            { (state.loggedIn && state.user.role === "admin") && (
                                <TabPane className="tabs-panel" tab={ <span> <Title level={4}>Users</Title> </span> } key="1">
                                    <UsersTable />
                                </TabPane>
                            )}
                            { (state.cbtUser.role !== "student" || state.user.role === "admin") && (
                                <TabPane className="tabs-panel" tab={ <span> <Title level={4}>Students</Title> </span> } key="2">
                                    <CbtUsersTable />
                                </TabPane>
                            )}
                            { (state.cbtUser.role !== "student" || state.user.role === "admin") && (
                                <TabPane className="tabs-panel" tab={ <span> <Title level={4}>Exam Data</Title> </span> } key="3">
                                    <ExamsTable />
                                </TabPane>
                            )}
                            { (state.loggedIn && state.user.role === "admin") && (
                                <TabPane className="tabs-panel" tab={ <span> <Title level={4}>Contact Messages</Title> </span> } key="4">
                                    <ContactMessagesTable />
                                </TabPane>
                            )}
                            { (state.cbtUser.role !== "student" || state.user.role === "admin") && (
                                <TabPane className="tabs-panel" tab={ <span> <Title level={4}>Student's Scores</Title> </span> } key="5">
                                    <ScoresTable />
                                </TabPane>
                            )}
                        </Tabs>
                    </div>
                )}
                
                {state.cbtLoggedIn && (
                    <div className="questions">
                        <div className="list">
                            <Scores />
                        </div>
                    </div>
                )}

                { (!showTable && state.cbtLoggedIn && state.tempCbtRole !== "student") && (
                    <div className="questions">
                        <div className="list">
                            <Questions />
                        </div>
                    </div>
                )}
            </Row>
            <Loader type="pacman" />
        </React.Fragment>
    )
}

export default Cbt
