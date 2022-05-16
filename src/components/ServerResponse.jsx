import React, { useContext } from 'react'
import { Alert  } from 'antd'
import { GlobalContext } from '../app/GlobalState'
import '../styles/ServerResponse.scss'

const ServerResponse = () => {
    const { error, message } = useContext(GlobalContext)
    return (
        <div className="container">
            { message !== null && (
                <Alert message={message} type="success" showIcon closable />
            )}
            { error !== null && (
                <Alert message={error} type="error" showIcon closable />
            )}
        </div>
    )
}

export default ServerResponse
