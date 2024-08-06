import React, { useState, useContext } from 'react'
import { Form, Input, Button, Checkbox, Select, DatePicker, Alert } from 'antd'
import { PhoneOutlined, MailOutlined, EnvironmentOutlined, SolutionOutlined } from '@ant-design/icons'
import { GlobalContext } from '../app/GlobalState'
import '../styles/AddUserForm.scss'
import { production, smsGenders, firstCapital, smsUserFormRoles, religions } from '../services/userHelper'

const { Option } = Select;
const { Item } = Form;

const SmsAddUserForm = ({ user }) => {
    const { state, addUser } = useContext(GlobalContext)
    const [form] = Form.useForm()
    const [formMessage, setFormMessage] = useState('')
    const [formError, setFormError] = useState('')

    form.setFieldsValue(user)

    const onFinish = (values) => {
        !production && (console.log('Add User data success !!', values))
        setFormError('')
        setFormMessage('Add User data success !!')

        // Add User
        values.roles = [values.role]
        values.balance = 0

        if (user.id) {
            values.id = user.id
            addUser(values)
        } else {
            addUser(values)
        }

        form.resetFields()
    }

    const onFinishFailed = (errorInfo) => {
        !production && (console.log('Add User data failed !!', errorInfo))
        setFormMessage('')
        setFormError('Add User data failed, check fields for errors !!')
    }

    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: 'This is not a valid email!',
            number: 'This is not a valid number!',
        }
    }

    const onReset = () => {
        form.resetFields()
    }

    return (
        <div className="form-group">
            {(!production || (state.user.role === 'admin' && state.showAlert)) && (
                <div className="form-alert">
                    {formMessage !== '' && (
                        <Alert message={formMessage} type="success" showIcon closable />
                    )}
                    {formError !== '' && (
                        <Alert message={formError} type="error" showIcon closable />
                    )}
                </div>
            )}
            <div className="form-alert">
                {state.formError !== '' && (
                    <Alert message={state.formError} type="warning" showIcon closable />
                )}
            </div>
            <Form name="basic" form={form} validateMessages={validateMessages} initialValues={user} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
                <div className="form-controller">
                    <Item className='form-item' label="First Name" name="firstname" rules={[{ required: true }]}>
                        <Input prefix={<SolutionOutlined />} placeholder="First Name" allowClear />
                    </Item>
                    <Item className='form-item' label="Last Name" name="lastname" rules={[{ required: true }]}>
                        <Input prefix={<SolutionOutlined />} placeholder="Last Name" allowClear />
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' label="Middle Name" name="middlename" rules={[{ required: true }]}>
                        <Input prefix={<SolutionOutlined />} placeholder="Middle Name" allowClear />
                    </Item>
                    <Item className='form-item' label="Phone" name="phone" hasFeedback rules={[{ required: true, min: 8, max: 11 }]}>
                        <Input prefix={<PhoneOutlined />} placeholder="Phone" allowClear />
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' label="Email" name="email" rules={[{ type: 'email', required: true }]}>
                        <Input prefix={<MailOutlined />} placeholder="Email Address" allowClear />
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' label="Client Email" name="clientemail" rules={[{ type: 'email', required: true }]}>
                        <Input prefix={<MailOutlined />} placeholder="Client Email Address" allowClear />
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' name="gender" label="Gender" rules={[{ required: true }]}>
                        <Select  style={{ width: 150 }} placeholder="Select a Gender" allowClear>
                            {smsGenders.map(item => (
                                <Option key={item.value} value={item.value}>{firstCapital(item.name)}</Option>
                            ))}
                        </Select>
                    </Item>
                    <Item className='form-item' name="role" label="Role" rules={[{ required: true }]}>
                        <Select placeholder="Select a Role" allowClear>
                            {smsUserFormRoles.map(item => (
                                <Option key={item.value} value={item.value}>{item.name}</Option>
                            ))}
                        </Select>
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' name="dateofbirth" label="Date of Birth" rules={[{ required: true }]}>
                        <DatePicker placeholder="Date of Birth" allowClear />
                    </Item>
                    <Item className='form-item' name="joiningdate" label="Joining Date" rules={[{ required: true }]}>
                        <DatePicker placeholder="Joining Date" allowClear />
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' name="religion" label="Religion" rules={[{ required: true }]}>
                        <Select  style={{ width: 150 }} placeholder="Select a Religion" allowClear>
                            {religions.map(item => (
                                <Option key={item.value} value={item.value}>{item.name}</Option>
                            ))}
                        </Select>
                    </Item>
                    <Item className='form-item' label="Address" name="address" rules={[{ required: true }]}>
                        <Input prefix={<EnvironmentOutlined />} placeholder="Address" allowClear />
                    </Item>
                </div>
                <div className="form-controller">
                    <Item label="Agree" name="agree" valuePropName="checked" rules={[{ required: true }]}>
                        <Checkbox>I intentionally wish to add a user</Checkbox>
                    </Item>
                </div>
                <div className="button-controller">
                    <Item>
                        <Button className="submit-button" type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Item>
                    <Item>
                        <Button className="reset-button" type="danger" onClick={onReset}>
                            Reset
                        </Button>
                    </Item>
                </div>
            </Form>
        </div>
    )
}

export default SmsAddUserForm

