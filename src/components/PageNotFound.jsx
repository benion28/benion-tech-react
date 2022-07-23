import React, { useState, useEffect } from 'react'
import { AnimateText } from '../components'
import { Typography, Image  } from 'antd'
import Loader from 'react-loaders'
import { Link } from 'react-router-dom'
import benionTechIcon from '../images/benion-tech-icon.png'
import '../styles/PageNotFound.scss'

const { Title } = Typography

const PageNotFound = () => {
    const [ letterClass, setLetterClass ] = useState('text-animate')
    const nameArray = ['P', 'a', 'g', 'e', ' ', 'N', 'o', 't', ' ', 'F', 'o', 'u', 'n', 'd']
    const techArray = ['B', 'e', 'n', 'i', 'o', 'n', '-', 'T', 'e', 'c', 'h']
    const greeting = ['4', '0', '4']
    const jobArray = ['C', 'l', 'i', 'c', 'k', ' ', 'h', 'e', 'r', 'e', ' ', 't', 'o', ' ', 'g', 'o', ' ', 'b', 'a', 'c', 'k', ' ', 't', 'o', ' ', 't', 'h', 'e', ' ', 'h', 'o', 'm', 'e', 'p', 'a', 'g', 'e']

    useEffect(() => {
        setTimeout(() => {
            setLetterClass('text-animate-hover')
        }, 5000)
    }, [])

    return (
        <React.Fragment>
            <div className="text-container">
                <div className="large-container">
                    <Title className="text-title" level={1}><AnimateText letterClass={letterClass} stringArray={greeting} index={10} /></Title>
                    <Image className="image-title"src={benionTechIcon} />
                </div>
                <div className="small-container">
                    <Title className="text-title" level={2}><AnimateText letterClass={letterClass} stringArray={techArray} index={15} /></Title>
                    <Title className="text-title" level={2}><AnimateText letterClass={letterClass} stringArray={nameArray} index={25} /></Title>
                    <Link to="/">
                        <Title className="text-title-4" level={2}><AnimateText letterClass={letterClass} stringArray={jobArray} index={30} /></Title>
                    </Link>
                </div>
            </div>
            <Loader type="pacman" />
        </React.Fragment>
    )
}

export default PageNotFound

