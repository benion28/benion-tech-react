import React from 'react'
import { Typography } from 'antd'
import { AddStudentForm } from '../components'

const { Title } = Typography;

const AddStudent = () => {
    return (
        <div>
            <Title level={2} className="heading">Add New Student</Title>
            <AddStudentForm />
        </div>
    )
}

export default AddStudent

