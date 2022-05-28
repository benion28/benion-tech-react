import React, { useState, useContext } from 'react'
import { Form, Input, Button, Select, Alert } from 'antd'
import { UserOutlined, SearchOutlined } from '@ant-design/icons'
import '../styles/CbtFindUserForm.scss'
import { GlobalContext } from '../app/GlobalState'

const { Item } = Form
const { Option } = Select

const CbtFindUserForm = () => {
    const [form] = Form.useForm();
    const [formMessage, setFormMessage] = useState('')
    const [foundUser, setFoundUser] = useState(null)
    const [formError, setFormError] = useState('')
    const { cbtUserFind, state  } = useContext(GlobalContext)

    const onFinish = async (values) => {
        console.log('Received values of form: ', values)
        setFormError('')
        setFormMessage('Find Username data accepted !!')

        // Find Username
        const user = cbtUserFind(values)
        if (user.success) {
            setFoundUser(user)
            form.resetFields()
        }
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo)
        setFormMessage('')
        setFormError('Find Username data rejected, check fields for errors !!')
    }

    const validateMessages = {
        required: '${label} is required!'
    }

    console.log('Current State: ', state)

    return (
        <React.Fragment>
            <div className="form-group">
                <div className="form-alert">
                    { formMessage !== '' && (
                        <Alert message={formMessage} type="success" showIcon closable />
                    )}
                    { formError !== '' && (
                        <Alert message={formError} type="error" showIcon closable />
                    )}
                </div>
                { !state.loggedIn && (
                    <Form name="normal_login" form={ form } className="login-form" onFinishFailed={ onFinishFailed } validateMessages={ validateMessages } initialValues={{ remember: true }} onFinish={ onFinish }>
                        {foundUser !== null && (
                            <Alert className="information-alert" message={foundUser.username} description="The above is the username found with the provided details" type="info" showIcon />
                        )}
                        <Item label="First Name" name="firstname" rules={[ { required: true} ]}>
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="First Name" allowClear />
                        </Item>
                        <Item label="Last Name" name="lastname" rules={[ { required: true} ]}>
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Last Name" allowClear />
                        </Item>
                        <Item className='form-item' name="school" label="School" rules={[ { required: true } ]}>
                            <Select placeholder="Select a School"  allowClear>
                                <Option value="male">Male</Option>
                                <Option value="female">Female</Option>
                                <Option value="other">Other</Option>
                            </Select>
                        </Item>
                        <Item className='form-item' name="class" label="Class" rules={[ { required: true } ]}>
                            <Select placeholder="Select a Class"  allowClear>
                                <Option value="male">Male</Option>
                                <Option value="female">Female</Option>
                                <Option value="other">Other</Option>
                            </Select>
                        </Item>
                        <Item className='form-item' name="class" label="Role" rules={[ { required: true } ]}>
                            <Select placeholder="Select a Role"  allowClear>
                                <Option value="student">Student</Option>
                                <Option value="moderator">Moderator</Option>
                                <Option value="admin">Administrator</Option>
                            </Select>
                        </Item>
                        { !state.loggedIn && (
                            <Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Search For Username <SearchOutlined />
                                </Button>
                            </Item>
                        )}
                    </Form>
                )}
            </div>
        </React.Fragment>
    )
}

export default CbtFindUserForm
