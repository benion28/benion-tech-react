import React, { useState, useContext } from 'react'
import { Form, Input, Button, Checkbox, Select, Alert  } from 'antd'
import { UserOutlined, MailOutlined, EnvironmentOutlined, SolutionOutlined, MoneyCollectOutlined, CalendarOutlined } from '@ant-design/icons'
import { GlobalContext } from '../app/GlobalState'
import '../styles/EditUserForm.scss'
import { genders, userRoles, production } from '../services/userHelper'

const { Option } = Select;
const { Item } = Form;

const EditUserForm = ({ user }) => {
    const { state, updateUser } = useContext(GlobalContext)
    const [form] = Form.useForm()
    const [formMessage, setFormMessage] = useState('')
    const [formError, setFormError] = useState('')

    form.setFieldsValue({
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        username: user.username,
        amountBalance: user.amountBalance,
        gender: user.gender,
        role: user.role,
        birthday: user.birthday,
        town: user.town
    })

    const onFinish = (values) => {
        !production && (console.log("Edit User data accepted !!", values))
        setFormError('')
        setFormMessage('Edit User data accepted !!')

        // Edit User
        const data = {
            ...user,
            ...values
        }
        updateUser(data)
    }

    const onFinishFailed = (errorInfo) => {
        !production && (console.log("Edit User data rejected !!", errorInfo))
        setFormMessage('')
        setFormError('Edit User data rejected, check fields for errors !!')
    }

    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: 'This is not a valid email!',
            number: 'This is not a valid number!',
        }
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
            <Form name="basic" form={ form } validateMessages={ validateMessages } initialValues={{ remember: true }} onFinish={ onFinish } onFinishFailed={ onFinishFailed } autoComplete="off">
                <div className="form-controller">
                    <Item hidden className='form-item' label="First Name" name="firstname" rules={[ { required: true } ]}>
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
                    <Item className='form-item' label="Amount" name="amountBalance" rules={[ { type:'number', required: true } ]}>
                        <Input type='number' prefix={<MoneyCollectOutlined />} placeholder="Amount Balance" allowClear />
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' name="gender" label="Gender" rules={[ { required: true } ]}>
                        <Select placeholder="Select a Gender"  allowClear>
                            {genders.map(item => (
                                <Option key={item.value} value={item.value}>{item.name}</Option>
                            ))}
                        </Select>
                    </Item>
                    <Item className='form-item' name="role" label="Role" rules={[ { required: true } ]}>
                        <Select placeholder="Select a Role"  allowClear>
                            {userRoles.map(item => (
                                <Option key={item.value} value={item.value}>{item.name}</Option>
                            ))}
                        </Select>
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' label="Birthday" name="birthday" rules={[ { required: true } ]}>
                        <Input prefix={<CalendarOutlined />} placeholder="Birthday" allowClear />
                    </Item>
                    <Item className='form-item' label="Town" name="town" rules={[ { required: true } ]}>
                        <Input prefix={<EnvironmentOutlined />} placeholder="Town of Residence" allowClear />
                    </Item>
                </div>
                <div className="form-controller">
                    <Item label="Agree" name="agree" valuePropName="checked" rules={[ { required: true } ]}>
                        <Checkbox>I intentionally wish to update this user</Checkbox>
                    </Item>
                </div>
                <div className="button-controller">
                    <Item>
                        <Button className="submit-button" type="primary" htmlType="submit">
                            Update
                        </Button>
                    </Item>
                </div>
            </Form>
        </div>
    )
}

export default EditUserForm

