import React, { useState, useContext } from 'react'
import { Form, Input, Button, Alert } from 'antd'
import { UserOutlined, MailOutlined, SolutionOutlined } from '@ant-design/icons'
import '../styles/ContactForm.scss'
import { production } from '../services/userHelper'
import { GlobalContext } from '../app/GlobalState'

const { Item } = Form
const { TextArea } = Input

const ContactForm = () => {
    const { state, userContact } = useContext(GlobalContext)
    const [form] = Form.useForm()
    const [formMessage, setFormMessage] = useState('')
    const [formError, setFormError] = useState('')

    const onFinish = (values) => {
        !production && (console.log("Message data accepted !!", values))
        setFormError('')
        setFormMessage('Message data accepted !!')

        // User Contact
        values.title = "Benion-Tech"
        userContact(values)
        form.resetFields()
    }

    const onFinishFailed = (errorInfo) => {
        !production && (console.log("Message data rejected !!", errorInfo))
        setFormMessage('')
        setFormError('Message data rejected, check fields for errors !!')
    };

    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: 'This is not a valid email!'
        }
    }

    return (
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
            <Form name="normal_login" form={ form } className="contact-form" onFinishFailed={ onFinishFailed } validateMessages={ validateMessages } initialValues={{ remember: true }} onFinish={ onFinish }>
                <Alert className="information-alert" message="Informational Notes  !!!" description="Send us email about complaints and recommendations, directly to our inbox" type="info" showIcon />
                <Item label="Full Name" name="fullname" rules={[ { required: true } ]}>
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Your Full Name" allowClear />
                </Item>
                <Item label="Email" name="email" rules={[ { type:'email', required: true } ]}>
                    <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Your Email Address" allowClear />
                </Item>
                <Item label="Message" name="message" rules={[ { required: true } ]} hasFeedback>
                    <TextArea prefix={<SolutionOutlined className="site-form-item-icon" />} placeholder="Your Message" allowClear />
                </Item>
                <Item>
                    <Button type="primary" htmlType="submit" className="contact-form-button">
                        Send Message
                    </Button>
                </Item>
            </Form>
        </div>
    )
}

export default ContactForm

