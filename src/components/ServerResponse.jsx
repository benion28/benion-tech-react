import React, { useContext } from 'react'
import { Alert  } from 'antd'
import { GlobalContext } from '../app/GlobalState'
import '../styles/ServerResponse.scss'

const ServerResponse = () => {
    const { state } = useContext(GlobalContext)
    return (
        <div className="container">
            { state.message !== null && (
                <Alert message={state.message} type="success" showIcon closable />
            )}
            { state.error !== null && (
                <Alert message={state.error} type="error" showIcon closable />
            )}
        </div>
    )
}

export default ServerResponse
