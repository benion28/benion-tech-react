import React, { useState, useContext } from 'react'
import { Form, Input, Button, Checkbox, Select, Alert  } from 'antd'
import { UserOutlined, MailOutlined, EnvironmentOutlined, SolutionOutlined, MoneyCollectOutlined, CalendarOutlined } from '@ant-design/icons'
import { GlobalContext } from '../app/GlobalState'
import '../styles/EditUserForm.scss'
import { genders, userRoles, production } from '../services/userHelper'

const { Option } = Select;
const { Item } = Form;

 const examQuestions = [
    {
        id: '0', 
        question: 'asfgsdkjgdfjhjklfdhgawsdsdfgjklkmmbghfbnhfg',
        optionA: 'bfhgdf',
        optionB: 'gdsgfd',
        optionC: 'etergdf',
        optionD: 'asasfsdxcz',
        answer: 'bfhgdf'
    },
    {
        id: '1', 
        question: '1asfgsdhfgjfhdsfagdgjkfgjfgsdgdfvdffgdbvxdgvdxvxcbvcxzxvdfgdfvdvdfbvdfgvbdfv',
        optionA: '1bfhgdf',
        optionB: '1gdsgfd',
        optionC: '1etergdf',
        optionD: '1asasfsdxcz',
        answer: '1etergdf'
    },
    {
        id: '2', 
        question: '2asfgsdhfgjfhdsfagdgjkfgjfgsdgdfvdffgdbvxdgvdxvxcbvcxzxvdfgdfvdvdfbvdfgvbdfv',
        optionA: '2bfhgdf',
        optionB: '2gdsgfd',
        optionC: '2etergdf',
        optionD: '2asasfsdxcz',
        answer: '2bfhgdf'
    },
    {
        id: '3', 
        question: '3asfgsdhfgjfhdsfagdgjkfgjfgsdgdfvdffgdbvxdgvdxvxcbvcxzxvdfgdfvdvdfbvdfgvbdfv',
        optionA: '3bfhgdf',
        optionB: '3gdsgfd',
        optionC: '3etergdf',
        optionD: '3asasfsdxcz',
        answer: '3gdsgfd'
    }
]

const cbtLoggedIn = true
const examTimeLimit = 30
const cbtTimeSpent = 0
const completed = false

const TestArea = () => {
    const { state, updateUser } = useContext(GlobalContext)
    const [form] = Form.useForm()
    const [formMessage, setFormMessage] = useState('')
    const [formError, setFormError] = useState('')

    const initialUser = {
        _id: "hhjfgdhjasf",
        firstname: "Bernard",
        lastname: "Iorver",
        email: "bernard.iorver@email.com",
        username: "benion",
        amountBalance: 2000,
        gender: "male",
        role: "admin",
        birthday: "14/10/1996",
        town: "kaduna"
    }

    form.setFieldsValue(initialUser)

    const onFinish = (values) => {
        !production && (console.log("Edit User data accepted !!", values))
        setFormError('')
        setFormMessage('Edit User data accepted !!')

        // Add User
        const data = {
            ...initialUser,
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

    const onReset = () => {
        form.resetFields()
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

export default TestArea

