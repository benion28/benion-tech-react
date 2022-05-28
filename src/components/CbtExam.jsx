import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AnimateText } from '../components'
import { Typography, Row, Col, Image, Alert, Tabs  } from 'antd'
import Loader from 'react-loaders'
import benionTechIcon from '../images/benion-tech-icon.png'
import { GlobalContext } from '../app/GlobalState'
import '../styles/CbtExam.scss'

const { Title } = Typography
const { TabPane } = Tabs

const CbtExam = () => {
    const { state } = useContext(GlobalContext)
    const [time, setTime] = useState(state.cbtExam.examTime)
    const [submitted, setSubmitted] = useState(false)

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
                                <h3 className="alert-link">
                                    Exam Questions, Options and Buttons,
                                    Exam Questions, Options and Buttons,
                                    Exam Questions, Options and Buttons,
                                    Exam Questions, Options and Buttons,
                                </h3>
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

