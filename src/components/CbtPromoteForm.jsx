import React, { useState, useContext } from 'react'
import { Form, Button, Select, Alert, Typography  } from 'antd'
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
    const { state, promoteCbtUsers } = useContext(GlobalContext)

    const onFinish = (values) => {
        !production && (console.log("Input data accepted !!", values))
        setFormError('')
        setFormMessage('Input data accepted !!')

        // Promote Code
        promoteCbtUsers(values)
        // const { school, futureClass, currentClass,  role} = values
        // const schoolFilter = state.cbtUsers.filter(student => student.school === school)
        // const classFilter = schoolFilter.filter(student => student.className === currentClass)
        // const students = classFilter.filter(student => student.role === role)

        // students.forEach(student => {
        //     student.className = futureClass
        //     promoteCbtUsers(student)
        // })
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

