import React, { useState, useContext, useEffect } from 'react'
import { Form, Input, Button, Checkbox, Select, DatePicker, Alert, InputNumber, message, Upload } from 'antd'
import { PhoneOutlined, MailOutlined, EnvironmentOutlined, SolutionOutlined, UploadOutlined } from '@ant-design/icons'
import { GlobalContext } from '../app/GlobalState'
import '../styles/AddUserForm.scss'
import { production, firstCapital, smsClasses, sessions, generateCode, feesType, paymentStatus, expenseType } from '../services/userHelper'

const { Option } = Select
const { TextArea } = Input
const { Item } = Form

const SmsAddExpenseForm = ({ expense }) => {
    const { state, addFeesCollection } = useContext(GlobalContext)
    const [form] = Form.useForm()
    const [students, setStudents] = useState([]);
    const [formMessage, setFormMessage] = useState('')
    const [formError, setFormError] = useState('')

    form.setFieldsValue(expense)

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

        if (expense.id) {
            values.id = expense.id
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
            <Form name="basic" form={form} validateMessages={validateMessages} initialValues={expense} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
                <div className="form-controller">
                    <Item className='form-item' label="First Name" name="first_name" rules={[{ required: true }]}>
                        <Input prefix={<SolutionOutlined />} placeholder="First Name" allowClear />
                    </Item>
                    <Item className='form-item' label="Last Name" name="last_name" rules={[{ required: true }]}>
                        <Input prefix={<SolutionOutlined />} placeholder="Last Name" allowClear />
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' label="Email" name="parent_email" rules={[{ type: 'email', required: true }]}>
                        <Input prefix={<MailOutlined />} placeholder="Email Address" allowClear />
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' label="Amount" name="amount" rules={[{ required: true }]}>
                        <Input prefix={<SolutionOutlined />} placeholder="Amount" allowClear />
                    </Item>
                    <Item className='form-item' name="date_expense" label="Payment Date" rules={[{ required: true }]}>
                        <DatePicker placeholder="Payment Date" allowClear />
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' label="Client Email" name="client_email" rules={[{ type: 'email', required: true }]}>
                        <Input prefix={<MailOutlined />} placeholder="Client Email Address" allowClear />
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' name="expense_type" label="Expense Type" rules={[{ required: true }]}>
                        <Select style={{ width: 120 }} placeholder="Expense Type" allowClear>
                            {expenseType.map(item => (
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
                    <Item label="Agree" name="agree" valuePropName="checked" rules={[{ required: true }]}>
                        <Checkbox>I intentionally wish to add an expense</Checkbox>
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

export default SmsAddExpenseForm

