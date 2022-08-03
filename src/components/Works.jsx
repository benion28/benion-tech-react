import React from 'react'
import { Carousel, Typography } from 'antd'
import '../styles/Works.scss'
import benionTechDark from '../images/benion-tech-dark.jpg'
import benionTechLight from '../images/benion-tech-light.jpg'
import codeCp from '../images/code-cp.jpg'

import { ImageGallaryForm } from '../components'

const { Fragment } = React
const { Title } = Typography

const contentStyle = {
    height: '160px',
    width: '100px',
    color: 'fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79'
}

const images = [
    {
        $key: '0',
        title: "Benion Tech Dark",
        src: benionTechDark,
        category: "works",
        link: "https://benion-tech.com/tech-dark"
    },
    {
        $key: '1',
        title: "Benion Tech Light",
        src: benionTechLight,
        category: "works",
        link: "https://benion-tech.com/tech-light"
    },
    {
        $key: '2',
        title: "Code Cp",
        src: {codeCp},
        category: "works",
        link: "https://benion-tech.com/code-cp"
    }
]

const Works = () => {
    return (
        <Fragment>
            <div className="gallery-container">
                <div className="form">
                    <ImageGallaryForm />
                </div>
                <div className="slider-container">
                    <Carousel effect="fade" autoplay>
                        {images.map(item => (
                            <div key={item.$key} style={contentStyle} className="item">
                                <Title level={4} className="text">{item.title.toUpperCase()}</Title>
                                <img className="image" src={item.src} alt={item.title} />
                                <a className="link" href={item.link}>Visit</a>
                            </div>
                        ))}
                    </Carousel>
                </div>
            </div>
        </Fragment>
    )
}

export default Works

