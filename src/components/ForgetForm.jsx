import React, { useState, useContext } from 'react'
import { Form, Input, Button, Alert } from 'antd'
import { Link } from 'react-router-dom'
import { MailOutlined, SolutionOutlined } from '@ant-design/icons'
import '../styles/ForgetForm.scss'
import { production } from '../services/userHelper'
import { GlobalContext } from '../app/GlobalState'

const { Item } = Form;

const ForgetForm = () => {
    const { userForget, state } = useContext(GlobalContext)
    const [form] = Form.useForm();
    const [formMessage, setFormMessage] = useState('')
    const [formError, setFormError] = useState('')

    const onFinish = (values) => {
        !production && (console.log("Reset data accepted !!", values))
        setFormError('')
        setFormMessage('Reset data accepted !!')

        // User Forget
        userForget(values)
        form.resetFields()
    };

    const onFinishFailed = (errorInfo) => {
        !production && (console.log("Reset data rejected !!", errorInfo))
        setFormMessage('');
        setFormError('Reset data rejected, check fields for errors !!');
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
                <Form name="normal_login" form={ form } className="forget-form" onFinishFailed={ onFinishFailed } validateMessages={ validateMessages } initialValues={{ remember: true }} onFinish={ onFinish }>
                    <Item className='form-item' label="Email" name="email" rules={[ { type:'email', required: true } ]}>
                        <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Your Email Address" allowClear />
                    </Item>
                    <Item className='form-item' label="Confirm" name="email2" dependencies={['email']} hasFeedback rules={[ { required: true }, confirmEmails ]}>
                        <Input prefix={<SolutionOutlined className="site-form-item-icon" />} placeholder="Retype Your Email Address" allowClear />
                    </Item>
                    <Item>
                        You can now <Link to='/login'> Log In</Link> Or <Link to='/register'> Create An Account</Link>
                    </Item>
                    <Item>
                        <Button type="danger" htmlType="submit" className="forget-form-button">
                            Send Reset Link
                        </Button>
                    </Item>
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
                <h2 className="alert-link" level={1}>
                    You can now go to the <Link to="/dashboard">Dashboard</Link> panel
                </h2>
            )}
        </div>
    )
}

export default ForgetForm

