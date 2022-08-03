
import React, { useState, useEffect, useContext } from 'react'
import { Form, Input, Button, Select, Alert, InputNumber  } from 'antd'
import { SolutionOutlined, UserOutlined, BookOutlined, NumberOutlined, FieldNumberOutlined } from '@ant-design/icons'
import '../styles/EditScoreForm.scss'
import { GlobalContext } from '../app/GlobalState'
import { sessions, terms, subjects, cbtClasses } from '../services/userHelper'

const { Option } = Select
const { Item } = Form

const  EditScoreForm = ({ user }) => {
    const [form] = Form.useForm()
    const [formMessage, setFormMessage] = useState('')
    const [formError, setFormError] = useState('')
    const [firstCA, setFirstCA] = useState(user.firstCA)
    const [secondCA, setSecondCA] = useState(user.secondCA)
    const [exam, setExam] = useState(user.exam)
    const { editScore, state, production } = useContext(GlobalContext)

    useEffect(() => {
        const total = firstCA + secondCA + exam
        let comment = 'Fail'
        let grade = 'F'
        
        if (total > 79) {
            comment = 'Excellent'
            grade = 'A*'
        } else if (total >= 70 && total <= 79) {
            comment = 'Very Good'
            grade = 'A'
        } else if (total >= 60 && total <= 69) {
            comment = 'Good'
            grade = 'B'
        } else if (total >= 50 && total <= 59) {
            comment = 'Fairly Good'
            grade = 'C'
        } else if (total >= 45 && total <= 49) {
            comment = 'Pass'
            grade = 'D'
        } else if (total >= 40 && total <= 44) {
            comment = 'Weak'
            grade = 'E'
        }

        form.setFieldsValue({total, comment, grade})
    }, [exam, firstCA, secondCA, form])

    form.setFieldsValue({
        fullname: user.fullname,
        session: user.session,
        className: user.className,
        username: user.username,
        subject: user.subject,
        term: user.term,
        exam: user.exam,
        total: user.total,
        grade: user.grade,
        comment: user.comment,
        firstCA: user.firstCA,
        secondCA: user.secondCA
    })

    const onFinish = (values) => {
        !production && (console.log('Student Score data accepted !!', values))
        setFormError('')
        setFormMessage('Student Score data accepted !!')

        const data = {
            ...user,
            ...values
        }

        // Edit Score
        editScore(data, user.$key)
    }

    const onFinishFailed = (errorInfo) => {
        !production && (console.log('Student Score data rejected !!', errorInfo))
        setFormMessage('')
        setFormError('Student Score data rejected, check fields for errors !!')
    }

    const validateMessages = {
        required: '${label} is required!',
        types: {
            email: 'This is not a valid email!',
            number: 'This is not a valid number!',
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
            <Form name="basic" form={ form } validateMessages={ validateMessages } initialValues={{ remember: true }} onFinish={ onFinish } onFinishFailed={ onFinishFailed } autoComplete="off">
                <div className="form-controller">
                    <Item className='form-item' label="Full Name" hasFeedback name="fullname" rules={[ { required: true } ]}>
                        <Input prefix={<UserOutlined />} placeholder="Enter a Name" allowClear disabled />
                    </Item>
                    <Item className='form-item' label="Username" hasFeedback name="username" rules={[ { required: true } ]}>
                        <Input prefix={<UserOutlined />} placeholder="Enter a Username" allowClear disabled />
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' label="Session" hasFeedback name="session" rules={[ { required: true } ]}>
                        <Select placeholder="Select a Session"  allowClear>
                            {sessions.map(item => (
                                <Option key={item.value} value={item.value}>{item.name}</Option>
                            ))}
                        </Select>
                    </Item>
                    <Item className='form-item' hasFeedback label="Subject" name="subject" rules={[ { required: true } ]}>
                        <Select placeholder="Select a Subject"  allowClear>
                            {subjects.map(item => (
                                <Option key={item.value} value={item.value}>{item.name}</Option>
                            ))}
                        </Select>
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' hasFeedback name="className" label="Class" rules={[ { required: true } ]}>
                        <Select placeholder="Select a Class"  allowClear>
                            {cbtClasses.map(item => (
                                <Option key={item.value} value={item.value}>{item.name}</Option>
                            ))}
                        </Select>
                    </Item>
                    <Item className='form-item' hasFeedback name="term" label="Term" rules={[ { required: true } ]}>
                        <Select placeholder="Select a Term"  allowClear>
                            {terms.map(item => (
                                <Option key={item.value} value={item.value}>{item.name}</Option>
                            ))}
                        </Select>
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' label="1st CA" name="firstCA" hasFeedback rules={[ { type:'number', required: true } ]}>
                        <InputNumber onChange={(value) => setFirstCA(value)} prefix={<FieldNumberOutlined />} placeholder="Enter 1st CA Test Score" />
                    </Item>
                    <Item className='form-item' label="Total" name="total" hasFeedback rules={[ { type:'number', required: true } ]}>
                        <InputNumber prefix={<NumberOutlined />} placeholder="Enter Total Score" disabled />
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' label="2nd CA" name="secondCA" hasFeedback rules={[ { type:'number', required: true } ]}>
                        <InputNumber onChange={(value) => setSecondCA(value)} prefix={<FieldNumberOutlined />} placeholder="Enter 2nd CA Test Score" />
                    </Item>
                    <Item className='form-item' hasFeedback label="Grade" name="grade" rules={[ { required: true } ]}>
                        <Input prefix={<SolutionOutlined />} placeholder="Enter a Grade" allowClear disabled />
                    </Item>
                </div>
                <div className="form-controller">
                    <Item className='form-item' label="Exam" name="exam" hasFeedback rules={[ { type:'number', required: true } ]}>
                        <InputNumber onChange={(value) => setExam(value)} prefix={<FieldNumberOutlined />} placeholder="Enter Exam Score" />
                    </Item>
                    <Item className='form-item' hasFeedback label="Comment" name="comment" rules={[ { required: true } ]}>
                        <Input prefix={<BookOutlined />} placeholder="Enter a Comment" allowClear disabled />
                    </Item>
                </div>
                <div className="button-controller">
                    <Item>
                        <Button className="submit-button" type="primary" htmlType="submit">
                            Update
                        </Button>
                    </Item>
                </div>
            </Form>
        </div>
    )
}

export default EditScoreForm
