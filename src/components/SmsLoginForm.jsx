import React, { useState, useContext } from 'react'
import { Form, Input, Button, Alert } from 'antd'
import { MailOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons'
import '../styles/CbtLoginForm.scss'
import { production } from '../services/userHelper'
import { GlobalContext } from '../app/GlobalState'

const { Item } = Form
const { Password } = Input
const { Fragment } =  React

const SmsLoginForm = () => {
    const [form] = Form.useForm();
    const [formMessage, setFormMessage] = useState('')
    const [formError, setFormError] = useState('')
    const { smsUserLogin, state  } = useContext(GlobalContext)

    const onFinish = (values) => {
        !production && (console.log("Cbt Login data accepted !!", values))
        setFormError('')
        setFormMessage('Cbt Login data accepted !!')

        // Cbt Log In
        smsUserLogin(values)
        form.resetFields()
    }

    const onFinishFailed = (errorInfo) => {
        !production && (console.log("Cbt Login data rejected !!", errorInfo))
        setFormMessage('')
        setFormError('Cbt Login data rejected !!, check fields for errors !!')
    }

    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: 'This is not a valid email!'
        }
    }

    return (
        <Fragment>
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
                { !state.smsLoggedIn && (
                    <Form name="normal_login" form={ form } className="login-form" onFinishFailed={ onFinishFailed } validateMessages={ validateMessages } initialValues={{ remember: true }} onFinish={ onFinish }>
                        <Item className='form-item' label="Email" name="email" rules={[ { type:'email', required: true } ]}>
                            <Input prefix={<MailOutlined />} placeholder="Your Email Address" allowClear />
                        </Item>
                        <Item label="Password" name="password" rules={[ { required: true, min: 8, max: 12 } ]} hasFeedback>
                            <Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" allowClear />
                        </Item>
                        { !state.smsLoggedIn && (
                            <Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Log In <LoginOutlined />
                                </Button>
                            </Item>
                        )}
                    </Form>
                )}
            </div>
        </Fragment>
    )
}

export default SmsLoginForm

