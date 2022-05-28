
import React, { useState, useContext } from 'react'
import { Form, Input, Button, Select, Alert  } from 'antd'
import { SolutionOutlined, BookOutlined } from '@ant-design/icons'
import '../styles/CbtRegisterForm.scss'
import { GlobalContext } from '../app/GlobalState'
import { cbtClasses, cbtSchools } from '../services/userHelper';

const { Option } = Select;
const { Item } = Form;

const CbtRegisterForm = () => {
    const [form] = Form.useForm()
    const [formMessage, setFormMessage] = useState('')
    const [formError, setFormError] = useState('')
    const { registerCbtUser, state } = useContext(GlobalContext)

    const onFinish = async (values) => {
        console.log('Success:', values);
        setFormError('')
        setFormMessage('Cbt Registeration data accepted !!')

        // Register Cbt User
        registerCbtUser(values)

        form.resetFields()
    }

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        setFormMessage('');
        setFormError('Cbt Registeration data rejected, check fields for errors !!');
    }

    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: 'This is not a valid email!',
            number: 'This is not a valid number!',
        }
    }

    const onReset = () => {
        form.resetFields();
    }

    return (
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
                            <Select placeholder="Select a Class"  allowClear>
                                {cbtSchools.map(item => (
                                    <Option key={item.value} value={item.value}>{item.name}</Option>
                                ))}
                            </Select>
                        </Item>
                    </div>
                    <div className="form-controller">
                        <Item className='form-item' name="category" label="Category" rules={[ { required: true } ]}>
                            <Select placeholder="Select a Category"  allowClear>
                                <Option value="junior">Junior</Option>
                                <Option value="science">Science</Option>
                                <Option value="arts">Arts</Option>
                                <Option value="commercial">Commercial</Option>
                            </Select>
                        </Item>
                        <Item className='form-item' name="gender" label="Gender" rules={[ { required: true } ]}>
                            <Select placeholder="Select a Gender"  allowClear>
                                <Option value="male">Male</Option>
                                <Option value="female">Female</Option>
                                <Option value="other">Other</Option>
                            </Select>
                        </Item>
                    </div>
                    <div className="form-controller">
                        <Item className='form-item' name="class" label="Class" rules={[ { required: true } ]}>
                            <Select placeholder="Select a Class"  allowClear>
                                {cbtClasses.map(item => (
                                    <Option key={item.value} value={item.value}>{item.name}</Option>
                                ))}
                            </Select>
                        </Item>
                        <Item className='form-item' label="Access Code" name="accessCode" rules={[ { required: true } ]}>
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
