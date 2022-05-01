import React from 'react'
import '../styles/AnimateText.scss'

const AnimateText = ({ letterClass, stringArray, index }) => {
    return (
        <span>
            {
                stringArray.map((char, i) => (
                    <span key={char + i} className={`${letterClass} _${i + index}`}>{char}</span>
                ))
            }
        </span>
    )
}

export default AnimateText
