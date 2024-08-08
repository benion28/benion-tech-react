import React, { useState, useContext } from 'react'
import { Form, Input, Button, Checkbox, Alert, InputNumber } from 'antd'
import { MailOutlined, SolutionOutlined } from '@ant-design/icons'
import { GlobalContext } from '../app/GlobalState'
import '../styles/AddUserForm.scss'
import { production } from '../services/userHelper'

const { Item } = Form

const SmsAddHostelForm = ({ hostel }) => {
    const { state, addHostel } = useContext(GlobalContext)
    const [form] = Form.useForm()
    const [formMessage, setFormMessage] = useState('')
    const [formError, setFormError] = useState('')

    form.setFieldsValue(hostel)

    const onFinish = (values) => {
        values.number_of_bed = String(values.number_of_bed)
        values.cost_per_bed = String(values.cost_per_bed)

        !production && (console.log('Add Hostel data success !!', values))
        setFormError('')
        setFormMessage('Add Hostel data success !!')

        // Add Hostel

        if (hostel.id) {
            values.id = hostel.id
            addHostel(values)
        } else {
            addHostel(values)
        }

        form.resetFields()
    }

    const onFinishFailed = (errorInfo) => {
        !production && (console.log('Add Hostel data failed !!', errorInfo))
        setFormMessage('')
        setFormError('Add Hostel data failed, check fields for errors !!')
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
            <Form name="basic" form={form} validateMessages={validateMessages} initialValues={hostel} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
                <div className="form-controller">
                    <Item className='form-item' label="Hostel Name" name="hostel_name" rules={[{ required: true }]}>
                        <Input prefix={<SolutionOutlined />} placeholder="Hostel Name" allowClear />
                    </Item>
                    <Item className='form-item' label="Room No" name="room_number" rules={[{ required: true }]}>
                        <Input prefix={<SolutionOutlined />} placeholder="Room No" allowClear />
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' label="Client Email" name="client_email" rules={[{ type: 'email', required: true }]}>
                        <Input prefix={<MailOutlined />} placeholder="Client Email Address" allowClear />
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' label="Room Type" name="room_type" rules={[{ required: true }]}>
                        <Input prefix={<SolutionOutlined />} placeholder="Room Type" allowClear />
                    </Item>
                    <Item className='form-item' label="No of Bed" name="number_of_bed" rules={[{ type: 'number', required: true }]}>
                        <InputNumber placeholder="No of Bed" allowClear />
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' label="Cost of Bed" name="cost_per_bed" rules={[{ type: 'number', required: true }]}>
                        <InputNumber placeholder="Cost of Bed" allowClear />
                    </Item>
                </div>
                <div className="form-controller">
                    <Item label="Agree" name="agree" valuePropName="checked" rules={[{ required: true }]}>
                        <Checkbox>I intentionally wish to add a hostel</Checkbox>
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

export default SmsAddHostelForm

