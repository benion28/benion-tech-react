import React, { useState, useContext, useEffect } from 'react'
import { Form, Input, Button, Checkbox, Select, DatePicker, TimePicker, Alert } from 'antd'
import { MailOutlined, SolutionOutlined } from '@ant-design/icons'
import { GlobalContext } from '../app/GlobalState'
import '../styles/AddUserForm.scss'
import { production, smsClasses, sessions, smsSubjects, firstCapital } from '../services/userHelper'

const { Option } = Select
const { Item } = Form

const SmsAddExamScheduleForm = ({ examSchedule }) => {
    const { state, addExamSchedule } = useContext(GlobalContext)
    const [form] = Form.useForm()
    const [teachers, setTeachers] = useState([])
    const [formMessage, setFormMessage] = useState('')
    const [formError, setFormError] = useState('')

    form.setFieldsValue(examSchedule)

    useEffect(() => {
        let filteredTeachers = []
        if (state.smsUser.roles[0] === "ADMIN") {
            filteredTeachers = state.smsUsers.filter(user => user.roles[0].name === "TEACHER")
        } else {
            filteredTeachers = state.smsUsers.filter(user => (user.roles[0].name === "TEACHER") && (user.clientemail === state.smsUser.email))
        }

        if (filteredTeachers.length > 0) {
            setTeachers(filteredTeachers)
        }
    }, [state.smsUsers, state.smsUser])

    const onFinish = (values) => {
        !production && (console.log('Add Exam Schedule data success !!', values))
        setFormError('')
        setFormMessage('Add Exam Schedule data success !!')

        // Add Teacher

        if (examSchedule.id) {
            values.id = examSchedule.id
            addExamSchedule(values)
        } else {
            addExamSchedule(values)
        }

        form.resetFields()
    }

    const onFinishFailed = (errorInfo) => {
        !production && (console.log('Add Exam Schedule data failed !!', errorInfo))
        setFormMessage('')
        setFormError('Add Exam Schedule data failed, check fields for errors !!')
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

    const handleEmailInputChange = (value) => {
        if (teachers.length > 0) {
            const fetchedTeacherList = teachers.filter(teacher => (teacher.email === value))
            if (fetchedTeacherList.length > 0) {
                const fetchedTeacher = fetchedTeacherList[0]
                form.setFieldsValue({
                    teacher_name: `${firstCapital(fetchedTeacher.firstname)} ${firstCapital(fetchedTeacher.lastname)}`
                })
            }
        }
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
            <Form name="basic" form={form} validateMessages={validateMessages} initialValues={examSchedule} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
                <div className="form-controller">
                    <Item className='form-item' label="Exam Name" name="exam_name" rules={[{ required: true }]}>
                        <Input prefix={<SolutionOutlined />} placeholder="Exam Name" allowClear />
                    </Item>
                    <Item className='form-item' name="subject_type" label="Subject" rules={[{ required: true }]}>
                        <Select style={{ width: 150 }} placeholder="Select a Subject" allowClear>
                            {smsSubjects.map(item => (
                                <Option key={item.value} value={item.value}>{item.name}</Option>
                            ))}
                        </Select>
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' hasFeedback label="Teacher Email" name="email" rules={[{ required: true }]}>
                        <Select style={{ width: 300 }} prefix={<MailOutlined />} showSearch onChange={(value) => handleEmailInputChange(value)} optionFilterProp="children" placeholder="Select a Teacher Email" allowClear>
                            {teachers?.map(item => (
                                <Option key={item.id} value={item.email}>{item.email}</Option>
                            ))}
                        </Select>
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' label="Teacher Name" name="teacher_name" rules={[{ required: true }]}>
                        <Input prefix={<SolutionOutlined />} placeholder="Teacher Name" allowClear disabled />
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' label="Client Email" name="client_email" rules={[{ type: 'email', required: true }]}>
                        <Input prefix={<MailOutlined />} placeholder="Client Email Address" allowClear />
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' name="select_class" label="Class" rules={[{ required: true }]}>
                        <Select style={{ width: 150 }} placeholder="Select a Class" allowClear>
                            {smsClasses.map(item => (
                                <Option key={item.value} value={item.value}>{item.name}</Option>
                            ))}
                        </Select>
                    </Item>
                    <Item className='form-item' name="select_section" label="Session" rules={[{ required: true }]}>
                        <Select style={{ width: 150 }} placeholder="Select a Session" allowClear>
                            {sessions.map(item => (
                                <Option key={item.value} value={item.value}>{item.name}</Option>
                            ))}
                        </Select>
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' name="select_date" label="Date" rules={[{ required: true }]}>
                        <DatePicker placeholder="Date" allowClear />
                    </Item>
                    <Item className='form-item' name="select_time" label="Time" rules={[{ required: true }]}>
                        <TimePicker placeholder="Time" allowClear />
                    </Item>
                </div>
                <div className="form-controller">
                    <Item label="Agree" name="agree" valuePropName="checked" rules={[{ required: true }]}>
                        <Checkbox>I intentionally wish to add an exam schedule</Checkbox>
                    </Item>
                </div>
                <div className="button-controller">
                    <Item>
                        <Button className="submit-button" type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Item>
                    <Item >
                        <Button className="reset-button" type="danger" onClick={onReset}>
                            Reset
                        </Button>
                    </Item>
                </div>
            </Form>
        </div>
    )
}

export default SmsAddExamScheduleForm

