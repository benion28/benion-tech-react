import React, { useState, useEffect } from 'react'
import { Typography, Image, Row, Col } from 'antd'
import { AnimateText } from '../components'
import Loader from 'react-loaders'
import '../styles/About.scss'
import benionPassport from '../images/benion-passport.jpg'

const { Title } = Typography;

const About = () => {
    const [ letterClass, setLetterClass ] = useState('text-animate');
    const headingArray = ['A', 'B', 'O', 'U', 'T', ' ', 'M', 'E'];
    const nameArray = ['B', 'e', 'r', 'n', 'a', 'r', 'd', ' ', 'I', 'o', 'r', 'v', 'e', 'r', ' ', '(', 'B', 'e', 'n', 'i', 'o', 'n', ')'];

    useEffect(() => {
        setTimeout(() => {
            setLetterClass('text-animate-hover')
        }, 4000)
    }, []);

    return (
        <React.Fragment>
            <Row className="about-container">
                <Col className="about-header">
                    {/* <Title level={1} className="about-title">About Me</Title> */}
                    <Title level={1} className="about-title">
                        <AnimateText letterClass={letterClass} stringArray={headingArray} index={15} />
                    </Title>
                    <Image className="about-photo" src={benionPassport} />
                    <Title level={2} className="about-name">
                        <AnimateText letterClass={letterClass} stringArray={nameArray} index={20} />
                    </Title>
                </Col>
            </Row>
            <Row className="text-container">
                <Col className="about-text">
                    <Title className="text-zone" level={4}>
                        An innovative tech mind with 5 years of experience working as a computer programmer. 
                        Capable of working with a variety of technology and software solutions, and graphic designs. 
                        Valuable team member who has experience diagnosing problems and developing solutions. 
                        Talented leader with unique ideas and a history of successful contributions in the field.
                    </Title>
                    <Title className="text-zone" level={4}>
                        I'm a very ambitious front-end developer looking for a role in established IT company with 
                        the opportunity to work with the latest technologies on challenging and diverse projects.
                        I'm Skilled with JavaScript, TypeScript and frameworks like Angular, React, Express, Strapi and 
                        Redux. I also have basic knowledge of Python, C++, Java and MySQL.
                    </Title>
                    <Title className="text-zone" level={4}>
                        I'm also a good back-end developer with solid background and knowledge in computer programming.
                        And also have good and progressive knowledge of MongoDB, the Concepts of Object-Oriented Programming, 
                        the Concepts of Data Structures and Algorithms andthe Concepts of Design Patterns.
                    </Title>
                    <Title className="text-zone" level={4}>
                        I'm quietly confident, naturally curious, and perpetually working on improving my chops one 
                        design problem at a time.
                    </Title>
                </Col>
            </Row>
            <Loader type="pacman" />
        </React.Fragment>
    )
}

export default About

