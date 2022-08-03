import React, { useState, useContext } from 'react'
import { Form, Input, Button, Alert, Typography, Upload, Select } from 'antd'
import { GlobalOutlined, BookOutlined, BulbOutlined, InboxOutlined, UploadOutlined } from '@ant-design/icons'
import '../styles/ImageGallaryForm.scss'
import { production } from '../services/userHelper'
import { GlobalContext } from '../app/GlobalState'

const { Item } = Form
const { Option } = Select
const { Title } = Typography
const { Dragger } = Upload

const ImageGallaryForm = () => {
    const [form] = Form.useForm()
    const [formMessage, setFormMessage] = useState('')
    const [formError, setFormError] = useState('')
    const { activateUser, state  } = useContext(GlobalContext)

    const onFinish = (values) => {
        !production && (console.log("Input data accepted !!", values))
        setFormError('')
        setFormMessage('Input data accepted !!')

        // Activate User
        activateUser(values)
        form.resetFields()
    }

    const onFinishFailed = (errorInfo) => {
        !production && (console.log("Input data rejected !!", errorInfo))
        setFormMessage('')
        setFormError('Input data rejected, check fields for errors !!')
    }

    const validateMessages = {
        required: '${label} is required!'
    }

    const normFile = (uploadEvent) => {
        console.log("Upload Event", uploadEvent)

        if (Array.isArray(uploadEvent)) {
            return uploadEvent
        }

        return uploadEvent?.fileList
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
                    <Title level={4} className="text">UPLOAD IMAGE</Title>
                    <Item label="Dragger">
                        <Item name="dragger" valuePropName="fileList" getValueFromEvent={normFile} noStyle hasFeedback>
                            <Dragger accept="image/*" name="files" action="/upload.do">
                                <p className="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p className="ant-upload-text">Click or drag to this area to upload.</p>
                                <p className="ant-upload-hint">Support for single or bulk upload.</p>
                            </Dragger>
                        </Item>
                    </Item>
                    <Item label="Upload" name="upload" valuePropName="fileList" getValueFromEvent={normFile} hasFeedback>
                        <Upload name="upload" accept="image/*" action="/upload.do" listType="picture" allowClear>
                            <Button icon={<UploadOutlined />}>Click to upload an image</Button>
                        </Upload>
                    </Item>
                    <Item className='form-item' label="Title" name="title" hasFeedback rules={[ { required: true } ]}>
                        <Input prefix={<BookOutlined />}  placeholder="Image Title" allowClear />
                    </Item>
                    <Item className='form-item' label="Link" name="link" hasFeedback>
                        <Input prefix={<GlobalOutlined />}  placeholder="Add a Web Link" allowClear />
                    </Item>
                    <Item className='form-item' name="category" label="Category" rules={[ { required: true } ]}>
                        <Select placeholder="Select a Category"  allowClear>
                            <Option value="work">Work</Option>
                            <Option value="others">Others</Option>
                        </Select>
                    </Item>
                    <Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Submit <BulbOutlined />
                        </Button>
                    </Item>
                </Form>
            </div>
        </React.Fragment>
    )
}

export default ImageGallaryForm
