import React, { useState, useContext } from 'react'
import { Form, Input, Button, Alert, Typography, InputNumber } from 'antd'
import { MoneyCollectOutlined, DollarOutlined, UserOutlined } from '@ant-design/icons'
import '../styles/DepositUserForm.scss'
import { createPassword, production } from '../services/userHelper'
import { GlobalContext } from '../app/GlobalState'

const { Item } = Form
const { Title } = Typography

const DepositUserForm = ({ payment }) => {
    const [form] = Form.useForm()
    const [formMessage, setFormMessage] = useState('')
    const [formError, setFormError] = useState('')
    const { depositForUser, state  } = useContext(GlobalContext)

    form.setFieldsValue(payment)

    const onFinish = (values) => {
        !production && (console.log("Input data accepted !!", values))
        setFormError('')
        setFormMessage('Input data accepted !!')

        // Update Values
        values.reference = createPassword(10, true, true, false)
        values.channel = "manual"
        values.date = new Date().toISOString()
        values.currency = "NGN"
        values.ipAddress = ""
        values.sendersEmail = state.user.token ? `${state.user.firstname.toLowerCase()}.${state.user.lastname.toLowerCase()}@${state.user.role}.com` : `${state.cbtUser.firstname.toLowerCase()}.${state.cbtUser.lastname.toLowerCase()}@${state.cbtUser.role}.com`
        values.recieversUsername = values.username
        values.customersFirstName = state.user.token ? state.user.firstname : state.cbtUser.firstname
        values.customersLastName = state.user.token ? state.user.lastname : state.cbtUser.lastname
        values.customersEmail = state.user.token ? `${state.user.firstname.toLowerCase()}.${state.user.lastname.toLowerCase()}@${state.user.role}.com` : `${state.cbtUser.firstname.toLowerCase()}.${state.cbtUser.lastname.toLowerCase()}@${state.cbtUser.role}.com`
        values.authCode = ""
        values.cardType = ""
        values.expiryMonth = ""
        values.expiryYear = ""
        values.last4 = ""
        values.bank = "Deposit Bank"
        values.accountName = "Manual Deposit"
        values.type = "credit"

        // Deposit
        depositForUser(values)
        form.resetFields()
    }

    const onFinishFailed = (errorInfo) => {
        !production && (console.log("Input data rejected !!", errorInfo))
        setFormMessage('')
        setFormError('Input data rejected, check fields for errors !!')
    }

    const validateMessages = {
        required: '${label} is required!',
        types: {
            number: 'This is not a valid number!'
        }
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
                <Form name="normal_login" form={ form } className="login-form" onFinishFailed={ onFinishFailed } initialValues={payment} validateMessages={ validateMessages } onFinish={ onFinish }>
                    <Title level={4} className="text">Deposit For A User</Title>
                    <Item className='form-item' label="Username" name="username" hasFeedback rules={[ { required: true } ]}>
                        <Input prefix={<UserOutlined />}  placeholder="Username" allowClear />
                    </Item>
                    <Item className='form-item' label="Amount" name="amount" hasFeedback rules={[ { type:'number', required: true } ]}>
                        <InputNumber prefix={<MoneyCollectOutlined />} placeholder="Enter Amount" />
                    </Item>
                    <Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Make Depoit <DollarOutlined />
                        </Button>
                    </Item>
                </Form>
            </div>
        </React.Fragment>
    )
}

export default DepositUserForm

