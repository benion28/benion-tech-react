import React, { useState, useContext } from 'react'
import { Form, Input, Button, Alert, Typography, Select } from 'antd'
import { GlobalOutlined, BookOutlined, BulbOutlined, SolutionOutlined } from '@ant-design/icons'
import '../styles/PostForm.scss'
import { production } from '../services/userHelper'
import { GlobalContext } from '../app/GlobalState'

const { Item } = Form
const { TextArea } = Input
const { Option } = Select
const { Title } = Typography

const AddPostForm = () => {
    const [form] = Form.useForm()
    const [formMessage, setFormMessage] = useState('')
    const [formError, setFormError] = useState('')
    const { addPost, state  } = useContext(GlobalContext)

    const onFinish = (values) => {
        !production && (console.log("Input data accepted !!", values))
        setFormError('')
        setFormMessage('Input data accepted !!')

        addPost(values)
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
                    <Title level={4} className="text">ADD POST</Title>
                    <Item className='form-item' label="Title" name="title" hasFeedback rules={[ { required: true } ]}>
                        <Input prefix={<BookOutlined />}  placeholder="Post Title" allowClear />
                    </Item>
                    <Item label="Content" name="content" rules={[ { required: true } ]} hasFeedback>
                        <TextArea prefix={<SolutionOutlined className="site-form-item-icon" />} placeholder="Post Content" allowClear />
                    </Item>
                    <Item className='form-item' label="Image" name="image" hasFeedback>
                        <Input prefix={<GlobalOutlined />}  placeholder="Add an Image Link" allowClear />
                    </Item>
                    <Item className='form-item' name="category" label="Category" rules={[ { required: true } ]}>
                        <Select placeholder="Select a Category"  allowClear>
                            <Option value="news">News</Option>
                            <Option value="blog">Blog</Option>
                            <Option value="others">Others</Option>
                        </Select>
                    </Item>
                    <Item className='form-item' name="tag" label="Tag" rules={[ { required: true } ]}>
                        <Select placeholder="Select a Tag"  allowClear>
                            <Option value="technology">Technology</Option>
                            <Option value="sport">Sport</Option>
                            <Option value="entertainment">Entertainment</Option>
                            <Option value="politics">Politics</Option>
                            <Option value="programming">Programming</Option>
                            <Option value="others">Others</Option>
                        </Select>
                    </Item>
                    <Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Save <BulbOutlined />
                        </Button>
                    </Item>
                </Form>
            </div>
        </React.Fragment>
    )
}

export default AddPostForm
