import React, { useState, useContext, useEffect } from 'react'
import { Form, Input, Button, Select, Alert  } from 'antd'
import { SolutionOutlined } from '@ant-design/icons'
import { GlobalContext } from '../app/GlobalState'
import '../styles/CbtEditUserForm.scss'
import { cbtCategories, cbtClasses, cbtRoles, cbtSchools, genders, production } from '../services/userHelper'

const { Option } = Select
const { Item } = Form

const CbtEditUserForm = ({ user }) => {
    const { state, updateCbtUser } = useContext(GlobalContext)
    const [form] = Form.useForm()
    const [formMessage, setFormMessage] = useState('')
    const [senior, setSenior] = useState(false)
    const [graduated, setGraduated] = useState(false)
    const [formError, setFormError] = useState('')

    form.setFieldsValue({
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        category: user.category,
        gender: user.gender,
        role: user.role,
        className: user.className,
        school: user.school
    })

    useEffect(() => {
        if (user.className[0] === "s") {
            setSenior(true)
        }

        if (user.className[0] === "g") {
            setSenior(false)
            setGraduated(true)
        }
    }, [user.className])

    const onFinish = (values) => {
        !production && (console.log('Cbt Edit data accepted !!', values))
        setFormError('')
        setFormMessage('Cbt Edit data accepted !!')

        // Add User
        const data = {
            ...user,
            ...values
        }

        updateCbtUser(data)
    }

    const onFinishFailed = (errorInfo) => {
        !production && (console.log('Cbt Edit data rejected !!', errorInfo))
        setFormMessage('')
        setFormError('User data rejected, check fields for errors !!')
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

    const handleCategory = (value) => {
        if (value[0] === "s") {
            setSenior(true)
        }

        if (value[0] === "g") {
            setSenior(false)
            setGraduated(true)
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
                    <Item className='form-item' name="school" label="School" rules={[ { required: true } ]}>
                        <Select placeholder="Select a School"  allowClear>
                            {cbtSchools.map(item => (
                                <Option key={item.value} value={item.value}>{item.name}</Option>
                            ))}
                        </Select>
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' name="className" label="Class" rules={[ { required: true } ]}>
                        <Select placeholder="Select a Class" onChange={(value) => handleCategory(value)}  allowClear>
                            {cbtClasses.map(item => (
                                <Option key={item.value} value={item.value}>{item.name}</Option>
                            ))}
                            <Option value="graduated">Graduated</Option>
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
                    <Item className='form-item' name="category" label="Category" rules={[ { required: true } ]}>
                        <Select placeholder="Select a Category"  allowClear>
                            {senior && cbtCategories.filter(item => item.value !== 'general').filter(item => item.value !== "junior").map(item => (
                                <Option key={item.value} value={item.value}>{item.name}</Option>
                            ))}
                            {(!senior && !graduated) && cbtCategories.filter(item => item.value === "junior").map(item => (
                                <Option key={item.value} value={item.value}>{item.name}</Option>
                            ))}
                            {(graduated && !senior) && cbtCategories.filter(item => item.value !== 'general').map(item => (
                                <Option key={item.value} value={item.value}>{item.name}</Option>
                            ))}
                        </Select>
                    </Item>
                    <Item className='form-item' name="role" label="Role" rules={[ { required: true } ]}>
                        <Select placeholder="Select a Role"  allowClear>
                            {cbtRoles.map(item => (
                                <Option key={item.value} value={item.value}>{item.name}</Option>
                            ))}
                        </Select>
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

export default CbtEditUserForm
