import React, { useState, useContext, useEffect } from 'react'
import { Form, Input, Button, Checkbox, Select, DatePicker, Alert, message, Upload } from 'antd'
import { PhoneOutlined, MailOutlined, EnvironmentOutlined, SolutionOutlined, UploadOutlined } from '@ant-design/icons'
import { GlobalContext } from '../app/GlobalState'
import '../styles/AddUserForm.scss'
import { production, smsClasses, sessions, smsSubjects } from '../services/userHelper'

const { Option } = Select
const { TextArea } = Input
const { Item } = Form

const SmsAddTeacherForm = ({ teacher }) => {
    const { state, addTeacher } = useContext(GlobalContext)
    const [form] = Form.useForm()
    const [teachers, setTeachers] = useState([])
    const [fileList, setFileList] = useState(null)
    const [formMessage, setFormMessage] = useState('')
    const [formError, setFormError] = useState('')

    form.setFieldsValue(teacher)

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
        !production && (console.log('Add Teacher data success !!', values))
        setFormError('')
        setFormMessage('Add Teacher data success !!')

        // Add Teacher

        if (teacher.id) {
            values.id = teacher.id
            addTeacher(values)
        } else {
            addTeacher(values)
        }

        form.resetFields()
    }

    const onFinishFailed = (errorInfo) => {
        !production && (console.log('Add Teacher data failed !!', errorInfo))
        setFormMessage('')
        setFormError('Add Teacher data failed, check fields for errors !!')
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
                    phone: fetchedTeacher.phone,
                    last_name: fetchedTeacher.lastname,
                    first_name: fetchedTeacher.firstname,
                    religion: fetchedTeacher.religion,
                    date_of_birth: fetchedTeacher.dateofbirth,
                    gender: fetchedTeacher.gender,
                    address: fetchedTeacher.address
                })
            }
        }
    }

    const normFile = (info) => {
        if (info.file.status !== 'uploading') {
            message.success(`${info.fileList[0].name} uploading`)
            !production && (console.log("Info File", info.fileList))
            console.log("Info File", info.fileList)
        }
        if (info.file.status !== 'done') {
            message.success(`${info.file.name} uploaded successfully`)
            setFileList(info.file)
            !production && (console.log("File Upload Info", info))
        } else if (info.file.status !== 'error') {
            message.error(`${info.file.name} upload failed`)
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
            <Form name="basic" form={form} validateMessages={validateMessages} initialValues={teacher} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
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
                    <Item className='form-item' label="First Name" name="first_name" rules={[{ required: true }]}>
                        <Input prefix={<SolutionOutlined />} placeholder="First Name" allowClear disabled />
                    </Item>
                    <Item className='form-item' label="Last Name" name="last_name" rules={[{ required: true }]}>
                        <Input prefix={<SolutionOutlined />} placeholder="Last Name" allowClear disabled />
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' label="Gender" name="gender" rules={[{ required: true }]}>
                        <Input prefix={<SolutionOutlined />} placeholder="Gender" allowClear disabled />
                    </Item>
                    <Item className='form-item' label="Religion" name="religion" rules={[{ required: true }]}>
                        <Input prefix={<SolutionOutlined />} placeholder="Religion" allowClear disabled />
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' label="Date of Birth" name="date_of_birth" rules={[{ required: true }]}>
                        <Input prefix={<SolutionOutlined />} placeholder="Date of Birth" allowClear disabled />
                    </Item>
                    <Item className='form-item' label="Address" name="address" rules={[{ required: true }]}>
                        <Input prefix={<EnvironmentOutlined />} placeholder="Address" allowClear disabled />
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' label="Blood Group" name="blood_group" rules={[{ required: true }]}>
                        <Input prefix={<SolutionOutlined />} placeholder="Blood Group" allowClear />
                    </Item>
                    <Item className='form-item' label="Phone" name="phone" hasFeedback rules={[{ required: true, min: 8, max: 11 }]}>
                        <Input prefix={<PhoneOutlined />} placeholder="Phone" allowClear disabled />
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' label="Client Email" name="client_email" rules={[{ type: 'email', required: true }]}>
                        <Input prefix={<MailOutlined />} placeholder="Client Email Address" allowClear />
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' name="class_room" label="Class" rules={[{ required: true }]}>
                        <Select style={{ width: 150 }} placeholder="Select a Class" allowClear>
                            {smsClasses.map(item => (
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
                    <Item className='form-item' name="subject" label="Subject" rules={[{ required: true }]}>
                        <Select style={{ width: 150 }} placeholder="Select a Subject" allowClear>
                            {smsSubjects.map(item => (
                                <Option key={item.value} value={item.value}>{item.name}</Option>
                            ))}
                        </Select>
                    </Item>
                    <Item className='form-item' name="joiningdate" label="Joining Date" rules={[{ required: true }]}>
                        <DatePicker placeholder="Joining Date" allowClear />
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' label="Short Bio" name="short_bio" rules={[{ required: true }]} hasFeedback>
                        <TextArea prefix={<SolutionOutlined className="site-form-item-icon" />} placeholder="Short Bio" allowClear />
                    </Item>
                </div>
                <div className="form-controller">
                    <Upload className='form-item' name="image_url" accept="image/*" action="/upload.do" listType="picture" onChange={(info) => normFile(info)} allowClear>
                        <Button icon={<UploadOutlined />}>Click to upload an image</Button>
                    </Upload>
                </div>
                <div className="form-controller">
                    <Item label="Agree" name="agree" valuePropName="checked" rules={[{ required: true }]}>
                        <Checkbox>I intentionally wish to add a teacher</Checkbox>
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

export default SmsAddTeacherForm

