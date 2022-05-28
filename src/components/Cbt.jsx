import React, { useState, useEffect, useContext } from 'react'
import { CbtLoginForm, AnimateText, CbtRegisterForm, CbtFindUserForm, CbtSelectExamForm } from '../components'
import { BookOutlined  } from '@ant-design/icons'
import { Tabs, Typography, Row, Col, Image, Button, Alert  } from 'antd'
import Loader from 'react-loaders'
import { Link } from 'react-router-dom'
import { GlobalContext } from '../app/GlobalState'
import benionTechIcon from '../images/benion-tech-icon.png'
import '../styles/Cbt.scss'

const { TabPane } = Tabs
const { Title } = Typography

const Cbt = () => {
    const [ letterClass, setLetterClass ] = useState('text-animate');
    const nameArray = ['B', 'e', 'r', 'n', 'a', 'r', 'd', ' ', 'I', 'o', 'r', 'v', 'e', 'r', ' ', '(', 'B', 'e', 'n', 'i', 'o', 'n', ')']
    const techArray = ['B', 'e', 'n', 'i', 'o', 'n', '-', 'T', 'e', 'c', 'h']
    const greeting1 = ['C', 'o', 'm', 'p', 'u', 't', 'e', 'r', '-', 'B', 'a', 's', 'e', 'd']
    const greeting2 = ['T', 'e', 's', 'i', 'n', 'g', ' ', ' C', 'e', 'n', 't', 'e', 'r']
    const jobArray1 = ['W', 'e', 'b', ' ', 'D', 'e', 's', 'i', 'g', 'n', 'e', 'r']
    const jobArray2 = ['S', 'o', 'f', 't', 'w', 'a', 'r', 'e', ' ', 'D', 'e', 'v', 'e', 'l', 'o', 'p', 'e', 'r']
    const jobArray3 = ['D', 'a', 't', 'a', ' ', 'S', 'c', 'i', 'e', 'n', 't', 'i', 's', 't']
    const { state  } = useContext(GlobalContext)

    useEffect(() => {
        setTimeout(() => {
            setLetterClass('text-animate-hover')
        }, 5000)
    }, [])

    return (
        <React.Fragment>
            <Title level={2} className="heading">Electronic-Testing Center</Title>
            <Row className="home-container">
                <Col className="home-items">
                    <Title className="text-title" level={2}><AnimateText letterClass={letterClass} stringArray={greeting1} index={7} /></Title>
                    <Title className="text-title" level={2}><AnimateText letterClass={letterClass} stringArray={greeting2} index={10} /></Title>
                    <Image className="image-title"src={benionTechIcon} />
                    <Title className="text-title" level={2}><AnimateText letterClass={letterClass} stringArray={techArray} index={15} /></Title>
                    <Title className="text-title" level={3}><AnimateText letterClass={letterClass} stringArray={nameArray} index={25} /></Title>
                    <Title className="text-title-4" level={4}><AnimateText letterClass={letterClass} stringArray={jobArray1} index={30} /> / <AnimateText letterClass={letterClass} stringArray={jobArray2} index={22} /> / <AnimateText letterClass={letterClass} stringArray={jobArray3} index={22} /></Title>
                    <Button className="text-contact-button" type="primary">
                        <Link to="/contact">CONTACT ME</Link>
                    </Button>
                </Col>
                {!state.cbtLoggedIn && (
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
                {state.cbtLoggedIn && state.cbtUser.activeExam === '' && (
                    <Col className="form-tabs">
                        <Tabs defaultActiveKey="1" className="tabs-form" type="card">
                            <TabPane className="tabs-panel" tab={ <span> <Title level={4}>CBT Exam Selector</Title> </span> } key="1">
                                <CbtSelectExamForm />
                            </TabPane>
                        </Tabs>
                    </Col>
                )}
                {state.cbtLoggedIn && state.cbtUser.activeExam !== '' && (
                    <Col className="form-tabs">
                        <Tabs defaultActiveKey="1" className="tabs-form" type="card">
                            <TabPane className="tabs-panel" tab={ <span> <Title level={4}>CBT Exam In Progress</Title> </span> } key="1">
                                <div className="continue-exam-container">
                                    <Alert className="information-alert" message="You currently have an examination in progress !!" description={`finish your exams in order to start a new one, you have spent ${state.cbtUser.examTime} minutes already`} type="info" showIcon />
                                    <Link to="/benion-cbt/exams">
                                        <Button type="primary" className="login-form-button">
                                            Continue Exams <BookOutlined />
                                        </Button>
                                    </Link>
                                </div>
                            </TabPane>
                        </Tabs>
                    </Col>
                )}
            </Row>
            <Loader type="pacman" />
        </React.Fragment>
    )
}

export default Cbt
