import React, { useState } from 'react'
import { Form, Input, Button, Checkbox, Select, DatePicker, Alert  } from 'antd'
import { UserOutlined, MailOutlined, EnvironmentOutlined, KeyOutlined, SolutionOutlined } from '@ant-design/icons'
import '../styles/RegisterForm.scss'

const { Option } = Select;
const { Item } = Form;
const { Password } = Input;

const AddStudentForm = () => {
    const [form] = Form.useForm();
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const onFinish = (values) => {
        console.log('Success:', values);
        setError('');
        setMessage('Registeration data accepted !!');
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        setMessage('');
        setError('Registeration data rejected, check fields for errors !!');
    };

    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: 'This is not a valid email!',
            number: 'This is not a valid number!',
        }
    };

    const onReset = () => {
        form.resetFields();
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
            <Form name="basic" form={ form } validateMessages={ validateMessages } initialValues={{ remember: true }} onFinish={ onFinish } onFinishFailed={ onFinishFailed } autoComplete="off">
                <div className="form-controller">
                    <Item className='form-item' label="First Name" name="firstname" rules={[ { required: true } ]}>
                        <Input prefix={<SolutionOutlined />} placeholder="First Name" allowClear />
                    </Item>
                    <Item className='form-item' label="Last Name" name="lastname" rules={[ { required: true } ]}>
                        <Input prefix={<SolutionOutlined />} placeholder="Last Name" allowClear />
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' label="Email" name="email" rules={[ { type:'email', required: true } ]}>
                        <Input prefix={<MailOutlined />} placeholder="Email Address" allowClear />
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' label="Username" name="username" rules={[ { required: true } ]}>
                        <Input prefix={<UserOutlined />}  placeholder="Username" allowClear />
                    </Item>
                    <Item className='form-item' label="Password" name="password" hasFeedback rules={[ { required: true, min: 8, max: 12 } ]}>
                        <Password prefix={<KeyOutlined />} placeholder="Password" allowClear />
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' name="gender" label="Gender" rules={[ { required: true } ]}>
                        <Select placeholder="Select a Gender"  allowClear>
                            <Option value="male">Male</Option>
                            <Option value="female">Female</Option>
                            <Option value="other">Other</Option>
                        </Select>
                    </Item>
                    <Item className='form-item' name="role" label="Role" rules={[ { required: true } ]}>
                        <Select placeholder="Select a Role"  allowClear>
                            <Option value="guest">Guest</Option>
                            <Option value="admin">Admin</Option>
                        </Select>
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' name="birthday" label="Birthday" rules={[ { required: true } ]}>
                        <DatePicker placeholder="Birthday" allowClear />
                    </Item>
                    <Item className='form-item' label="Town" name="town" rules={[ { required: true } ]}>
                        <Input prefix={<EnvironmentOutlined />} placeholder="Town of Residence" allowClear />
                    </Item>
                </div>
                <div className="form-controller">
                    <Item label="Agree" name="agree" valuePropName="checked" rules={[ { required: true } ]}>
                        <Checkbox>I intentionally wish to add a student</Checkbox>
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
        </div>
    )
}

export default AddStudentForm
