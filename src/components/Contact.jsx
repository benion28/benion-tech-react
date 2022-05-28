import React, { useState, useEffect } from 'react'
import { Typography, Row, Col } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngular, faHtml5, faCss3, faReact, faJsSquare, faGitAlt, faTelegram } from '@fortawesome/free-brands-svg-icons'
import Loader from 'react-loaders'
import { 
    GithubOutlined, 
    GoogleOutlined, 
    MailOutlined,
    FacebookOutlined,
    TwitterOutlined,
    InstagramOutlined,
    WhatsAppOutlined,
    LinkedinOutlined
} from '@ant-design/icons';
import { AnimateText, ContactForm } from '../components'
import '../styles/Contact.scss'

const { Title } = Typography;

const Contact = () => {
    const [ letterClass, setLetterClass ] = useState('text-animate');
    const headingArray = ['C', 'O', 'N', 'T', 'A', 'C ', 'T', ' ', 'U', 'S'];
    const linksHeadingArray = ['C', 'o', 'n', 't', 'a', 'c', 't', ' ', 'L', 'i', 'n', 'k', 's', ':'];
    const formHeadingArray = ['C', 'o', 'n', 't', 'a', 'c', 't', ' ', 'F', 'o', 'r', 'm'];

    useEffect(() => {
        setTimeout(() => {
            setLetterClass('text-animate-hover')
        }, 4000)
    }, []);

    return (
        <React.Fragment>
            <Row className="spinner-container">
                <Col className="header-container">
                    <Title level={1} className="contact-heading">
                        <AnimateText letterClass={letterClass} stringArray={headingArray} index={20} />
                    </Title>
                    <div className="stage-cube-contents">
                        <div className="cube-spinner">
                            <div className="face-1">
                                <FontAwesomeIcon className="icon" icon={faAngular} color="#DD0031" />
                            </div>
                            <div className="face-2">
                                <FontAwesomeIcon className="icon" icon={faHtml5} color="#F06529" />
                            </div>
                            <div className="face-3">
                                <FontAwesomeIcon className="icon" icon={faCss3} color="#28A4D9" />
                            </div>
                            <div className="face-4">
                                <FontAwesomeIcon className="icon" icon={faReact} color="#5ED4F4" />
                            </div>
                            <div className="face-5">
                                <FontAwesomeIcon className="icon" icon={faJsSquare} color="#EFD81D" />
                            </div>
                            <div className="face-6">
                                <FontAwesomeIcon className="icon" icon={faGitAlt} color="#EC4D28" />
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row className="contact-container">
                <Col className="links-container">
                    <Title level={3} className="heading">
                        <AnimateText letterClass={letterClass} stringArray={linksHeadingArray} index={15} />
                    </Title>    
                    <Title level={5} className="link">
                        <GithubOutlined /> Github:
                        <a href="https://github.com/benion28">  https://github.com/benion28</a>
                    </Title>  
                    <Title level={5} className="link">
                        <LinkedinOutlined /> LinkedIn:
                        <a href="https://linkedin.com/in/benion28">  https://linkedin.com/in/benion28</a>
                    </Title>  
                    <Title level={5} className="link">
                        <TwitterOutlined /> Twitter:
                        <a href="https://twitter.com/benion28">  https://twitter.com/benion28</a>
                    </Title>
                    <Title level={5} className="link">
                        <FacebookOutlined /> Facebook:
                        <a href="https://facebook.com/biorver.7">  https://facebook.com/biorver.7</a>
                    </Title>
                    <Title level={5} className="link">
                        <GoogleOutlined /> Gmail:
                        <a href="bernard.iorver28@gmail.com">  bernard.iorver28@gmail.com</a>
                    </Title>  
                    <Title level={5} className="link">
                        <WhatsAppOutlined /> Whatsapp:
                        <a href="https://wa.me/qr/H2IV2BZFDIFCI1">  +234 8175 619 445</a>
                    </Title>  
                    <Title level={5} className="link">
                        <FontAwesomeIcon icon={faTelegram} /> Telegram:
                        <a href="https://t.me/benion_tech">  +234 8168 766 556</a>
                    </Title>  
                    <Title level={5} className="link">
                        <MailOutlined /> Hotmail:
                        <a href="bernard.benion.iorver@hotmail.com">  bernard.benion.iorver@hotmail.com</a>
                    </Title>
                    <Title level={5} className="link">
                        <InstagramOutlined /> Instagram:
                        <a href="https://instagram.com/biorver_benion28">  https://instagram.com/biorver_benion28</a>
                    </Title>
                </Col>
                <Col className="form-container">
                    <Title level={2} className="heading">
                        <AnimateText letterClass={letterClass} stringArray={formHeadingArray} index={10} />
                    </Title>    
                    <ContactForm className="contact-form" />
                </Col>
            </Row>
            <Loader type="pacman" />
"        </React.Fragment>
    )
}

export default Contact

