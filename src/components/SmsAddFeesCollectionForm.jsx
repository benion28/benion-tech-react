import React, { useState, useContext, useEffect } from 'react'
import { Form, Input, Button, Checkbox, Select, DatePicker, Alert } from 'antd'
import { MailOutlined, SolutionOutlined } from '@ant-design/icons'
import { GlobalContext } from '../app/GlobalState'
import '../styles/AddUserForm.scss'
import { production, sessions, feesType, paymentStatus } from '../services/userHelper'

const { Option } = Select
const { Item } = Form

const SmsAddFeesCollectionForm = ({ feesCollection }) => {
    const { state, addFeesCollection } = useContext(GlobalContext)
    const [form] = Form.useForm()
    const [students, setStudents] = useState([]);
    const [formMessage, setFormMessage] = useState('')
    const [formError, setFormError] = useState('')

    form.setFieldsValue(feesCollection)

    useEffect(() => {
        let filteredStudents = []
        if (state.smsUser.roles[0] === "ADMIN") {
            filteredStudents = state.students
        } else {
            filteredStudents = state.students.filter(student => student.client_email === state.smsUser.email)
        }

        if (filteredStudents.length > 0) {
            setStudents(filteredStudents)
        }
    }, [state.students, state.smsUser])

    const onFinish = (values) => {
        !production && (console.log('Add Fees Collection data success !!', values))
        setFormError('')
        setFormMessage('Add Fees Collection data success !!')

        // Add Fees Collection

        if (feesCollection.id) {
            values.id = feesCollection.id
            addFeesCollection(values)
        } else {
            addFeesCollection(values)
        }

        form.resetFields()
    }

    const onFinishFailed = (errorInfo) => {
        !production && (console.log('Add Fees Collection data failed !!', errorInfo))
        setFormMessage('')
        setFormError('Add Fees Collection data failed, check fields for errors !!')
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
                    first_name: fetchedStudent.first_name,
                    last_name: fetchedStudent.last_name,
                    gender: fetchedStudent.gender,
                    class_room: fetchedStudent.class_name,
                    parent_email: fetchedStudent.parent_email,
                    admission_number: fetchedStudent.admission_number
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
            <Form name="basic" form={form} validateMessages={validateMessages} initialValues={feesCollection} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
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
                    <Item className='form-item' label="Gender" name="gender" rules={[{ required: true }]}>
                        <Input prefix={<SolutionOutlined />} placeholder="Gender" allowClear disabled />
                    </Item>
                    <Item className='form-item' label="Class" name="class_room" rules={[{ required: true }]}>
                        <Input prefix={<SolutionOutlined />} placeholder="Class" allowClear disabled />
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' label="Parent Email" name="parent_email" rules={[{ type: 'email', required: true }]}>
                        <Input prefix={<MailOutlined />} placeholder="Parent Email Address" allowClear disabled />
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' label="Admission No" name="admission_number" rules={[{ required: true }]}>
                        <Input prefix={<SolutionOutlined />} placeholder="Year/Code/Sequential Number" allowClear disabled />
                    </Item>
                    <Item className='form-item' name="school_section" label="Session" rules={[{ required: true }]}>
                        <Select style={{ width: 150 }} placeholder="Select a Session" allowClear>
                            {sessions.map(item => (
                                <Option key={item.value} value={item.value}>{item.name}</Option>
                            ))}
                        </Select>
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' label="Amount Paid" name="fees" rules={[{ required: true }]}>
                        <Input prefix={<SolutionOutlined />} placeholder="Amount Paid" allowClear />
                    </Item>
                    <Item className='form-item' label="Total Amount" name="amount" rules={[{ required: true }]}>
                        <Input prefix={<SolutionOutlined />} placeholder="Total Amount" allowClear />
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' label="Client Email" name="client_email" rules={[{ type: 'email', required: true }]}>
                        <Input prefix={<MailOutlined />} placeholder="Client Email Address" allowClear />
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' name="expense_type" label="Payment Type" rules={[{ required: true }]}>
                        <Select style={{ width: 120 }} placeholder="Payment Type" allowClear>
                            {feesType.map(item => (
                                <Option key={item.value} value={item.value}>{item.name}</Option>
                            ))}
                        </Select>
                    </Item>
                    <Item className='form-item' name="status" label="Payment Status" rules={[{ required: true }]}>
                        <Select style={{ width: 120 }} placeholder="Payment Status" allowClear>
                            {paymentStatus.map(item => (
                                <Option key={item.value} value={item.value}>{item.name}</Option>
                            ))}
                        </Select>
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' name="fees_date" label="Payment Date" rules={[{ required: true }]}>
                        <DatePicker placeholder="Payment Date" allowClear />
                    </Item>
                    <Item className='form-item' name="due_date" label="Due Date" rules={[{ required: true }]}>
                        <DatePicker placeholder="Due Date" allowClear />
                    </Item>
                </div>
                <div className="form-controller">
                    <Item label="Agree" name="agree" valuePropName="checked" rules={[{ required: true }]}>
                        <Checkbox>I intentionally wish to add a fees collection</Checkbox>
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

export default SmsAddFeesCollectionForm

