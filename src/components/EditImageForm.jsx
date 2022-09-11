import React, { useState, useContext } from 'react'
import { Form, Input, Button, Alert, Typography, Select } from 'antd'
import { GlobalOutlined, BookOutlined, BulbOutlined } from '@ant-design/icons'
import '../styles/ImageGallaryForm.scss'
import { production } from '../services/userHelper'
import { GlobalContext } from '../app/GlobalState'

const { Item } = Form
const { Option } = Select
const { Title } = Typography

const EditImageForm = ({ image }) => {
    const [form] = Form.useForm()
    const [formMessage, setFormMessage] = useState('')
    const [formError, setFormError] = useState('')
    const { state, updateImage  } = useContext(GlobalContext)

    form.setFieldsValue({
        caption: image.caption,
        link: image.link,
        image: image.image,
        category: image.category,
        tag: image.tag
    })

    const onFinish = (values) => {
        !production && (console.log("Input data accepted !!", values))
        setFormError('')
        setFormMessage('Input data accepted !!')

        const data = {
            ...image,
            ...values
        }

        updateImage(data)
    }

    const onFinishFailed = (errorInfo) => {
        !production && (console.log("Input data rejected !!", errorInfo))
        setFormMessage('')
        setFormError('Input data rejected, check fields for errors !!')
    }

    const validateMessages = {
        required: '${label} is required!'
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
                    <Title level={4} className="text">UPDATE IMAGE</Title>
                    <div className="image">
                        <img src={ image.image } alt="Display Target" />
                        <p>{ image.caption }</p>
                    </div>
                    <Item className='form-item' label="Title" name="caption" hasFeedback rules={[ { required: true } ]}>
                        <Input prefix={<BookOutlined />}  placeholder="Image Title" allowClear />
                    </Item>
                    <Item className='form-item' label="Link" name="link" hasFeedback>
                        <Input prefix={<GlobalOutlined />}  placeholder="Add a Web Link" allowClear />
                    </Item>
                    <Item className='form-item' name="category" label="Category" rules={[ { required: true } ]}>
                        <Select placeholder="Select a Category"  allowClear>
                            <Option value="Work">Work</Option>
                            <Option value="others">Others</Option>
                        </Select>
                    </Item>
                    <Item className='form-item' name="tag" label="Tag" rules={[ { required: true } ]}>
                        <Select placeholder="Select a Tag"  allowClear>
                            <Option value="angular">Angular</Option>
                            <Option value="react">React</Option>
                            <Option value="vanilla">Vanilla</Option>
                            <Option value="python">Python</Option>
                            <Option value="express">Express</Option>
                            <Option value="others">Others</Option>
                        </Select>
                    </Item>
                    <Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Update <BulbOutlined />
                        </Button>
                    </Item>
                </Form>
            </div>
        </React.Fragment>
    )
}

export default EditImageForm
