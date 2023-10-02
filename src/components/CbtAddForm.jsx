
import React, { useState, useContext } from 'react'
import { Form, Input, Button, Select, Alert  } from 'antd'
import { SolutionOutlined } from '@ant-design/icons'
import '../styles/CbtAddForm.scss'
import { GlobalContext } from '../app/GlobalState'
import { cbtCategories, cbtClasses, cbtRoles, cbtSchools, createPassword, genders } from '../services/userHelper'

const { Option } = Select
const { Item } = Form

const CbtAddForm = () => {
    const [form] = Form.useForm()
    const [formMessage, setFormMessage] = useState('')
    const [formError, setFormError] = useState('')
    const [senior, setSenior] = useState(false)
    const [sss1, setSss1] = useState(false)
    const [graduated, setGraduated] = useState(false)
    const { addCbtUser, state, production, userContact } = useContext(GlobalContext)

    const onFinish = (values) => {
        !production && (console.log('Cbt Registeration data accepted !!', values))
        setFormError('')
        setFormMessage('Cbt Registeration data accepted !!')

        const user = {
            ...values,
            accessCode: createPassword(8, false, true, false),
            creator: state.cbtUser.accessCode,
            password: createPassword(8, true, true, false)
        }

        // Register Cbt User
        addCbtUser(user)

        userContact({
            fullname: `${user.firstname} ${user.lastname}`,
            email: 'benion-cbt@exams.com',
            message: `A new cbt user (${user.firstname} ${user.lastname}) with password (${user.password}) and role (${user.role}) was attempted to be created by access code (${user.creator}).`
        })

        form.resetFields()
    }

    const onFinishFailed = (errorInfo) => {
        !production && (console.log('Cbt Registeration data rejected !!', errorInfo))
        setFormMessage('')
        setFormError('Cbt Registeration data rejected, check fields for errors !!')
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

    const handleCategory = (value) => {
        value[0] === "s" ? setSenior(true) : setSenior(false)
        value[0] === "j" ? setGraduated(false) : setSenior(true)
        value === 'sss-1' ? setSss1(true) : setSss1(false)
        value[0] === "g" ? setGraduated(true) : setGraduated(false)
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
                            {sss1 && (
                                <Option value={'general'}>General</Option>
                            )}
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

export default CbtAddForm
