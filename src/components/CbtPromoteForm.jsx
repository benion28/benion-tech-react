import React, { useState, useEffect, useContext } from 'react'
import { Form, Checkbox, Button, Select, Alert, Typography, Input  } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { cbtClasses, cbtRoles, cbtSchools } from '../services/userHelper'
import '../styles/CbtPromoteForm.scss'
import { production } from '../services/userHelper'
import { GlobalContext } from '../app/GlobalState'

const { Item } = Form
const { Option } = Select
const { Title } = Typography

const CbtPromoteForm = () => {
    const [form] = Form.useForm()
    const [formMessage, setFormMessage] = useState('')
    const [formError, setFormError] = useState('')
    const [promoteAll, setPromoteAll] = useState(false)
    const [students, setStudents] = useState([])
    const { state, promoteCbtUsers, updateCbtUser } = useContext(GlobalContext)

    useEffect(() => {
        if (state?.cbtUsers.length > 0) {
            const modifiedStudents = []
            state?.cbtUsers.forEach(item => {
                const object = {
                    name: `${item.firstname.trim()} ${item.lastname.trim()}`,
                    username: item.username
                }
                modifiedStudents.push(object)
            })
            setStudents(modifiedStudents)
        }
    }, [setStudents, form, state.cbtUsers])

    const onNameChange = (value) => {
        if (students.length > 0) {
            const nameFilter = students.filter(item => item.name === value)
            if (nameFilter.length > 0) {
                form.setFieldsValue({
                    username: nameFilter[0].username,
                    school: nameFilter[0].school,
                    role: nameFilter[0].role,
                    currentClass: nameFilter[0].className
                })
            }
        }
    }

    const onFinish = (values) => {
        !production && (console.log("Input data accepted !!", values))
        setFormError('')
        setFormMessage('Input data accepted !!')

        // Promote Code
        const item = {...values, school: 'sshh'}
        console.log("Input data accepted !!", item)

        if (promoteAll) {
            promoteCbtUsers(values)
        } else {
            const usernameFilter = state.cbtUsers.filter(student => student.username === values.username)
            const object = {...usernameFilter[0], className: values.futureClass}
            updateCbtUser(object)
        }
        form.resetFields()
    }

    const onFinishFailed = (errorInfo) => {
        !production && (console.log("Input data rejected !!", errorInfo))
        setFormMessage('')
        setFormError('Input data rejected, check fields for errors !!')
    }

    const validateMessages = {
        required: '${label} is required!'
    }

    const onReset = () => {
        form.resetFields()
    }

    const onPromote = () => {
        setPromoteAll(!promoteAll)
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
                <Form name="normal_login" form={ form } className="login-form" onFinishFailed={ onFinishFailed } initialValues={{ remember: true }} validateMessages={ validateMessages } onFinish={ onFinish }>
                    <Title level={4} className="text">Promote Students</Title>
                    { !promoteAll && (
                        <div className="form-controller">
                            <Item className='form-item' hasFeedback label="Full Name" name="fullname" rules={[ { required: true } ]}>
                                <Select showSearch onChange={(value) => onNameChange(value)} optionFilterProp="children" placeholder="Select a Student"  allowClear>
                                    {students?.map(item => (
                                        <Option key={item._id} value={item.name}>{item.name}</Option>
                                    ))}
                                </Select>
                            </Item>
                        </div>
                    )}
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
                        <Item className='form-item' name="role" label="Role" rules={[ { required: true } ]}>
                            <Select placeholder="Select a Role"  allowClear>
                                {cbtRoles.map(item => (
                                    <Option key={item.value} value={item.value}>{item.name}</Option>
                                ))}
                            </Select>
                        </Item>
                    </div>
                    { !promoteAll && (
                        <div className="form-controller">
                            <Item className='form-item' label="Username" hasFeedback name="username" rules={[ { required: true } ]}>
                                <Input prefix={<UserOutlined />} placeholder="Enter a Username" allowClear disabled />
                            </Item>
                        </div>
                    )}
                    <div className="form-controller">
                        <Item className='form-item' name="currentClass" label="Current Class" rules={[ { required: true } ]}>
                            <Select placeholder="Current Class"  allowClear>
                                {cbtClasses.map(item => (
                                    <Option key={item.value} value={item.value}>{item.name}</Option>
                                ))}
                                <Option value="graduated">Graduated</Option>
                            </Select>
                        </Item>
                    </div>
                    <div className="form-controller">
                        <Item className='form-item' name="futureClass" label="Future Class" rules={[ { required: true } ]}>
                            <Select placeholder="Future Class"  allowClear>
                                {cbtClasses.map(item => (
                                    <Option key={item.value} value={item.value}>{item.name}</Option>
                                ))}
                                <Option value="graduated">Graduated</Option>
                            </Select>
                        </Item>
                    </div>
                    <div className="form-controller">
                        <Item className='form-item' value={promoteAll} label="Promote All Students" name="promoteAll" valuePropName='checked' checked={ promoteAll } onChange= { onPromote }>
                            <Checkbox />
                        </Item>
                    </div>
                    <div className="promote-button-controller">
                        <Item>
                            <Button className="reset-button" type="danger" onClick={ onReset }>
                                Reset
                            </Button>
                            <Button type="primary" htmlType="submit" className="submit-button">
                                Promote
                            </Button>
                        </Item>
                    </div>
                </Form>
            </div>
        </React.Fragment>
    )
}

export default CbtPromoteForm

