import React, { useState, useContext, useEffect } from 'react'
import { Form, Input, Button, Checkbox, Select, DatePicker, Alert, InputNumber, message, Upload } from 'antd'
import { PhoneOutlined, MailOutlined, EnvironmentOutlined, SolutionOutlined, UploadOutlined } from '@ant-design/icons'
import { GlobalContext } from '../app/GlobalState'
import '../styles/AddUserForm.scss'
import { production, firstCapital, smsClasses, sessions, generateCode, terms, smsSubjects, getGradeName, getGradePoint, getPercentageScore } from '../services/userHelper'

const { Option } = Select
const { TextArea } = Input
const { Item } = Form

const SmsAddExamResultForm = ({ examResult }) => {
    const { state, admitStudent } = useContext(GlobalContext)
    const [form] = Form.useForm()
    const [students, setStudents] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [ class_name, setClassName ] = useState(null)
    const [formMessage, setFormMessage] = useState('')
    const [formError, setFormError] = useState('')

    form.setFieldsValue(examResult)

    useEffect(() => {
        let filteredStudents = []
        let filteredTeachers = state.teachers
        if (class_name !== null) {
            if (state.smsUser.roles[0] === "ADMIN") {
                filteredStudents = state.students.filter(item => item.class_name === class_name)
            } else {
                if (state.smsUser.roles[0] === "TEACHER") {
                    filteredStudents = filteredTeachers.filter(item => (item.class_room === class_name) && (item.client_email === state.smsUser.clientEmail))
                } else {
                    filteredStudents = state.students.filter(item => (item.class_name === class_name) && (item.client_email === state.smsUser.email))
                    filteredTeachers = filteredTeachers.filter(item => item.client_email === state.smsUser.email)
                }
            }
        }

        if (filteredStudents.length > 0) {
            setStudents(filteredStudents)
        }

        if (filteredTeachers.length > 0) {
            setTeachers(filteredTeachers)
        }
    }, [state.students, class_name, state.teachers, state.smsUser])

    const onFinish = (values) => {
        !production && (console.log('Admit Student data success !!', values))
        setFormError('')
        setFormMessage('Admit Student data success !!')

        // Admit Student

        if (examResult.id) {
            values.id = examResult.id
            admitStudent(values)
        } else {
            admitStudent(values)
        }

        form.resetFields()
    }

    const onFinishFailed = (errorInfo) => {
        !production && (console.log('Admit Student data failed !!', errorInfo))
        setFormMessage('')
        setFormError('Admit Student data failed, check fields for errors !!')
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
        if (students.length > 0) {
            const fetchedStudentList = students.filter(student => (student.email === value))
            if (fetchedStudentList.length > 0) {
                const fetchedStudent = fetchedStudentList[0]
                form.setFieldsValue({
                    student_name: `${firstCapital(fetchedStudent.first_name)} ${firstCapital(fetchedStudent.last_name)}`,
                    student_admission_number: fetchedStudent.admission_number,
                    parent_email: fetchedStudent.parent_email
                })
            }
        }
    }

    const handleMark = (value) => {
        if (!isNaN(value) || value === "") {
            form.setFieldsValue({
                grade_name: getGradeName(value, form.getFieldValue("ca")),
                grade_point: getGradePoint(value, form.getFieldValue("ca")),
                percentage_score: getPercentageScore(value, form.getFieldValue("ca"), form.getFieldValue("percentage_from"))
            })
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
            <Form name="basic" form={form} validateMessages={validateMessages} initialValues={examResult} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
                <div className="form-controller">
                    <Item className='form-item' name="class_name" label="Class" rules={[{ required: true }]}>
                        <Select style={{ width: 150 }} onChange={(value) => setClassName(value)} placeholder="Select a Class" allowClear>
                            {smsClasses.map(item => (
                                <Option key={item.value} value={item.value}>{item.name}</Option>
                            ))}
                        </Select>
                    </Item>
                    <Item className='form-item' name="subject" label="Subject" rules={[{ required: true }]}>
                        <Select style={{ width: 150 }} placeholder="Select a Subject" allowClear>
                            {smsSubjects.map(item => (
                                <Option key={item.value} value={item.value}>{item.name}</Option>
                            ))}
                        </Select>
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' hasFeedback label="Teacher Email" name="teacher_email" rules={[{ required: true }]}>
                        <Select style={{ width: 300 }} prefix={<MailOutlined />} showSearch optionFilterProp="children" placeholder="Select a Teacher Email" allowClear>
                            {teachers?.map(item => (
                                <Option key={item.id} value={item.email}>{item.email}</Option>
                            ))}
                        </Select>
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' name="term" label="Term" rules={[{ required: true }]}>
                        <Select style={{ width: 150 }} placeholder="Select a Term" allowClear>
                            {terms.map(item => (
                                <Option key={item.value} value={item.value}>{item.name}</Option>
                            ))}
                        </Select>
                    </Item>
                    <Item className='form-item' name="section" label="Session" rules={[{ required: true }]}>
                        <Select style={{ width: 150 }} placeholder="Select a Session" allowClear>
                            {sessions.map(item => (
                                <Option key={item.value} value={item.value}>{item.name}</Option>
                            ))}
                        </Select>
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' hasFeedback label="Student Email" name="email" rules={[{ required: true }]}>
                        <Select style={{ width: 300 }} prefix={<MailOutlined />} showSearch onChange={(value) => handleEmailInputChange(value)} optionFilterProp="children" placeholder="Select a Student Email" allowClear>
                            {students?.map(item => (
                                <Option key={item.id} value={item.email}>{item.email}</Option>
                            ))}
                        </Select>
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' label="Parent Email" name="parent_email" rules={[{ type: 'email', required: true }]}>
                        <Input prefix={<MailOutlined />} placeholder="Parent Email Address" allowClear disabled />
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' label="Student Name" name="student_name" rules={[{ required: true }]}>
                        <Input prefix={<SolutionOutlined />} placeholder="Student Name" allowClear disabled />
                    </Item>
                    <Item className='form-item' label="Student No" name="student_admission_number" rules={[{ required: true }]}>
                        <Input prefix={<SolutionOutlined />} placeholder="Student No" allowClear disabled />
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' label="Client Email" name="client_email" rules={[{ type: 'email', required: true }]}>
                        <Input prefix={<MailOutlined />} placeholder="Client Email Address" allowClear />
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' label="Percentage From" name="percentage_from" rules={[{ required: true }]}>
                        <Input prefix={<SolutionOutlined />} placeholder="Percentage From" allowClear />
                    </Item>
                    <Item className='form-item' name="ca" label="CA" rules={[{ required: true }]}>
                        <InputNumber placeholder="CA" allowClear />
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' name="mark" label="Exam" rules={[{ required: true }]}>
                        <InputNumber onChange={(value) => handleMark(value)} placeholder="Exam" allowClear />
                    </Item>
                    <Item className='form-item' label="Percentage Score" name="percentage_score" rules={[{ required: true }]}>
                        <Input prefix={<SolutionOutlined />} placeholder="Percentage Score" allowClear disabled />
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' label="Grade Point" name="grade_point" rules={[{ required: true }]}>
                        <Input prefix={<SolutionOutlined />} placeholder="Grade Point" allowClear disabled />
                    </Item>
                    <Item className='form-item' label="Grade Name" name="grade_name" rules={[{ required: true }]}>
                        <Input prefix={<SolutionOutlined />} placeholder="Grade Name" allowClear disabled />
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' name="result_date" label="Result Date" rules={[{ required: true }]}>
                        <DatePicker placeholder="Result Date" allowClear />
                    </Item>
                    <Item className='form-item' label="Comment" name="comment" rules={[{ required: true }]}>
                        <Input prefix={<SolutionOutlined />} placeholder="Comment" allowClear />
                    </Item>
                </div>
                <div className="form-controller">
                    <Item label="Agree" name="agree" valuePropName="checked" rules={[{ required: true }]}>
                        <Checkbox>I intentionally wish to add an exam result</Checkbox>
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

export default SmsAddExamResultForm

