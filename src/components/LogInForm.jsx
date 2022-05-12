import React, { useState, useContext } from 'react'
import { Form, Input, Button, Checkbox, Alert } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import '../styles/LogInForm.scss'
import { GlobalContext } from '../app/GlobalState'

const { Item } = Form;
const { Password } = Input;

const LogInForm = () => {
    const [form] = Form.useForm();
    const [formMessage, setFormMessage] = useState('')
    const [formError, setFormError] = useState('')
    const { userLogin, message, error  } = useContext(GlobalContext)

    const onFinish = async (values) => {
        console.log('Received values of form: ', values)
        setFormError('')
        setFormMessage('Log In data accepted !!')

        // Log In
        userLogin(values)
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        setFormMessage('');
        setFormError('Log In data rejected, check fields for errors !!');
    };

    const validateMessages = {
        required: '${label} is required!'
    };

    return (
        <div className="form-group">
            <div className="form-alert">
                { formMessage !== '' && (
                    <Alert message={formMessage} type="success" showIcon closable />
                )}
                { formMessage !== '' && (
                    <Alert message={formError} type="error" showIcon closable />
                )}
            </div>
            <div className="form-alert">
                { message !== null && (
                    <Alert message={message} type="success" showIcon closable />
                )}
                { error !== null && (
                    <Alert message={error} type="error" showIcon closable />
                )}
            </div>
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
                    <a className="login-form-forgot" href="/contact">
                        Contact Us
                    </a>
                </Item>
                <Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log In
                    </Button>
                </Item>
            </Form>
        </div>
    )
}

export default LogInForm

