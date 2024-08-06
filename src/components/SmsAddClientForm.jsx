import React, { useState, useContext, useEffect } from 'react'
import { Form, Input, Button, Checkbox, Select, Alert, message, Upload } from 'antd'
import { PhoneOutlined, MailOutlined, SolutionOutlined, UploadOutlined } from '@ant-design/icons'
import { GlobalContext } from '../app/GlobalState'
import '../styles/AddUserForm.scss'
import { production, planType, paymentStatus } from '../services/userHelper'

const { Option } = Select
const { Item } = Form

const SmsAddClientForm = ({ client }) => {
    const { state, addClient } = useContext(GlobalContext)
    const [form] = Form.useForm()
    const [clients, setClients] = useState([])
    const [fileList, setFileList] = useState(null)
    const [formMessage, setFormMessage] = useState('')
    const [formError, setFormError] = useState('')

    form.setFieldsValue(client)

    useEffect(() => {
        const fetchedClients = state.smsUsers.filter(user => user.roles[0].name === "MODR")
        if (fetchedClients.length > 0) {
            setClients(fetchedClients)
        }
    }, [state.smsUsers])

    const onFinish = (values) => {
        !production && (console.log('Add Client data success !!', values))
        setFormError('')
        setFormMessage('Add Client data success !!')

        // Add Client

        if (client.id) {
            values.id = client.id
            addClient(values)
        } else {
            addClient(values)
        }

        form.resetFields()
    }

    const onFinishFailed = (errorInfo) => {
        !production && (console.log('Add Client data failed !!', errorInfo))
        setFormMessage('')
        setFormError('Add Client data failed, check fields for errors !!')
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
        if (clients.length > 0) {
            const fetchedClientList = clients.filter(client => (client.email === value))
            if (fetchedClientList.length > 0) {
                const fetchedClient = fetchedClientList[0]
                form.setFieldsValue({
                    phone: fetchedClient.phone,
                    email: value
                })
            }
        }
    }

    const normFile = (info) => {
        if (info.file.status !== 'uploading') {
            message.success(`${info.fileList[0].name} uploading`)
            !production && (console.log("Info File", info.fileList))
            console.log("Info File", info.fileList)
        }
        if (info.file.status !== 'done') {
            message.success(`${info.file.name} uploaded successfully`)
            setFileList(info.file)
            !production && (console.log("File Upload Info", info))
        } else if (info.file.status !== 'error') {
            message.error(`${info.file.name} upload failed`)
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
            <Form name="basic" form={form} validateMessages={validateMessages} initialValues={client} onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off">
                <div className="form-controller">
                    <Item className='form-item' hasFeedback label="Client Email" name="email" rules={[{ required: true }]}>
                        <Select style={{ width: 300 }} prefix={<MailOutlined />} showSearch onChange={(value) => handleEmailInputChange(value)} optionFilterProp="children" placeholder="Select a Client Email" allowClear>
                            {clients?.map(item => (
                                <Option key={item.id} value={item.email}>{item.email}</Option>
                            ))}
                        </Select>
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' label="Name" name="name" rules={[{ required: true }]}>
                        <Input prefix={<SolutionOutlined />} placeholder="Name" allowClear />
                    </Item>
                    <Item className='form-item' label="Phone" name="phone" hasFeedback rules={[{ required: true, min: 8, max: 11 }]}>
                        <Input prefix={<PhoneOutlined />} placeholder="Phone" allowClear disabled />
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' name="plan_type" label="Plan Type" rules={[{ required: true }]}>
                        <Select style={{ width: 120 }} placeholder="Select a Plan Type" allowClear>
                            {planType.map(item => (
                                <Option key={item.value} value={item.value}>{item.name}</Option>
                            ))}
                        </Select>
                    </Item>
                    <Item className='form-item' name="plan_status" label="Payment Status" rules={[{ required: true }]}>
                        <Select style={{ width: 120 }} placeholder="Select a Payment Status" allowClear>
                            {paymentStatus.map(item => (
                                <Option key={item.value} value={item.value}>{item.name}</Option>
                            ))}
                        </Select>
                    </Item>
                </div>
                <div className="form-controller">
                    <Upload className='form-item' name="image_url" accept="image/*" action="/upload.do" listType="picture" onChange={(info) => normFile(info)} allowClear>
                        <Button icon={<UploadOutlined />}>Click to upload an image</Button>
                    </Upload>
                </div>
                <div className="form-controller">
                    <Item label="Agree" name="agree" valuePropName="checked" rules={[{ required: true }]}>
                        <Checkbox>I intentionally wish to add a client</Checkbox>
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

export default SmsAddClientForm

