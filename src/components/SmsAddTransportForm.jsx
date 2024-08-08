import React, { useState, useContext } from 'react'
import { Form, Input, Button, Checkbox, Select, DatePicker, Alert } from 'antd'
import { MailOutlined, PhoneOutlined, SolutionOutlined } from '@ant-design/icons'
import { GlobalContext } from '../app/GlobalState'
import '../styles/AddUserForm.scss'
import { production, paymentStatus, expenseType } from '../services/userHelper'

const { Option } = Select
const { Item } = Form

const SmsAddTransportForm = ({ transport }) => {
    const { state, addTransport } = useContext(GlobalContext)
    const [form] = Form.useForm()
    const [formMessage, setFormMessage] = useState('')
    const [formError, setFormError] = useState('')

    form.setFieldsValue(transport)

    const onFinish = (values) => {
        !production && (console.log('Add Transport data success !!', values))
        setFormError('')
        setFormMessage('Add Transport data success !!')

        // Add Transport

        if (transport.id) {
            values.id = transport.id
            addTransport(values)
        } else {
            addTransport(values)
        }

        form.resetFields()
    }

    const onFinishFailed = (errorInfo) => {
        !production && (console.log('Add Transport data failed !!', errorInfo))
        setFormMessage('')
        setFormError('Add Transport data failed, check fields for errors !!')
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
            <Form name="basic" form={form} validateMessages={validateMessages} initialValues={transport} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
                <div className="form-controller">
                    <Item className='form-item' label="Route Name" name="route_name" rules={[{ required: true }]}>
                        <Input prefix={<SolutionOutlined />} placeholder="Route Name" allowClear />
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' label="Vehicle No" name="vehicle_number" rules={[{ required: true }]}>
                        <Input prefix={<SolutionOutlined />} placeholder="Vehicle No" allowClear />
                    </Item>
                    <Item className='form-item' label="License No" name="license_number" rules={[{ required: true }]}>
                        <Input prefix={<SolutionOutlined />} placeholder="License No" allowClear />
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' label="Client Email" name="client_email" rules={[{ type: 'email', required: true }]}>
                        <Input prefix={<MailOutlined />} placeholder="Client Email Address" allowClear />
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' label="Driver Name" name="driver_name" rules={[{ required: true }]}>
                        <Input prefix={<SolutionOutlined />} placeholder="Driver Name" allowClear />
                    </Item>
                    <Item className='form-item' label="Driver Phone" name="phone_number" hasFeedback rules={[{ required: true, min: 8, max: 11 }]}>
                        <Input prefix={<PhoneOutlined />} placeholder="Driver Phone" allowClear />
                    </Item>
                </div>
                <div className="form-controller">
                    <Item label="Agree" name="agree" valuePropName="checked" rules={[{ required: true }]}>
                        <Checkbox>I intentionally wish to add a transport</Checkbox>
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

export default SmsAddTransportForm

