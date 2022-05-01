import React, { useState } from 'react'
import { Form, Input, Button, Checkbox, Alert } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import '../styles/LogInForm.scss'

const { Item } = Form;
const { Password } = Input;

const LogInForm = () => {
    const [form] = Form.useForm();
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        setError('');
        setMessage('Log In data accepted !!');
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        setMessage('');
        setError('Log In data rejected, check fields for errors !!');
    };

    const validateMessages = {
        required: '${label} is required!'
    };

    return (
        <div className="form-group">
            <div className="form-alert">
                { message !== '' && (
                    <Alert message={message} type="success" showIcon closable />
                )}
                { error !== '' && (
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

