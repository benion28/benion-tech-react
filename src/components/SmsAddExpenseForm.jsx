import React, { useState, useContext } from 'react'
import { Form, Input, Button, Checkbox, Select, DatePicker, Alert } from 'antd'
import { MailOutlined, SolutionOutlined } from '@ant-design/icons'
import { GlobalContext } from '../app/GlobalState'
import '../styles/AddUserForm.scss'
import { production, paymentStatus, expenseType } from '../services/userHelper'

const { Option } = Select
const { Item } = Form

const SmsAddExpenseForm = ({ expense }) => {
    const { state, addExpense } = useContext(GlobalContext)
    const [form] = Form.useForm()
    const [formMessage, setFormMessage] = useState('')
    const [formError, setFormError] = useState('')

    form.setFieldsValue(expense)

    const onFinish = (values) => {
        !production && (console.log('Add Expense data success !!', values))
        setFormError('')
        setFormMessage('Add Expense data success !!')

        // Add Expense

        if (expense.id) {
            values.id = expense.id
            addExpense(values)
        } else {
            addExpense(values)
        }

        form.resetFields()
    }

    const onFinishFailed = (errorInfo) => {
        !production && (console.log('Add Expense data failed !!', errorInfo))
        setFormMessage('')
        setFormError('Add Expense data failed, check fields for errors !!')
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

