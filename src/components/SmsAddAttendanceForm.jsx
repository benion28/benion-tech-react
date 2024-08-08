import React, { useState, useContext, useEffect } from 'react'
import { Form, Input, Button, Checkbox, Select, Alert } from 'antd'
import { MailOutlined, SolutionOutlined } from '@ant-design/icons'
import { GlobalContext } from '../app/GlobalState'
import '../styles/AddUserForm.scss'
import { production, smsClasses, sessions, getNumbersArray, months, years, attendanceStatus } from '../services/userHelper'

const { Option } = Select
const { Item } = Form

const SmsAddAttendanceForm = ({ attendance }) => {
    const { state, addAttendance } = useContext(GlobalContext)
    const [form] = Form.useForm()
    const [students, setStudents] = useState([]);
    const [class_name, setClassRoom] = useState(attendance.class_name);
    const [formMessage, setFormMessage] = useState('')
    const [formError, setFormError] = useState('')

    form.setFieldsValue(attendance)

    useEffect(() => {
        if (state.user.roles[0] === "TEACHER") {
            const filteredTeachers = state.teachers.filter(teacher => teacher.email === state.user.email)
            if (filteredTeachers.length > 0) {
                const stateFilteredStudents = state.students.filter(student => (student.client_email === state.user.clientEmail) && (student.class_name === filteredTeachers[0].class_room))
                setClassRoom(filteredTeachers[0].class_room)
                if (stateFilteredStudents.length > 0) {
                    setStudents(stateFilteredStudents)
                }
            }
        } else if (state.user.roles[0] === "MODR") {
            const stateFilteredStudents = state.students.filter(student => student.client_email === state.user.email)
            if (stateFilteredStudents.length > 0) {
                setStudents(stateFilteredStudents)
            }
        } else {
            const fetchedStudents = state.students
            if (fetchedStudents.length > 0) {
                setStudents(fetchedStudents)
            }
        }
    }, [state.students, state.teachers, state.user.email, state.user.roles, state.user])

    const onFinish = (values) => {
        !production && (console.log('Add Class Attendance data success !!', values))
        setFormError('')
        setFormMessage('Add Class Attendance data success !!')

        // Add Class Attendance

        if (attendance.id) {
            values.id = attendance.id
            addAttendance(values)
        } else {
            const attendanceFiltered = state.attendances.filter(item => (item.student_number === values.student_number) && (item.class_name === class_name) && (item.select_year === values.select_year) && (item.select_month === values.select_month) && (item.select_section === values.select_section) && (item.select_day === values.select_day))
            if (attendanceFiltered.length > 0) {
                const foundAttendance = attendanceFiltered[0]
                foundAttendance.status = values.status
                addAttendance(foundAttendance)
            } else {
                addAttendance(values)
            }
        }

        form.resetFields()
    }

    const onFinishFailed = (errorInfo) => {
        !production && (console.log('Add Class Attendance data failed !!', errorInfo))
        setFormMessage('')
        setFormError('Add Class Attendance data failed, check fields for errors !!')
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
                    first_name: fetchedStudent.firstname,
                    last_name: fetchedStudent.lastname,
                    student_number: fetchedStudent.admission_number,
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
            <Form name="basic" form={form} validateMessages={validateMessages} initialValues={attendance} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
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
                    <Item className='form-item' label="First Name" name="first_name" rules={[{ required: true }]}>
                        <Input prefix={<SolutionOutlined />} placeholder="First Name" allowClear disabled />
                    </Item>
                    <Item className='form-item' label="Last Name" name="last_name" rules={[{ required: true }]}>
                        <Input prefix={<SolutionOutlined />} placeholder="Last Name" allowClear disabled />
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' label="Student No" name="student_number" rules={[{ required: true }]}>
                        <Input prefix={<SolutionOutlined />} placeholder="Student No" allowClear disabled />
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
                    <Item className='form-item' name="class_name" label="Class" rules={[{ required: true }]}>
                        <Select style={{ width: 150 }} onChange={(value) => setClassRoom(value)} placeholder="Select a Class" allowClear>
                            {smsClasses.map(item => (
                                <Option key={item.value} value={item.value}>{item.name}</Option>
                            ))}
                        </Select>
                    </Item>
                    <Item className='form-item' name="select_day" label="Day" rules={[{ required: true }]}>
                        <Select style={{ width: 150 }} placeholder="Select a Day" allowClear>
                            {getNumbersArray(31).map(item => (
                                <Option key={item} value={item}>{item}</Option>
                            ))}
                        </Select>
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' label="Client Email" name="client_email" rules={[{ type: 'email', required: true }]}>
                        <Input prefix={<MailOutlined />} placeholder="Client Email Address" allowClear />
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' name="select_month" label="Month" rules={[{ required: true }]}>
                        <Select style={{ width: 150 }} placeholder="Select a Month" allowClear>
                            {months.map(item => (
                                <Option key={item.value} value={item.value}>{item.name}</Option>
                            ))}
                        </Select>
                    </Item>
                    <Item className='form-item' name="select_year" label="Year" rules={[{ required: true }]}>
                        <Select style={{ width: 150 }} placeholder="Select a Year" allowClear>
                            {years.map(item => (
                                <Option key={item} value={item}>{item}</Option>
                            ))}
                        </Select>
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' name="status" label="Status" rules={[{ required: true }]}>
                        <Select style={{ width: 150 }} placeholder="Select a Status" allowClear>
                            {attendanceStatus.map(item => (
                                <Option key={item} value={item}>{item}</Option>
                            ))}
                        </Select>
                    </Item>
                </div>
                <div className="form-controller">
                    <Item label="Agree" name="agree" valuePropName="checked" rules={[{ required: true }]}>
                        <Checkbox>I intentionally wish to admit a student</Checkbox>
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

export default SmsAddAttendanceForm

