
import React, { useState, useContext } from 'react'
import { Form, Input, Button, Select, Alert  } from 'antd'
import { SolutionOutlined, BookOutlined, KeyOutlined, LockOutlined } from '@ant-design/icons'
import '../styles/CbtRegisterForm.scss'
import { GlobalContext } from '../app/GlobalState'
import { cbtCategories, cbtClasses, cbtSchools, createPassword, genders, production } from '../services/userHelper'

const { Option } = Select
const { Item } = Form
const { Password } = Input

const CbtRegisterForm = () => {
    const [form] = Form.useForm()
    const [formMessage, setFormMessage] = useState('')
    const [formError, setFormError] = useState('')
    const { registerCbtUser, state } = useContext(GlobalContext)

    const onFinish = async (values) => {
       !production && (console.log('Cbt Registeration data accepted !!', values)) 
        setFormError('')
        setFormMessage('Cbt Registeration data accepted !!')

        const user = {
            ...values,
            role: "student",
            accessCode: createPassword(8, false, true, false)
        }

        // Register Cbt User
        registerCbtUser(user)

        form.resetFields()
    }

    const onFinishFailed = (errorInfo) => {
        !production && (console.log('Cbt Registeration data rejected !!', errorInfo))
        setFormMessage('');
        setFormError('Cbt Registeration data rejected !!, check fields for errors !!');
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
            { !state.cbtLoggedIn && (
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
                        <Item className='form-item' name="school" label="School" rules={[ { required: true } ]}>
                            <Select placeholder="Select a School"  allowClear>
                                {cbtSchools.map(item => (
                                    <Option key={item.value} value={item.value}>{item.name}</Option>
                                ))}
                            </Select>
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
                        <Item className='form-item' name="category" label="Category" rules={[ { required: true } ]}>
                            <Select placeholder="Select a Category"  allowClear>
                                {cbtCategories.map(item => (
                                    <Option key={item.value} value={item.value}>{item.name}</Option>
                                ))}
                            </Select>
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
                        <Item className='form-item' name="className" label="Class" rules={[ { required: true } ]}>
                            <Select placeholder="Select a Class"  allowClear>
                                {cbtClasses.map(item => (
                                    <Option key={item.value} value={item.value}>{item.name}</Option>
                                ))}
                                <Option value="graduated">Graduated</Option>
                            </Select>
                        </Item>
                        <Item className='form-item' label="Access Code" name="creator" rules={[ { required: true } ]}>
                            <Input prefix={<BookOutlined />} placeholder="Your Access Code" allowClear />
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
        </div>
    )
}

export default CbtRegisterForm
