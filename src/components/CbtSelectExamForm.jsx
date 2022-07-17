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
    const tempCategory = state.cbtUser.className[0] === 'j' ? state.juniorExamCategory : state.seniorExamCategory
    const tempClassName = state.cbtUser.className === 'graduated' ? 'sss-3' : state.cbtUser.className

    const formInitials = {
        examTerm: state.cbtExamTerm,
        examCategory: tempCategory,
        examSubject: state.cbtExamSubject,
        examClass: tempClassName
    }

    form.setFieldsValue(formInitials)

    const onFinish = async (values) => {
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
                    <Alert className="information-alert" message="Exam Instructions" description={`You are required to answer ${state.totalQuestions} questions in ${state.examTimeLimit} minutes. Make sure you submit on completion of all the questions`} type="info" showIcon />
                    <Item className='form-item' name="examTerm" rules={[ { required: true } ]}>
                        <Select placeholder="Select an Exam Term" allowClear>
                            {state.cbtLoggedIn && (
                                <Option value={state.cbtExamTerm}>{getTermName(state.cbtExamTerm)} - Current</Option>
                            )}
                            {(state.cbtUser.role !== 'student' && state.cbtLoggedIn) && terms.filter(item => item.value !== state.cbtExamTerm).map(item => (
                                <Option key={item.value} value={item.value}>{item.name}</Option>
                            ))}
                        </Select>
                    </Item>
                    <Item className='form-item' name="examClass" rules={[ { required: true } ]}>
                        <Select placeholder="Select an Exam Class" allowClear>
                            {(state.cbtLoggedIn && state.cbtUser.role === 'student') && (
                                <Option value={state.cbtUser.className}>{getClassName(state.cbtUser.className)}  - Current</Option>
                            )}    
                            {(state.cbtLoggedIn && state.cbtUser.role !== 'student' && state.cbtUser.className === 'graduated') && (
                                <Option value={tempClassName}>{getClassName(tempClassName)}  - Current</Option>
                            )}  
                            {(state.cbtUser.role !== 'student' && state.cbtLoggedIn) && cbtClasses.filter(item => item.value !== tempClassName).map(item => (
                                <Option key={item.value} value={item.value}>{item.name}</Option>
                            ))}
                        </Select>
                    </Item>
                    <Item className='form-item' name="examSubject" rules={[ { required: true } ]}>
                        <Select placeholder="Select an Exam Subject" allowClear>
                            {state.cbtLoggedIn && (
                                <Option value={state.cbtExamSubject}>{getSubjectName(state.cbtExamSubject)}  - Current</Option>
                            )}         
                            {(state.cbtUser.role !== 'student' && state.cbtLoggedIn) && subjects.filter(item => item.value !== state.cbtExamSubject).map(item => (
                                <Option key={item.value} value={item.value}>{item.name}</Option>
                            ))}
                        </Select>
                    </Item>
                    <Item className='form-item' name="examCategory" rules={[ { required: true } ]}>
                        <Select placeholder="Select an Exam Category" allowClear>
                            {state.cbtLoggedIn && (
                                <Option value={tempCategory}>{getCategoryName(tempCategory)} - Selected</Option>
                            )}
                            {(state.cbtUser.role !== 'student' && state.cbtLoggedIn) && cbtCategories.filter(item => item.value !== tempCategory).map(item => (
                                <Option key={item.value} value={item.value}>{item.name}</Option>
                            ))}
                            {(state.cbtLoggedIn && ((state.advanceExam && state.cbtUser.className[0] === 'j') || state.cbtUser.role !== 'student')) && (
                                <Option value="jse">JSE</Option>
                            )}
                            {(state.cbtLoggedIn && ((state.advanceExam && state.cbtUser.className[0] === 's') || state.cbtUser.role !== 'student')) && (
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
