
import React, { useState, useContext } from 'react'
import { Form, Input, Button, Select, Alert  } from 'antd'
import { SolutionOutlined } from '@ant-design/icons'
import '../styles/AddQuestionForm.scss'
import { GlobalContext } from '../app/GlobalState'
import { cbtCategories, cbtClasses, terms, subjects, createPassword } from '../services/userHelper'

const { Option } = Select
const { Item } = Form
const { TextArea } = Input

const AddQuestionForm = () => {
    const [form] = Form.useForm()
    const [formMessage, setFormMessage] = useState('')
    const [formError, setFormError] = useState('')
    const { addQuestion, state, production } = useContext(GlobalContext)

    const onFinish = (values) => {
        !production && (console.log('Cbt Registeration data accepted !!', values))
        setFormError('')
        setFormMessage('Cbt Registeration data accepted !!')

        const object = {
            ...values,
            creator: state.cbtUser.accessCode
        }

        // Add Exam Question
        addQuestion(object)

        // form.resetFields()
    }

    const onFinishFailed = (errorInfo) => {
        !production && (console.log('Cbt Registeration data rejected !!', errorInfo))
        setFormMessage('')
        setFormError('Cbt Registeration data rejected, check fields for errors !!')
    }

    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: 'This is not a valid email!',
            number: 'This is not a valid number!',
        }
    }

    const onReset = () => {
        form.resetFields();
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
            <Form name="basic" form={ form } validateMessages={ validateMessages } initialValues={{ remember: true }} onFinish={ onFinish } onFinishFailed={ onFinishFailed } autoComplete="off">
                <div className="form-controller">
                    <Item className='form-item' label="Question" name="question" rules={[ { required: true } ]} hasFeedback>
                        <TextArea prefix={<SolutionOutlined className="site-form-item-icon" />} placeholder="Input Question" allowClear />
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' label="Option A" name="optionA" rules={[ { required: true } ]}>
                        <Input prefix={<SolutionOutlined />} placeholder="Option A" allowClear />
                    </Item>
                    <Item className='form-item' label="Option B" name="optionB" rules={[ { required: true } ]}>
                        <Input prefix={<SolutionOutlined />} placeholder="Option B" allowClear />
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' label="Option C" name="optionC" rules={[ { required: true } ]}>
                        <Input prefix={<SolutionOutlined />} placeholder="Option C" allowClear />
                    </Item>
                    <Item className='form-item' label="Option D" name="optionD" rules={[ { required: true } ]}>
                        <Input prefix={<SolutionOutlined />} placeholder="Option D" allowClear />
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' label="Answer" name="answer" rules={[ { required: true } ]}>
                        <Input prefix={<SolutionOutlined />} placeholder="Answer" allowClear />
                    </Item>
                    <Item className='form-item' name="term" label="Term" rules={[ { required: true } ]}>
                        <Select placeholder="Select a Term"  allowClear>
                            {terms.map(item => (
                                <Option key={item.value} value={item.value}>{item.name}</Option>
                            ))}
                        </Select>
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' name="category" label="Category" rules={[ { required: true } ]}>
                        <Select placeholder="Select a Category"  allowClear>
                            {cbtCategories.map(item => (
                                <Option key={item.value} value={item.value}>{item.name}</Option>
                            ))}
                        </Select>
                    </Item>
                    <Item className='form-item' name="className" label="Class" rules={[ { required: true } ]}>
                        <Select placeholder="Select a Class"  allowClear>
                            {cbtClasses.map(item => (
                                <Option key={item.value} value={item.value}>{item.name}</Option>
                            ))}
                        </Select>
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' name="subject" label="Subject" rules={[ { required: true } ]}>
                        <Select placeholder="Select a Subject"  allowClear>
                            {subjects.map(item => (
                                <Option key={item.value} value={item.value}>{item.name}</Option>
                            ))}
                        </Select>
                    </Item>
                </div>
                <div className="button-controller">
                    <Item>
                        <Button className="submit-button" type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Item>
                    <Item>
                        <Button className="reset-button" type="danger" onClick={ onReset }>
                            Reset
                        </Button>
                    </Item>
                </div>
            </Form>
        </div>
    )
}

export default AddQuestionForm
