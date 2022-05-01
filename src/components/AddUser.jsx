import React from 'react'
import { Typography } from 'antd'
import { AddUserForm } from '../components'

const { Title } = Typography;

const AddUser = () => {
    return (
        <div>
            <Title level={2} className="heading">Add New User</Title>
            <AddUserForm />
        </div>
    )
}

export default AddUser

