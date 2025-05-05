import React, { useState, useContext } from 'react'
import { Form, Input, Button, Checkbox, Select, Alert } from 'antd'
import { SolutionOutlined } from '@ant-design/icons'
import { GlobalContext } from '../app/GlobalState'
import '../styles/AddUserForm.scss'
import { production } from '../services/userHelper'

const { Option } = Select;
const { Item } = Form;

const StateLgaForm = ({ item }) => {
    const { state, addStateLga } = useContext(GlobalContext)
    const [form] = Form.useForm()
    const [formMessage, setFormMessage] = useState('')
    const [formError, setFormError] = useState('')

    form.setFieldsValue(item)

    const onFinish = (values) => {
        !production && (console.log('Add Item data success !!', values))
        setFormError('')
        setFormMessage('Add Item data success !!')

        values = {
            ...item,
            ...values
        };

        if (item.$key) {
            values.key = item.$key
        }

        addStateLga(values)

        form.resetFields()
    }

    const onFinishFailed = (errorInfo) => {
        !production && (console.log('Add Item data failed !!', errorInfo))
        setFormMessage('')
        setFormError('Add Item data failed, check fields for errors !!')
    }

    const validateMessages = {
        required: '${label} is required!'
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
            <Form name="basic" form={form} validateMessages={validateMessages} initialValues={item} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
                <div className="form-controller">
                    <Item className='form-item' label="Name" name="name" rules={[{ required: true }]}>
                        <Input prefix={<SolutionOutlined />} placeholder="State Name" allowClear />
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' label="Country" name="countryName" rules={[{ required: true }]}>
                        <Input prefix={<SolutionOutlined />} placeholder="Country Name" allowClear />
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' name="stateName" label="State" rules={[{ required: true }]}>
                        <Select  style={{ width: 150 }} placeholder="Select a State" allowClear>
                            {state.countryStates[3].map(item => (
                                <Option key={item.key} value={item.name}>{item.name}</Option>
                            ))}
                        </Select>
                    </Item>
                </div>
                <div className="form-controller">
                    <Item label="Agree" name="agree" valuePropName="checked" rules={[{ required: true }]}>
                        <Checkbox>I intentionally wish to add an item</Checkbox>
                    </Item>
                </div>
                <div className="button-controller">
                    <Item>
                        <Button className="submit-button" type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Item>
                    <Item>
                        <Button className="reset-button" type="danger" onClick={onReset}>
                            Reset
                        </Button>
                    </Item>
                </div>
            </Form>
        </div>
    )
}

export default StateLgaForm

