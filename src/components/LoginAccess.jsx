import React from 'react'
import { Alert } from 'antd'
import { Link } from 'react-router-dom'

const LoginAccess = () => {
  return (
    <div>
        <Alert
            className="information-alert-form"
            message="Opps, you are not logged in  !!!"
            description={` `}
            type="info"
            showIcon
        />
        <h3 className="alert-link">
            <Link to="/login">You can click here to login if you want to view this page.</Link>
        </h3>
    </div>
  )
}

export default LoginAccess