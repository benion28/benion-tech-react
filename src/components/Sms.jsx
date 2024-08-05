import React, { useState, useEffect, useContext } from 'react'
import { SmsLoginForm, AnimateText, SmsForgetForm, SmsTables } from '../components'
import { BookOutlined, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import { Tabs, Typography, Row, Col, Image, Button, Alert } from 'antd'
import Loader from 'react-loaders'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css"
import { GlobalContext } from '../app/GlobalState'
import benionTechIcon from '../images/benion-tech-icon.png'
import '../styles/Cbt.scss'
import { textArray } from '../services/userHelper'

const { TabPane } = Tabs
const { Title } = Typography
const { Fragment } = React

const Sms = () => {
    const [letterClass, setLetterClass] = useState('text-animate')
    const nameArray = textArray("Management System")
    const techArray = textArray("School")
    const greeting1 = textArray("Welcome to")
    const greeting2 = textArray("Benion Tech")
    const [showTable, setShowTable] = useState(false)
    const { state } = useContext(GlobalContext)

    useEffect(() => {
        setTimeout(() => {
            setLetterClass('text-animate-hover')
        }, 5000)
    }, [])

    return (
        <Fragment>
            <ToastContainer />
            <Title level={2} className="heading">School Management System</Title>
            {(state.smsLoggedIn) && (
                <Row className="home-container">
                    <Col className="home-items">
                        <Col className="home-items">
                            <Title className="text-title" level={2}><AnimateText letterClass={letterClass} stringArray={greeting1} index={7} /></Title>
                            <Title className="text-title" level={2}><AnimateText letterClass={letterClass} stringArray={greeting2} index={10} /></Title>
                            <Image className="image-title" src={benionTechIcon} />
                            <Title className="text-title" level={2}><AnimateText letterClass={letterClass} stringArray={techArray} index={15} /></Title>
                            <Title className="text-title" level={3}><AnimateText letterClass={letterClass} stringArray={nameArray} index={25} /></Title>
                        </Col>
                    </Col>
                    <Col className="form-tabs">
                        <Tabs defaultActiveKey="1" className="tabs-form" type="card">
                            <TabPane className="tabs-panel" tab={<span> <Title level={4}>Log In</Title> </span>} key="1">
                                <SmsLoginForm />
                            </TabPane>
                            <TabPane className="tabs-panel" tab={<span> <Title level={4}>Forget Password</Title> </span>} key="2">
                                <SmsForgetForm />
                            </TabPane>
                        </Tabs>
                    </Col>
                </Row>
            )}
            <SmsTables />
            <Loader type="pacman" />
        </Fragment>
    )
}

export default Sms
