import React, { useState, useEffect } from 'react'
import { RegisterForm, LogInForm, AnimateText, ForgetForm } from '../components'
import { UserOutlined, GroupOutlined, KeyOutlined } from '@ant-design/icons';
import { Tabs, Typography, Row, Col, Image, Button  } from 'antd'
import Loader from 'react-loaders'
import { Link } from 'react-router-dom'
import benionTechIcon from '../images/benion-tech-icon.png'
import '../styles/Homepage.scss'

const { TabPane } = Tabs;
const { Title } = Typography;

const Homepage = () => {
    const [ letterClass, setLetterClass ] = useState('text-animate');
    const nameArray = ['B', 'e', 'r', 'n', 'a', 'r', 'd', ' ', 'I', 'o', 'r', 'v', 'e', 'r', ' ', '(', 'B', 'e', 'n', 'i', 'o', 'n', ')'];
    const techArray = ['B', 'e', 'n', 'i', 'o', 'n', '-', 'T', 'e', 'c', 'h'];
    const greeting1 = ['H', 'e', 'l', 'l', 'o', ','];
    const greeting2 = ['W', 'e', 'l', 'c', 'o', 'm', 'e', ' ', 't', 'o'];
    const jobArray1 = ['W', 'e', 'b', ' ', 'D', 'e', 's', 'i', 'g', 'n', 'e', 'r'];
    const jobArray2 = ['S', 'o', 'f', 't', 'w', 'a', 'r', 'e', ' ', 'D', 'e', 'v', 'e', 'l', 'o', 'p', 'e', 'r'];
    const jobArray3 = ['D', 'a', 't', 'a', ' ', 'S', 'c', 'i', 'e', 'n', 't', 'i', 's', 't'];

    useEffect(() => {
        setTimeout(() => {
            setLetterClass('text-animate-hover')
        }, 5000)
    }, [])

    return (
        <React.Fragment>
            <Row className="home-container">
                <Col className="home-items">
                    {/* <Title className="text-title" level={2}><b>Hello</b>,</Title> */}
                    <Title className="text-title" level={2}><AnimateText letterClass={letterClass} stringArray={greeting1} index={7} /></Title>
                    {/* <Title className="text-title" level={2}>Welcome to</Title> */}
                    <Title className="text-title" level={2}><AnimateText letterClass={letterClass} stringArray={greeting2} index={10} /></Title>
                    <Image className="image-title"src={benionTechIcon} />
                    {/* <Title className="text-title" level={2}>Benion-Tech</Title> */}
                    <Title className="text-title" level={2}><AnimateText letterClass={letterClass} stringArray={techArray} index={15} /></Title>
                    {/* <Title className="text-title" level={3}><b>Bernard Iorver</b> (Benion)</Title> */}
                    <Title className="text-title" level={3}><AnimateText letterClass={letterClass} stringArray={nameArray} index={25} /></Title>
                    {/* <Title className="text-title-4" level={4}>Web Designer / Software Developer / Data Scientist</Title> */}
                    <Title className="text-title-4" level={4}><AnimateText letterClass={letterClass} stringArray={jobArray1} index={30} /> / <AnimateText letterClass={letterClass} stringArray={jobArray2} index={22} /> / <AnimateText letterClass={letterClass} stringArray={jobArray3} index={22} /></Title>
                    <Button className="text-contact-button" type="primary">
                        <Link to="/contact">CONTACT ME</Link>
                    </Button>
                </Col>
                <Col className="form-tabs">
                    <Tabs defaultActiveKey="1" className="tabs-form" type="card">
                        <TabPane className="tabs-panel" tab={ <span> <UserOutlined /> <Title level={4}>Log In</Title> </span> } key="1">
                            <LogInForm />
                        </TabPane>
                        <TabPane className="tabs-panel" tab={ <span> <GroupOutlined /> <Title level={4}>Register</Title> </span> } key="2">
                            <RegisterForm />
                        </TabPane>
                        <TabPane className="tabs-panel" tab={ <span> <KeyOutlined /> <Title level={4}>Forget Password</Title> </span> } key="3">
                            <ForgetForm />
                        </TabPane>
                    </Tabs>
                </Col>
            </Row>
            <Loader type="pacman" />
        </React.Fragment>
    )
}

export default Homepage

