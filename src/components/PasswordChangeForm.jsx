import React, { useState, useContext } from 'react'
import { Form, Input, Button, Alert, Typography } from 'antd'
import { KeyOutlined, BookOutlined, LockOutlined, SolutionOutlined } from '@ant-design/icons'
import '../styles/PasswordChangeForm.scss'
import { production } from '../services/userHelper'
import { GlobalContext } from '../app/GlobalState'

const { Item } = Form
const { Password, TextArea } = Input
const { Title } = Typography

const PasswordChangeForm = () => {
    const [form] = Form.useForm()
    const [formMessage, setFormMessage] = useState('')
    const [formError, setFormError] = useState('')
    const { changeUserPassword, state  } = useContext(GlobalContext)

    const onFinish = (values) => {
        !production && (console.log("Input data accepted !!", values))
        setFormError('')
        setFormMessage('Input data accepted !!')

        const data = {
            password: values.password, 
            password2: values.password2
        }

        // Change User Password
        changeUserPassword(values.token, data)
        form.resetFields()
    }

    const onFinishFailed = (errorInfo) => {
        !production && (console.log("Input data rejected !!", errorInfo))
        setFormMessage('')
        setFormError('Input data rejected, check fields for errors !!')
    }

    const validateMessages = {
        required: '${label} is required!'
    }

    const confirmPasswords = () => ({
        validator(_, value) {
            if (!value || form.getFieldValue('password') === value) {
                return Promise.resolve();
            }

            return Promise.reject(new Error('The two passwords that you entered do not match!'));
        }
    })

    return (
        <React.Fragment>
            <div className="form-group">
                { (!production || (state.user.role === 'admin' && state.showAlert)) && (
                    <div className="form-alert">
                        { formMessage !== '' && (
                            <Alert message={formMessage} type="success" showIcon closable />
                        )}
                        { formError !== '' && (
                            <Alert message={formError} type="error" showIcon closable />
                        )}
                    </div>
                )}
                <div className="form-alert">
                    { state.formError !== '' && (
                        <Alert message={state.formError} type="warning" showIcon closable />
                    )}
                </div>
                <Form name="normal_login" form={ form } className="login-form" onFinishFailed={ onFinishFailed } initialValues={{ remember: true }} validateMessages={ validateMessages } onFinish={ onFinish }>
                    <Title level={4} className="text">Change A User's Password</Title>
                    <div className="form-controller">
                        <Item className='form-item' label="Password" name="password" hasFeedback rules={[ { required: true, min: 8, max: 12 } ]}>
                            <Password prefix={<KeyOutlined />} placeholder="Your Password" allowClear />
                        </Item>
                        <Item className='form-item' label="Confirm" name="password2" dependencies={['password']} hasFeedback rules={[ { required: true }, confirmPasswords ]}>
                            <Password prefix={<LockOutlined />} placeholder="Confirm Password" allowClear />
                        </Item>
                    </div>
                    <Item label="Token" name="token" rules={[ { required: true } ]} hasFeedback>
                        <TextArea prefix={<SolutionOutlined className="site-form-item-icon" />} placeholder="User Token" allowClear />
                    </Item>
                    <Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Change Password <BookOutlined />
                        </Button>
                    </Item>
                </Form>
            </div>
        </React.Fragment>
    )
}

export default PasswordChangeForm

