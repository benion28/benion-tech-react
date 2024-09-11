import React, { useState, useContext, useEffect } from 'react'
import { Form, Input, Button, Checkbox, Select, DatePicker, Alert } from 'antd'
import { MailOutlined, SolutionOutlined } from '@ant-design/icons'
import { GlobalContext } from '../app/GlobalState'
import '../styles/AddUserForm.scss'
import { production, generateCode } from '../services/userHelper'

const { Option } = Select
const { Item } = Form

const SmsAddTransactionForm = ({ transaction }) => {
    const { state, addTransaction } = useContext(GlobalContext)
    const [form] = Form.useForm()
    const [users, setUsers] = useState([]);
    const [formMessage, setFormMessage] = useState('')
    const [formError, setFormError] = useState('')

    form.setFieldsValue(transaction)

    useEffect(() => {
        let filteredUsers = [];
        if (state.smsUser.roles[0] === "ADMIN") {
            filteredUsers = state.smsUsers;
        } else {
            filteredUsers = state.smsUsers.filter(
                (user) => user.clientemail === state.smsUser.email
            );
        }

        if (filteredUsers.length > 0) {
            setUsers(filteredUsers);
        }
    }, [state.smsUsers, state.smsUser])

    const onFinish = (values) => {
        !production && (console.log('Add Transaction data success !!', values))
        setFormError('')
        setFormMessage('Add Transaction data success !!')

        // Add Transaction

        if (transaction.id) {
            values.id = transaction.id
            addTransaction(values)
        } else {
            values.status = "success"
            values.channel = "sms-penetraliahub"
            values.currency = "NGN"
            values.type = "manual"
            values.created = new Date().toISOString()
            addTransaction(values)
        }

        form.resetFields()
    }

    const onFinishFailed = (errorInfo) => {
        !production && (console.log('Add Transaction data failed !!', errorInfo))
        setFormMessage('')
        setFormError('Add Transaction data failed, check fields for errors !!')
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

    const onGenerate = () => {
        const number = generateCode(10, true, true, false)
        form.setFieldsValue({
            reference: number
        })
    }

    const handleEmailInputChange = (value) => {
        if (users.length > 0) {
            const fetchedUserList = users.filter(user => (user.email === value))
            if (fetchedUserList.length > 0) {
                const fetchedUser = fetchedUserList[0]
                form.setFieldsValue({
                    recievers_first_name: fetchedUser.firstname,
                    recievers_last_name: fetchedUser.lastname
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
            <Form name="basic" form={form} validateMessages={validateMessages} initialValues={transaction} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
                <div className="form-controller">
                    <Item className='form-item' hasFeedback label="Reciever's Email" name="recievers_email" rules={[{ required: true }]}>
                        <Select style={{ width: 300 }} prefix={<MailOutlined />} showSearch onChange={(value) => handleEmailInputChange(value)} optionFilterProp="children" placeholder="Select a Student Email" allowClear>
                            {users?.map(item => (
                                <Option key={item.id} value={item.email}>{item.email}</Option>
                            ))}
                        </Select>
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' label="Reciever's First Name" name="recievers_first_name" rules={[{ required: true }]}>
                        <Input prefix={<SolutionOutlined />} placeholder="Reciever's First Name" allowClear disabled />
                    </Item>
                    <Item className='form-item' label="Reciever's Last Name" name="recievers_last_name" rules={[{ required: true }]}>
                        <Input prefix={<SolutionOutlined />} placeholder="Reciever's Last Name" allowClear disabled />
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' label="Sender's Email" name="senders_email" rules={[{ type: 'email', required: true }]}>
                        <Input prefix={<MailOutlined />} placeholder="Sender's Email Address" allowClear />
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' label="Sender's First Name" name="customers_first_name" rules={[{ required: true }]}>
                        <Input prefix={<SolutionOutlined />} placeholder="Sender's First Name" allowClear />
                    </Item>
                    <Item className='form-item' label="Sender's Last Name" name="customers_last_name" rules={[{ required: true }]}>
                        <Input prefix={<SolutionOutlined />} placeholder="Sender's Last Name" allowClear />
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' label="Amount Paid" name="amount" rules={[{ required: true }]}>
                        <Input prefix={<SolutionOutlined />} placeholder="Amount Paid" allowClear />
                    </Item>
                    <Item className='form-item' label="Payment Reference" name="reference" rules={[{ required: true }]}>
                        <Input prefix={<SolutionOutlined />} placeholder="Payment Reference" allowClear />
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' label="Client Email" name="client_email" rules={[{ type: 'email', required: true }]}>
                        <Input prefix={<MailOutlined />} placeholder="Client Email Address" allowClear />
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' name="paid_at" label="Payment Date" rules={[{ required: true }]}>
                        <DatePicker placeholder="Payment Date" allowClear />
                    </Item>
                </div>
                <div className="form-controller">
                    <Item label="Agree" name="agree" valuePropName="checked" rules={[{ required: true }]}>
                        <Checkbox>I intentionally wish to add a transaction</Checkbox>
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
                    {!transaction.id && (
                        <Item className="reset-button" >
                            <Button className="reset-button" onClick={onGenerate} type="warning">
                                Generate Reference
                            </Button>
                        </Item>
                    )}
                </div>
            </Form>
        </div>
    )
}

export default SmsAddTransactionForm
