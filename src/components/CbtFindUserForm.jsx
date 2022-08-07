import React, { useState, useContext } from 'react'
import { Form, Input, Button, Select, Alert } from 'antd'
import { UserOutlined, SearchOutlined } from '@ant-design/icons'
import '../styles/CbtFindUserForm.scss'
import { GlobalContext } from '../app/GlobalState'
import { cbtClasses, cbtSchools, production, cbtUserFind } from '../services/userHelper'

const { Item } = Form
const { Option } = Select

const CbtFindUserForm = () => {
    const [form] = Form.useForm();
    const [formMessage, setFormMessage] = useState('')
    const [foundUser, setFoundUser] = useState(null)
    const [formError, setFormError] = useState('')
    const { state, findCbtUser  } = useContext(GlobalContext)

    const onFinish = (values) => {
        !production && (console.log("Cbt Find User data accepted", values))
        setFormError('')
        setFormMessage("Cbt Find User data accepted")

        // Find Username
        findCbtUser(values)
        const user = cbtUserFind(values, state)
        if (user.success) {
            setFoundUser(user.data)
            setFormError('')
            setFormMessage("Cbt User Found")
            form.resetFields()
        } else {
            setFoundUser(null)
            setFormMessage('')
            setFormError("Cbt User Not Found")
        }
    }

    const onFinishFailed = (errorInfo) => {
        !production && (console.log("Cbt Find User data rejected", errorInfo))
        setFormMessage('')
        setFormError("Cbt Find User data rejected")
    }

    const validateMessages = {
        required: '${label} is required!'
    }

    return (
        <React.Fragment>
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
                { !state.cbtLoggedIn && (
                    <Form name="normal_login" form={ form } className="login-form" onFinishFailed={ onFinishFailed } validateMessages={ validateMessages } initialValues={{ remember: true }} onFinish={ onFinish }>
                        {state.foundUser.username !== null && (
                            <Alert className="information-alert" message={state.foundUser.username} description="The above is the username found with the provided details" type="info" showIcon />
                        )}
                        <Item label="First Name" name="firstname" rules={[ { required: true} ]}>
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="First Name" allowClear />
                        </Item>
                        <Item label="Last Name" name="lastname" rules={[ { required: true} ]}>
                            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Last Name" allowClear />
                        </Item>
                        <Item className='form-item' name="school" label="School" rules={[ { required: true } ]}>
                            <Select placeholder="Select a School"  allowClear>
                                {cbtSchools.map(item => (
                                    <Option key={item.value} value={item.value}>{item.name}</Option>
                                ))}
                            </Select>
                        </Item>
                        <Item className='form-item' name="className" label="Class" rules={[ { required: true } ]}>
                            <Select placeholder="Select a Class"  allowClear>
                                {cbtClasses.map(item => (
                                    <Option key={item.value} value={item.value}>{item.name}</Option>
                                ))}
                                <Option value="graduated">Graduated</Option>
                            </Select>
                        </Item>
                        <Item className='form-item' name="role" label="Role" rules={[ { required: true } ]}>
                            <Select placeholder="Select a Role"  allowClear>
                                <Option value="student">Student</Option>
                                <Option value="moderator">Moderator</Option>
                                <Option value="admin">Administrator</Option>
                            </Select>
                        </Item>
                        { !state.cbtLoggedIn && (
                            <Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    Search For Username <SearchOutlined />
                                </Button>
                            </Item>
                        )}
                    </Form>
                )}
                {foundUser !== null && (
                    <Alert className="information-alert" message={foundUser.username} description="Above is the username found with the provided details" type="info" showIcon />
                )}
            </div>
        </React.Fragment>
    )
}

export default CbtFindUserForm
