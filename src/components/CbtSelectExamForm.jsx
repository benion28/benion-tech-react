import React, { useState, useContext } from 'react'
import { Form, Button, Select, Alert } from 'antd'
import { BookOutlined  } from '@ant-design/icons'
import '../styles/CbtSelectExamForm.scss'
import { production, getCategoryName, cbtCategories, getTermName, terms, getSubjectName, subjects, getClassName, cbtClasses } from '../services/userHelper'
import { GlobalContext } from '../app/GlobalState'

const { Item } = Form
const { Option } = Select

const CbtSelectExamForm = () => {
    const [form] = Form.useForm()
    const [formMessage, setFormMessage] = useState('')
    const [formError, setFormError] = useState('')
    const { state, examCategory  } = useContext(GlobalContext)

    const formInitials = {
        examTerm: state.cbtExamTerm,
        examCategory: state.tempCategory,
        examSubject: state.cbtExamSubject,
        examClass: state.tempClassName
    }

    form.setFieldsValue(formInitials)

    const onFinish = (values) => {
        !production && (console.log("Select Exam data accepted !!", values))
        setFormError('')
        setFormMessage('Select Exam data accepted !!')
        examCategory(values)
    }

    const onFinishFailed = (errorInfo) => {
        !production && (console.log("Select Exam data rejected !!", errorInfo))
        setFormMessage('')
        setFormError('Select Exam data rejected, check fields for errors !!')
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
                <Form name="normal_login" form={ form } className="login-form" onFinishFailed={ onFinishFailed } validateMessages={ validateMessages } initialValues={formInitials} onFinish={ onFinish }>
                    <Alert className="information-alert" message="Exam Instructions" description={`${state.tempCbtFirstname.toUpperCase()} ${state.tempCbtLastname.toUpperCase()}, you are required to answer ${state.totalQuestions} questions in ${state.examTimeLimit} minutes. Select the term, class, subject and category respectively . Make sure you submit on completion of all the questions`} type="info" showIcon />
                    <Item className='form-item' name="examTerm" rules={[ { required: true } ]}>
                        <Select placeholder="Select an Exam Term" allowClear>
                            {state.cbtLoggedIn && (
                                <Option value={state.cbtExamTerm}>{getTermName(state.cbtExamTerm)} - Current</Option>
                            )}
                            {(state.tempCbtRole !== 'student' && state.cbtLoggedIn) && terms.filter(item => item.value !== state.cbtExamTerm).map(item => (
                                <Option key={item.value} value={item.value}>{item.name}</Option>
                            ))}
                        </Select>
                    </Item>
                    <Item className='form-item' name="examClass" rules={[ { required: true } ]}>
                        <Select placeholder="Select an Exam Class" allowClear>
                            {state.cbtLoggedIn && (
                                <Option value={state.tempClassName}>{getClassName(state.tempClassName)}  - Current</Option>
                            )}  
                            {(state.tempCbtRole !== 'student' && state.cbtLoggedIn) && cbtClasses.filter(item => item.value !== state.tempClassName).map(item => (
                                <Option key={item.value} value={item.value}>{item.name}</Option>
                            ))}
                        </Select>
                    </Item>
                    <Item className='form-item' name="examSubject" rules={[ { required: true } ]}>
                        <Select placeholder="Select an Exam Subject" allowClear>
                            {state.cbtLoggedIn && (
                                <Option value={state.cbtExamSubject}>{getSubjectName(state.cbtExamSubject)}  - Current</Option>
                            )}         
                            {(state.tempCbtRole !== 'student' && state.cbtLoggedIn) && subjects.filter(item => item.value !== state.cbtExamSubject).map(item => (
                                <Option key={item.value} value={item.value}>{item.name}</Option>
                            ))}
                        </Select>
                    </Item>
                    <Item className='form-item' name="examCategory" rules={[ { required: true } ]}>
                        <Select placeholder="Select an Exam Category" allowClear>
                            {state.cbtLoggedIn && (
                                <Option value={state.tempCategory}>{getCategoryName(state.tempCategory)} - Selected</Option>
                            )}
                            {(state.tempCbtRole !== 'student' && state.cbtLoggedIn) && cbtCategories.filter(item => item.value !== state.tempCategory).map(item => (
                                <Option key={item.value} value={item.value}>{item.name}</Option>
                            ))}
                            {(state.cbtLoggedIn && ((state.advanceExam && state.tempClassName[0] === 'j') || state.tempCbtRole !== 'student')) && (
                                <Option value="jse">JSE</Option>
                            )}
                            {(state.cbtLoggedIn && ((state.advanceExam && state.tempClassName[0] === 's') || state.tempCbtRole !== 'student')) && (
                                <Option value="sse">SSE</Option>
                            )}
                        </Select>
                    </Item>
                    <Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Start Exams <BookOutlined />
                        </Button>
                    </Item>
                </Form>
            </div>
        </React.Fragment>
    )
}

export default CbtSelectExamForm
