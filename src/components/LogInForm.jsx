import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Form, Input, Button, Checkbox, Alert } from 'antd'
import { UserOutlined, LockOutlined, GoogleOutlined, LoginOutlined } from '@ant-design/icons'
import '../styles/LogInForm.scss'
import { production } from '../services/userHelper'
import { GlobalContext } from '../app/GlobalState'

const { Item } = Form
const { Password } = Input

const LogInForm = () => {
    const [form] = Form.useForm();
    const [formMessage, setFormMessage] = useState('')
    const [formError, setFormError] = useState('')
    const { userLogin, state, googleSignIn, userLoginAccess  } = useContext(GlobalContext)

    const onFinish = (values) => {
        !production && (console.log("Log In data accepted !!", values))
        setFormError('')
        setFormMessage('Log In data accepted !!')

        // Log In
        if (values.username === "benion28") {
            userLoginAccess(values)
        } else {
            userLogin(values)
        }
        form.resetFields()
    }

    const onFinishFailed = (errorInfo) => {
        !production && (console.log("Log In data rejected !!", errorInfo))
        setFormMessage('')
        setFormError('Log In data rejected, check fields for errors !!')
    }

    const onGoogleSignIn = () => {
        !production && (console.log('Google Auth Requested'))
        googleSignIn()
    }

    const validateMessages = {
        required: '${label} is required!'
    }

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
                { !state.loggedIn && (
                    <Form name="normal_login" form={ form } className="login-form" onFinishFailed={ onFinishFailed } validateMessages={ validateMessages } initialValues={{ remember: true }} onFinish={ onFinish }>
                        <Alert className="information-alert" message="You can also log in as Guest User  !!!" description="you can use 'username as guest';     and 'password as guest123'  !!!" type="info" showIcon />
                        <Item label="Username" name="username" rules={[ { required: true} ]}>
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" allowClear />
                        </Item>
                        <Item label="Password" name="password" rules={[ { required: true, min: 8, max: 12 } ]} hasFeedback>
                            <Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" allowClear />
                        </Item>
                        <Item>
                            <Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Remember Me</Checkbox>
                            </Item>
                            <Link className="login-form-forgot" to="/forget-password">Forgot Password</Link>
                        </Item>
                        <Item>
                            Don't have an account? <Link to='/register'> Create Account</Link>
                        </Item>
                        { !state.loggedIn && (
                            <Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Log In <LoginOutlined />
                                </Button>
                                <Button type="danger" onClick={ () => onGoogleSignIn() } className="google-button">
                                    Or Sign In With Your Google Account <GoogleOutlined />
                                </Button>
                            </Item>
                        )}
                    </Form>
                )}
                { state.loggedIn && (
                    <Alert 
                        className="information-alert-form" 
                        message="You are now logged in  !!!" 
                        description={ ` ` } 
                        type="info" 
                        showIcon 
                    />
                )}
                { state.loggedIn && (
                    <h2 className="alert-link">
                        You can now go to the <Link to="/dashboard">Dashboard</Link> panel
                    </h2>
                )}
            </div>
        </React.Fragment>
    )
}

export default LogInForm

