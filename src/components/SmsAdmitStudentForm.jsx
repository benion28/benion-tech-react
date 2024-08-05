import React, { useState, useContext, useEffect } from 'react'
import { Form, Input, Button, Checkbox, Select, DatePicker, Alert, InputNumber, message, Space, Upload } from 'antd'
import { PhoneOutlined, MailOutlined, EnvironmentOutlined, SolutionOutlined, UploadOutlined } from '@ant-design/icons'
import { GlobalContext } from '../app/GlobalState'
import '../styles/AddUserForm.scss'
import { production, firstCapital, smsClasses, sessions, generateCode } from '../services/userHelper'

const { Option } = Select
const { Compact } = Space
const { TextArea } = Input
const { Item } = Form

const SmsAdmitStudentForm = ({ student }) => {
    const { state, admitStudent } = useContext(GlobalContext)
    const [form] = Form.useForm()
    const [students, setStudents] = useState([]);
    const [parents, setParents] = useState([]);
    const [image, setImage] = useState(null)
    const [percent, setPercent] = useState(0)
    const [fileList, setFileList] = useState(null)
    const [formMessage, setFormMessage] = useState('')
    const [formError, setFormError] = useState('')

    form.setFieldsValue(student)

    useEffect(() => {
        let filteredParents = []
        let filteredStudents = []
        if (state.smsUser.roles[0] === "ADMIN") {
            filteredStudents = state.smsUsers.filter(user => user.roles[0].name === "STUDENT")
            filteredParents = state.smsUsers.filter(user => user.roles[0].name === "PARENT")
        } else {
            filteredStudents = state.smsUsers.filter(user => (user.roles[0].name === "STUDENT") && (user.clientemail === state.smsUser.email))
            filteredParents = state.smsUsers.filter(user => (user.roles[0].name === "PARENT") && (user.clientemail === state.smsUser.email))
        }

        if (filteredStudents.length > 0) {
            setStudents(filteredStudents)
        }

        if (filteredParents.length > 0) {
            setParents(filteredParents)
        }
    }, [state.smsUsers, state.smsUser])

    const onFinish = (values) => {
        !production && (console.log('Admit Student data success !!', values))
        setFormError('')
        setFormMessage('Admit Student data success !!')

        // Admit Student

        if (student.id) {
            values.id = student.id
            admitStudent(values)
        } else {
            admitStudent(values)
        }

        form.resetFields()
    }

    const onFinishFailed = (errorInfo) => {
        !production && (console.log('Add User data failed !!', errorInfo))
        setFormMessage('')
        setFormError('Add User data failed, check fields for errors !!')
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
                    email: fetchedStudent.email,
                    gender: fetchedStudent.gender,
                    religion: fetchedStudent.religion,
                    date_of_birth: fetchedStudent.dateofbirth.slice(0, 10),
                    address: fetchedStudent.address
                })
            }
        }
    }

    const handleParentEmailInputChange = (value) => {
        if (parents.length > 0) {
            const fetchedParentList = parents.filter(parent => (parent.email === value))
            if (fetchedParentList.length > 0) {
                const fetchedParent = fetchedParentList[0]
                form.setFieldsValue({
                    father_name: `${firstCapital(fetchedParent.firstname)} ${firstCapital(fetchedParent.lastname)}`,
                    phone: fetchedParent.phone,
                    parent_email: value
                })
            }
        }
    }

    const onGenerate = () => {
        const date = new Date()
        const number = `${date.getFullYear()}/${state.smsUser.firstname[0].toUpperCase()}${state.smsUser.lastname[0].toUpperCase()}/${generateCode(5, false, true, false)}`
        form.setFieldsValue({
            admission_number: number
        })
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
            <Form name="basic" form={form} validateMessages={validateMessages} initialValues={student} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
                <div className="form-controller">
                    <Item className='form-item' hasFeedback label="Student Email" name="email" rules={[{ required: true }]}>
                        <Select prefix={<MailOutlined />} showSearch onChange={(value) => handleEmailInputChange(value)} optionFilterProp="children" placeholder="Select a Student Email" allowClear>
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
                    <Item className='form-item' hasFeedback label="Parent Email" name="parent_email" rules={[{ required: true }]}>
                        <Select prefix={<MailOutlined />} className="form-control" showSearch onChange={(value) => handleParentEmailInputChange(value)} optionFilterProp="children" placeholder="Search a Parent Email" allowClear>
                            {parents?.map(item => (
                                <Option key={item.id} value={item.email}>{item.email}</Option>
                            ))}
                        </Select>
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' label="Father's Name" name="father_name" rules={[{ required: true }]}>
                        <Input prefix={<SolutionOutlined />} placeholder="Father's Name" allowClear disabled />
                    </Item>
                    <Item className='form-item' label="Father's Phone" name="phone" hasFeedback rules={[{ required: true, min: 8, max: 11 }]}>
                        <Input prefix={<PhoneOutlined />} placeholder="Father's / Guardian's Phone" allowClear disabled />
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' label="Blood Group" name="blood_group" rules={[{ required: true }]}>
                        <Input prefix={<SolutionOutlined />} placeholder="Blood Group" allowClear />
                    </Item>
                    <Item className='form-item' label="Mother's Phone" name="mothers_phone" hasFeedback rules={[{ required: true, min: 8, max: 11 }]}>
                        <Input prefix={<PhoneOutlined />} placeholder="Mother's Phone" allowClear />
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' label="Client Email" name="client_email" rules={[{ type: 'email', required: true }]}>
                        <Input prefix={<MailOutlined />} placeholder="Client Email Address" allowClear />
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' name="class_name" label="Class" rules={[{ required: true }]}>
                        <Select placeholder="Select a Class" allowClear>
                            {smsClasses.map(item => (
                                <Option key={item.value} value={item.value}>{item.name}</Option>
                            ))}
                        </Select>
                    </Item>
                    <Item className='form-item' name="section" label="Session" rules={[{ required: true }]}>
                        <Select placeholder="Select a Session" allowClear>
                            {sessions.map(item => (
                                <Option key={item.value} value={item.value}>{item.name}</Option>
                            ))}
                        </Select>
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' name="discount" label="Discount" rules={[{ required: true }]}>
                        <InputNumber placeholder="Discount" allowClear />
                    </Item>
                    <Item className='form-item' name="admission_date" label="Admission Date" rules={[{ required: true }]}>
                        <DatePicker placeholder="Admission Date" allowClear />
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' label="Admission No" name="admission_number" rules={[{ required: true }]}>
                        <Input prefix={<SolutionOutlined />} placeholder="Year/Code/Sequential Number" allowClear />
                    </Item>
                    <Item className='form-item' label="Short Bio" name="short_bio" rules={[{ required: true }]} hasFeedback>
                        <TextArea prefix={<SolutionOutlined className="site-form-item-icon" />} placeholder="Short Bio" allowClear />
                    </Item>
                </div>
                <div className="form-controller">
                    <Upload className='form-item' name="image" accept="image/*" action="/upload.do" listType="picture" onChange={(info) => normFile(info)} allowClear>
                        <Button icon={<UploadOutlined />}>Click to upload an image</Button>
                    </Upload>
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
                    {!student.id && (
                        <Item className="reset-button" >
                            <Button className="reset-button" onClick={onGenerate} type="warning">
                                Generate Admission No
                            </Button>
                        </Item>
                    )}
                </div>
            </Form>
        </div>
    )
}

export default SmsAdmitStudentForm

