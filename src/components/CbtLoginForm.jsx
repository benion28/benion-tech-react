import React, { useState, useContext } from 'react'
import { Form, Input, Button, Alert } from 'antd'
import { UserOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons'
import '../styles/CbtLoginForm.scss'
import { GlobalContext } from '../app/GlobalState'

const { Item } = Form
const { Password } = Input

const CbtLoginForm = () => {
    const [form] = Form.useForm();
    const [formMessage, setFormMessage] = useState('')
    const [formError, setFormError] = useState('')
    const { cbtUserLogin, state  } = useContext(GlobalContext)

    const onFinish = async (values) => {
        console.log('Received values of form: ', values)
        setFormError('')
        setFormMessage('Log In data accepted !!')

        // Cbt Log In
        cbtUserLogin(values)
        form.resetFields()
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo)
        setFormMessage('')
        setFormError('Log In data rejected, check fields for errors !!')
    }

    const validateMessages = {
        required: '${label} is required!'
    }

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
                        <Item label="Username" name="username" rules={[ { required: true} ]}>
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" allowClear />
                        </Item>
                        <Item label="Password" name="password" rules={[ { required: true, min: 8, max: 12 } ]} hasFeedback>
                            <Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" allowClear />
                        </Item>
                        { !state.loggedIn && (
                            <Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Log In <LoginOutlined />
                                </Button>
                            </Item>
                        )}
                    </Form>
                )}
            </div>
        </React.Fragment>
    )
}

export default CbtLoginForm

