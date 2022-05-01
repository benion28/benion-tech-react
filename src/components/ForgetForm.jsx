import React, { useState } from 'react'
import { Form, Input, Button, Alert } from 'antd'
import { MailOutlined, SolutionOutlined } from '@ant-design/icons'
import '../styles/ForgetForm.scss'

const { Item } = Form;

const ForgetForm = () => {
    const [form] = Form.useForm();
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        setError('');
        setMessage('Reset data accepted !!');
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        setMessage('');
        setError('Reset data rejected, check fields for errors !!');
    };

    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: 'This is not a valid email!'
        }
    };

    const confirmEmails = () => ({
        validator(_, value) {
            if (!value || form.getFieldValue('email') === value) {
                return Promise.resolve();
            }

            return Promise.reject(new Error('The two emails that you entered do not match!'));
        }
    });

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
            <Form name="normal_login" form={ form } className="forget-form" onFinishFailed={ onFinishFailed } validateMessages={ validateMessages } initialValues={{ remember: true }} onFinish={ onFinish }>
                <Item className='form-item' label="Email" name="email" rules={[ { type:'email', required: true } ]}>
                    <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Your Email Address" allowClear />
                </Item>
                <Item className='form-item' label="Confirm" name="email2" dependencies={['email']} hasFeedback rules={[ { required: true }, confirmEmails ]}>
                    <Input prefix={<SolutionOutlined className="site-form-item-icon" />} placeholder="Retype Your Email Address" allowClear />
                </Item>
                <Item>
                    <Button type="danger" htmlType="submit" className="forget-form-button">
                        Send Reset Link
                    </Button>
                </Item>
            </Form>
        </div>
    )
}

export default ForgetForm

