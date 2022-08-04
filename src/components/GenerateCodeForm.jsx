import React, { useState, useContext } from 'react'
import { Form, Checkbox, Button, Alert, Typography, InputNumber } from 'antd'
import { FieldNumberOutlined } from '@ant-design/icons'
import '../styles/GenerateCodeForm.scss'
import { production, createPassword } from '../services/userHelper'
import { GlobalContext } from '../app/GlobalState'

const { Item } = Form
const { Title } = Typography

const GenerateCodeForm = () => {
    const [form] = Form.useForm()
    const [formMessage, setFormMessage] = useState('')
    const [password, setPassword] = useState('')
    const [formError, setFormError] = useState('')
    const { state  } = useContext(GlobalContext)

    const onFinish = (values) => {
        !production && (console.log("Input data accepted !!", values))
        setFormError('')
        setFormMessage('Input data accepted !!')

        // Generate Code
        const { amount, number, alphabet, symbol } = values
        const text = createPassword(amount, alphabet, number, symbol)
        !production && (console.log("Password Text !!", text))
        setPassword(text)
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

    const onReset = () => {
        setPassword('')
        form.resetFields()
    }

    const onCopy = () => {
        console.log("Copied to clipboard")
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
                <Form name="normal_login" form={ form } className="login-form" onFinishFailed={ onFinishFailed } initialValues={{ remember: true }} validateMessages={ validateMessages } onFinish={ onFinish }>
                    <Title level={4} className="text">Generate Code</Title>
                    <div className="form-controller">
                        <Item className='form-item' label="Amount" name="amount" hasFeedback rules={[ { type:'number', required: true, min: 4, max: 20 } ]}>
                            <InputNumber prefix={<FieldNumberOutlined />} placeholder="Enter Amount" />
                        </Item>
                        <Item className='form-item' label="Alphabets" name="alphabet" valuePropName='checked'>
                            <Checkbox />
                        </Item>
                    </div>
                    <div className="form-controller">
                        <Item className='form-item' label="Numbers" name="number" valuePropName='checked'>
                            <Checkbox />
                        </Item>
                        <Item className='form-item' label="Symbols" name="symbol" valuePropName='checked'>
                            <Checkbox />
                        </Item>
                    </div>
                    {password !== '' && (
                        <div className="password">
                            <span className="text">{password}</span>
                        </div>
                    )}
                    <div className="generate-button-controller">
                        <Item>
                            <Button className="copy-button" type="primary" onClick={ onCopy }>
                                Copy
                            </Button>
                            <Button className="reset-button" type="danger" onClick={ onReset }>
                                Reset
                            </Button>
                            <Button type="primary" htmlType="submit" className="submit-button">
                                Generate
                            </Button>
                        </Item>
                    </div>
                </Form>
            </div>
        </React.Fragment>
    )
}

export default GenerateCodeForm

