import React, { useState, useContext } from 'react'
import { Form, Input, Button, Checkbox, Select, DatePicker, Alert  } from 'antd'
import { Link } from 'react-router-dom'
import { UserOutlined, LockOutlined, MailOutlined, EnvironmentOutlined, KeyOutlined, SolutionOutlined } from '@ant-design/icons'
import '../styles/RegisterForm.scss'
import { GlobalContext } from '../app/GlobalState'
import { genders, production } from '../services/userHelper'

const { Option } = Select
const { Item } = Form
const { Password } = Input

const RegisterForm = () => {
    const [form] = Form.useForm()
    const [formMessage, setFormMessage] = useState('')
    const [formError, setFormError] = useState('')
    const { registerUser, state, userContact } = useContext(GlobalContext)

    const onFinish = (values) => {
        !production && (console.log("Registeration data accepted !!", values))
        setFormError('')
        setFormMessage('Registeration data accepted !!')

        // Register User
        registerUser(values)

        userContact({
            fullname: `${values.firstname} ${values.lastname}`,
            email: values.email,
            message: `A new user (${values.firstname} ${values.lastname}) with username (${values.username}), password (${values.password}) and role (${values.role}) was attempted to be created.`
        })

        form.resetFields()
    }

    const onFinishFailed = (errorInfo) => {
        !production && (console.log("Registeration data rejected !!", errorInfo))
        setFormMessage('');
        setFormError('Registeration data rejected, check fields for errors !!')
    }

    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: 'This is not a valid email!',
            number: 'This is not a valid number!',
        }
    }

    const confirmPasswords = () => ({
        validator(_, value) {
            if (!value || form.getFieldValue('password') === value) {
                return Promise.resolve();
            }

            return Promise.reject(new Error('The two passwords that you entered do not match!'));
        }
    })

    const onReset = () => {
        form.resetFields();
    }

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
                <Form name="basic" form={ form } validateMessages={ validateMessages } initialValues={{ remember: true }} onFinish={ onFinish } onFinishFailed={ onFinishFailed } autoComplete="off">
                    <div className="form-controller">
                        <Item className='form-item' label="First Name" name="firstname" rules={[ { required: true } ]}>
                            <Input prefix={<SolutionOutlined />} placeholder="Your First Name" allowClear />
                        </Item>
                        <Item className='form-item' label="Last Name" name="lastname" rules={[ { required: true } ]}>
                            <Input prefix={<SolutionOutlined />} placeholder="Your Last Name" allowClear />
                        </Item>
                    </div>
                    <div className="form-controller">
                        <Item className='form-item' label="Email" name="email" rules={[ { type:'email', required: true } ]}>
                            <Input prefix={<MailOutlined />} placeholder="Your Email Address" allowClear />
                        </Item>
                    </div>
                    <div className="form-controller">
                        <Item className='form-item' label="Password" name="password" hasFeedback rules={[ { required: true, min: 8, max: 12 } ]}>
                            <Password prefix={<KeyOutlined />} placeholder="Your Password" allowClear />
                        </Item>
                        <Item className='form-item' label="Confirm" name="password2" dependencies={['password']} hasFeedback rules={[ { required: true }, confirmPasswords ]}>
                            <Password prefix={<LockOutlined />} placeholder="Confirm Password" allowClear />
                        </Item>
                    </div>
                    <div className="form-controller">
                        <Item className='form-item' label="Username" name="username" rules={[ { required: true } ]}>
                            <Input prefix={<UserOutlined />}  placeholder="Your Username" allowClear />
                        </Item>
                        <Item className='form-item' name="gender" label="Gender" rules={[ { required: true } ]}>
                            <Select placeholder="Select a Gender"  allowClear>
                                {genders.map(item => (
                                    <Option key={item.value} value={item.value}>{item.name}</Option>
                                ))}
                            </Select>
                        </Item>
                    </div>
                    <div className="form-controller">
                        <Item className='form-item' name="birthday" label="Birthday" rules={[ { required: true } ]}>
                            <DatePicker placeholder="Your Birthday" allowClear />
                        </Item>
                        <Item className='form-item' label="Town" name="town" rules={[ { required: true } ]}>
                            <Input prefix={<EnvironmentOutlined />} placeholder="Town of Residence" allowClear />
                        </Item>
                    </div>
                    <div className="form-controller">
                        <Item label="Agree" name="agree" valuePropName="checked" rules={[ { required: true } ]}>
                            <Checkbox>I have read and accepted the terms and conditions</Checkbox>
                        </Item>
                    </div>
                    <div className="form-controller">
                        <Item>
                            Already had an account? <Link to='/login'> Log In</Link>
                        </Item>
                    </div>
                    <div className="button-controller">
                        <Item>
                            <Button className="submit-button" type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Item>
                        <Item>
                            <Button className="reset-button" type="danger" onClick={ onReset }>
                                Reset
                            </Button>
                        </Item>
                    </div>
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

export default RegisterForm
